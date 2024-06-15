function ImageryXYZ_3857_Provider(url, param) {
    let queryParameters = param.properties.queryParameters || {};
    let resource = new Cesium.Resource({ url, queryParameters });

    return new Cesium.UrlTemplateImageryProvider({
        url: resource,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        minimumLevel: param.properties.minimumLevel || 0,
        maximumLevel: param.properties.maximumLevel || 22
    });
}

function SingleTileImagery(url, param) {
    return new Cesium.SingleTileImageryProvider({
        url: url,
        rectangle: Cesium.Rectangle.fromDegrees(
            param.properties.rectangle.west,
            param.properties.rectangle.south,
            param.properties.rectangle.east,
            param.properties.rectangle.north
        )
    });
}

const layersData = [];
let selGroup = '';
let layersInfo = [];
let layerIndex = 0;
const layers = [];
let dataSource;

let minValue = Infinity;
let maxValue = -Infinity;

async function getSHBLayers(dataUrl) {
    const { data } = await axios.get(dataUrl);
    layersData.push(...data);
    if (layersData.length > 0) {
        selGroup = layersData[0].group;
        initImageLayerTimeLine();
    }
    populateGroupSelect();
}

function populateGroupSelect() {
    const selGroupElement = document.getElementById('selGroup');
    selGroupElement.innerHTML = layersData.map(item => `<option value="${item.group}">${item.group}</option>`).join('');
    selGroupElement.value = selGroup;
}

function initImageLayerTimeLine() {
    const group = layersData.find(item => item.group === selGroup);
    const position = group.position;

    layersInfo = group.layers || [];

    layersInfo.forEach(item => {
        const layer = viewer.imageryLayers.addImageryProvider(createLayer(item));
        layers.push({ name: item.name, time: item.time, layer: layer });
    });

    setLayer(0);
    updateSlider();
}

function updateSlider() {
    const slider = document.getElementById('layerSlider');
    slider.max = layersInfo.length - 1 < 1 ? 1 : layersInfo.length - 1;
    slider.value = 0;
    updateTooltip(0);
}

function createLayer(layerItem) {
    if (layerItem.properties.scheme === 'layer-xyz-3857') {
        return new ImageryXYZ_3857_Provider(layerItem.properties.url, layerItem);
    } else if (layerItem.properties.scheme === 'layer-singleTileImagery') {
        return new SingleTileImagery(layerItem.properties.url, layerItem);
    }
}

function getColorByISOCode(value, minValue, maxValue) {
    if (value === undefined || value === null) {
        return Cesium.Color.GRAY; // 没有数据时返回灰色
    }

    // 将值标准化为 0 到 1 之间
    const normalizedValue = (value - minValue) / (maxValue - minValue);

    // 使用标准化值生成颜色，从蓝色（冷色）到红色（暖色）
    const color = Cesium.Color.fromHsl(0.6 - normalizedValue * 0.6, 1.0, 0.5, 0.8);
    return color;
}

function updateLegend(minValue, maxValue) {
    const legend = document.getElementById('legend');
    legend.innerHTML = `
        <div class="legend-scale">
            <div class="legend-gradient"></div>
        </div>
        <div class="legend-labels">
            <span>${minValue}</span>
            <span>${maxValue}</span>
        </div>
    `;
}

