
// VGEEarth.ConfigTool.addTerrainOnIon(true);
// VGEEarth.ConfigTool.addBingMapOnIon(false);

const earth = new VGEEarth.Earth('MapContainer');
const viewer = earth.viewer3D;
earth.viewer3DWorkSpace.addData({
    pid: '5bc9728a-2ad1-8160-70c1-9ae4a14876a3',
    name: 'Bing Maps - 带标注',
    catalog: '基础影像',
    dataType: 'layer',
    showInTree: true,
    defaultLoad: false,
    show: true,
    offlineCache: false,
    properties: {
        scheme: 'IonImageryProvider',
        assetId: 3
    }
});
earth.createNavigation();
earth.openDeBug();
earth.viewer3D.scene.globe.depthTestAgainstTerrain = true;
viewer.camera.setView(Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 3000000));

const TDT_KEY = '70e33188f8b84648a2acd3ef1220767c';

const tdtLabelImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
    url: `http://t0.tianditu.gov.cn/cva_c/wmts?tk=${TDT_KEY}`,
    layer: 'cva',
    style: 'default',
    format: 'tiles',
    tileMatrixSetID: 'c',
    maximumLevel: 18,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    tilingScheme: new Cesium.GeographicTilingScheme(),
    tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    credit: new Cesium.Credit('天地图全球标注')
});

viewer.imageryLayers.addImageryProvider(tdtLabelImageryProvider);

let initialCameraPosition;

viewer.camera.flyHome(0);
viewer.camera.completeFlight();
viewer.scene.globe.depthTestAgainstTerrain = false;
initialCameraPosition = viewer.camera.position.clone();

let bMarkers = [];
addBounceMarkers();
initEvent();

