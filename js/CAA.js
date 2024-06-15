async function CAA() {
    // 获取 Cesium Viewer 实例


    let dataSource;

    // 获取分级色彩的颜色函数
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

    // 更新图例
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

    // 加载国家边界数据并进行分级色彩图绘制
    async function loadCountryData() {
        const response = await axios.get("http://127.0.0.1:8000/daping/risk_value");
        const data = response.data;

        // 计算minValue和maxValue
        let minValue = Infinity;
        let maxValue = -Infinity;

        data.forEach(d => {
            const riskValue = parseFloat(d.fields.riskvalue);
            if (!isNaN(riskValue)) {
                if (riskValue < minValue) minValue = riskValue;
                if (riskValue > maxValue) maxValue = riskValue;
            }
        });

        if (dataSource) {
            viewer.dataSources.remove(dataSource);
        }

        const geoJsonResponse = await axios.get('./json/color_world.zh.json'); // 假设你的国家边界数据存储在这个文件中
        const geoJsonData = geoJsonResponse.data;

        geoJsonData.features.forEach(feature => {
            const countryName = feature.properties.name;
            const riskData = data.find(d => d.pk === countryName);

            if (riskData) {
                const riskValue = parseFloat(riskData.fields.riskvalue);
                feature.properties.riskValue = riskValue;
            } else {
                feature.properties.riskValue = null;
            }
        });

        dataSource = await Cesium.GeoJsonDataSource.load(geoJsonData, {
            stroke: Cesium.Color.BLACK,
            fill: Cesium.Color.BLACK,
            strokeWidth: 1
        });

        dataSource.entities.values.forEach(entity => {
            const riskValue = entity.properties.riskValue.getValue();
            const color = getColorByISOCode(riskValue, minValue, maxValue);
            entity.polygon.material = color;

            // Add an empty label for showing risk value on hover
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

    await loadCountryData();

    // 设置鼠标移动事件来显示风险值
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
            const riskValue = entity.properties.riskValue.getValue();
            const countryName = entity.properties.name.getValue();
            infoBox.style.display = 'block';
            infoBox.style.left = movement.endPosition.x + 'px';
            infoBox.style.top = movement.endPosition.y + 'px';
            infoBox.innerHTML = `国家：${countryName}<br>风险值：${riskValue}`;
        } else {
            infoBox.style.display = 'none';
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // 移除传播接受度分析图层
    window.removeCAA = function () {
        if (dataSource) {
            viewer.dataSources.remove(dataSource);
            dataSource = null;
        }
        handler.destroy();
        infoBox.remove();
    };
};

function loadCAA() {
    CAA();
}