async function loadGeoJsonForYear(year) {
    const response = await axios.get('./json/color_world.zh.json');
    const geoJsonData = response.data;

    // 计算minValue和maxValue
    minValue = Infinity;
    maxValue = -Infinity;

    geoJsonData.features.forEach(feature => {
        const iso_n3_value = parseFloat(feature.properties.iso_n3[year]);
        if (!isNaN(iso_n3_value)) {
            if (iso_n3_value < minValue) minValue = iso_n3_value;
            if (iso_n3_value > maxValue) maxValue = iso_n3_value;
        }
    });

    const featuresForYear = geoJsonData.features.map(feature => {
        const iso_n3_value = parseFloat(feature.properties.iso_n3[year]);
        if (!isNaN(iso_n3_value)) {
            feature.properties.iso_n3_current = iso_n3_value;
        } else {
            console.error('No classification data for year:', year, 'in feature:', feature.properties.name);
            feature.properties.iso_n3_current = null;
        }
        return feature;
    });

    const yearData = { type: 'FeatureCollection', features: featuresForYear };

    if (dataSource) {
        viewer.dataSources.remove(dataSource);
    }

    dataSource = await Cesium.GeoJsonDataSource.load(yearData, {
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.BLACK,
        strokeWidth: 1
    });

    dataSource.entities.values.forEach(entity => {
        const iso_n3_current = entity.properties.iso_n3_current.getValue();
        const color = getColorByISOCode(iso_n3_current, minValue, maxValue);
        entity.polygon.material = color;

        // Add an empty label for showing iso_n3 value on hover
        entity.label = new Cesium.LabelGraphics({
            text: '',
            show: false, // Hide by default
            fillColor: Cesium.Color.WHITE,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.BLACK,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            scale: 0.6
        });

        // Position the label at the centroid of the polygon
        const positions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
        const centroid = Cesium.BoundingSphere.fromPoints(positions).center;
        entity.position = centroid;
    });

    viewer.dataSources.add(dataSource);

    updateLegend(minValue, maxValue);
}

function setLayer(index) {
    layers.forEach((layerObj, idx) => {
        layerObj.layer.show = (idx === index);
        if (idx === index) {
            year = JSON.stringify(idx);
            loadGeoJsonForYear(year);
        }
    });
    updateTooltip(index);

    const group = layersData.find(item => item.group === selGroup);
    if (group?.legend) {
        // Implement your legend logic here
    }
}

function updateTooltip(index) {
    const layerItem = layersInfo[index || 0] || {};
    document.getElementById('sliderTooltip').innerText = layerItem.time || '';
}

function removeAll() {
    // Remove all imagery layers
    layers.forEach(layerObj => {
        viewer.imageryLayers.remove(layerObj.layer);
    });
    layers.length = 0;
    layersInfo = [];

    // Remove GeoJson dataSource if it exists
    if (dataSource) {
        viewer.dataSources.remove(dataSource);
        dataSource = null;
    }

    // Hide legend
    const legend = document.getElementById('legend');
    if (legend) {
        legend.style.display = 'none';
    }
}

function handleGroupChange(value) {
    selGroup = value;
    initImageLayerTimeLine();
}

function handleSliderChange(value) {
    layerIndex = parseInt(value);
    setLayer(layerIndex);
}

async function initialize(dataUrl) {
    await getSHBLayers(dataUrl);

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    infoBox.style.padding = '5px';
    infoBox.style.borderRadius = '5px';
    infoBox.style.pointerEvents = 'none';
    infoBox.style.display = 'none';
    document.body.appendChild(infoBox);

    handler.setInputAction(function (movement) {
        const pickedObject = viewer.scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
            const entity = pickedObject.id;
            const iso_n3_current = entity.properties.iso_n3_current.getValue();
            const countryName = entity.properties.name.getValue();
            infoBox.style.display = 'block';
            infoBox.style.left = movement.endPosition.x + 'px';
            infoBox.style.top = movement.endPosition.y + 'px';
            infoBox.innerHTML = `国家：${countryName}<br>搜索热度：${iso_n3_current}`;
        } else {
            infoBox.style.display = 'none';
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 创建图例
    const legend = document.createElement('div');
    legend.id = 'legend';
    legend.style.position = 'absolute';
    legend.style.bottom = '10px';
    legend.style.left = '10px';
    legend.style.backgroundColor = 'white';
    legend.style.padding = '10px';
    legend.style.borderRadius = '5px';
    legend.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(legend);
}

window.addEventListener('beforeunload', removeAll);