function initEvent() {
    new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(e => {
        let pickId = viewer.scene.pick(e.position);
        let cartesian = viewer.camera.pickEllipsoid(e.position);
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        let lng = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        let alt = cartographic.height;
        let longitude = Number(lng.toFixed(0));
        let latitude = Number(lat.toFixed(0));
        if (pickId && pickId.id && pickId.id.bounce) {
            pickId.id.bounce();
            flyToProvince(longitude, latitude);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

function addBounceMarkers() {
    bMarkers = [];
    const markers = [
        { 'lng': 77.2090, 'lat': 28.6139 },
        { 'lng': -77.0369, 'lat': 38.9072 },
        { 'lng': 116.4074, 'lat': 39.9042 },
        { 'lng': 139.6917, 'lat': 35.6895 },
        { 'lng': 126.9780, 'lat': 37.5665 },
        { 'lng': 106.8456, 'lat': -6.2088 },
        { 'lng': 73.0479, 'lat': 33.6844 },
        { 'lng': 90.4125, 'lat': 23.8103 },
        { 'lng': 105.8542, 'lat': 21.0285 },
        { 'lng': 120.9842, 'lat': 14.5995 },
        { 'lng': 100.5018, 'lat': 13.7563 },
        { 'lng': 13.4050, 'lat': 52.5200 },
        { 'lng': 2.3522, 'lat': 48.8566 },
        { 'lng': -0.1278, 'lat': 51.5074 },
        { 'lng': 12.4964, 'lat': 41.9028 },
        { 'lng': -3.7038, 'lat': 40.4168 },
        { 'lng': 4.9041, 'lat': 52.3676 },
        { 'lng': 4.3517, 'lat': 50.8503 },
        { 'lng': 21.0122, 'lat': 52.2297 },
        { 'lng': 7.4474, 'lat': 46.9481 },
        { 'lng': 18.0686, 'lat': 59.3293 },
        { 'lng': 7.3986, 'lat': 9.0765 },
        { 'lng': 38.7400, 'lat': 9.0300 },
        { 'lng': 31.2357, 'lat': 30.0444 },
        { 'lng': 15.2663, 'lat': -4.4419 },
        { 'lng': 28.1881, 'lat': -25.7461 },
        { 'lng': 35.7516, 'lat': -6.1629 },
        { 'lng': 36.8219, 'lat': -1.2921 },
        { 'lng': 32.5825, 'lat': 0.3476 },
        { 'lng': 32.5599, 'lat': 15.5007 },
        { 'lng': 3.0869, 'lat': 36.7372 },
        { 'lng': -75.6972, 'lat': 45.4215 },
        { 'lng': -99.1332, 'lat': 19.4326 },
        { 'lng': -82.3666, 'lat': 23.1136 },
        { 'lng': -69.9312, 'lat': 18.4861 },
        { 'lng': -90.5069, 'lat': 14.6349 },
        { 'lng': -87.1921, 'lat': 14.0723 },
        { 'lng': -86.2362, 'lat': 12.1150 },
        { 'lng': -89.2182, 'lat': 13.6929 },
        { 'lng': -84.0907, 'lat': 9.9281 },
        { 'lng': -47.9218, 'lat': -15.8267 },
        { 'lng': -58.3816, 'lat': -34.6037 },
        { 'lng': -74.0721, 'lat': 4.7110 },
        { 'lng': -70.6693, 'lat': -33.4489 },
        { 'lng': -77.0428, 'lat': -12.0464 },
        { 'lng': -66.9036, 'lat': 10.4806 },
        { 'lng': -78.4678, 'lat': -0.1807 },
        { 'lng': -65.2619, 'lat': -19.0196 },
        { 'lng': -56.1645, 'lat': -34.9011 },
        { 'lng': -57.5759, 'lat': -25.2637 },
        { 'lng': 149.1300, 'lat': -35.2809 },
        { 'lng': 174.7762, 'lat': -41.2865 },
        { 'lng': 147.1803, 'lat': -9.4438 },
        { 'lng': 178.4419, 'lat': -18.1416 },
        { 'lng': 160.0641, 'lat': -9.4780 },
        { 'lng': 168.3273, 'lat': -17.7333 },
        { 'lng': -171.7667, 'lat': -13.8333 },
        { 'lng': 172.9717, 'lat': 1.4518 },
        { 'lng': -175.2048, 'lat': -21.1394 },
        { 'lng': 158.1611, 'lat': 6.9248 },
        { 'lng': 46.6753, 'lat': 24.7136 },
        { 'lng': 51.3890, 'lat': 35.6892 },
        { 'lng': 44.3661, 'lat': 33.3152 },
        { 'lng': 54.3773, 'lat': 24.4539 },
        { 'lng': 35.2137, 'lat': 31.7683 },
        { 'lng': 35.9106, 'lat': 31.9539 },
        { 'lng': 35.5018, 'lat': 33.8938 },
        { 'lng': 36.2765, 'lat': 33.5138 },
        { 'lng': 44.1910, 'lat': 15.3694 },
        { 'lng': 51.2283, 'lat': 25.2760 }
    ];



    markers.forEach(marker => {
        let position = Cesium.Cartesian3.fromDegrees(marker.lng, marker.lat, -1);
        let bMarker = new VGEEarth.NormalEntity.bouncePoint(viewer, position, {
            bounceHeight: 10000,
            increment: 0.05
        });
        bMarkers.push(bMarker);
    });

    let extraMarkerPosition = Cesium.Cartesian3.fromDegrees(108.9604, 34.2191, -4);
    let extraMarker = new VGEEarth.NormalEntity.bouncePoint(viewer, extraMarkerPosition, {
        bounceHeight: 100,
        increment: 0.05
    });
    bMarkers.push(extraMarker);
}

function removeBounceMarkers() {
    bMarkers.forEach(marker => {
        marker.remove();
    });
    bMarkers = [];
}

function reloadBounceMarkers() {
    addBounceMarkers();
}

function reload() {
    bMarkers.forEach(item => {
        item.remove();
    });
    addBounceMarkers();
}

function destroy() {
    viewer.entities.removeAll();
    viewer.imageryLayers.removeAll(true);
    viewer.destroy();
}

document.getElementById('resetButton').addEventListener('click', resetViewer);

function resetViewer() {
    const entitiesToRemove = viewer.entities.values.filter(entity => entity.polygon);
    entitiesToRemove.forEach(entity => {
        viewer.entities.remove(entity);
    });

    viewer.camera.flyTo({
        destination: initialCameraPosition,
    });
}


