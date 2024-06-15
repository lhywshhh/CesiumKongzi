let CoordinateOffset = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function (lat, lon) {
        let a = 6378245.0;
        let ee = 0.00669342162296594323;
        let dLat = this.transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * this.PI;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return { 'lat': dLat, 'lon': dLon };
    },
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon))
            return { 'lat': wgsLat, 'lon': wgsLon };
        let d = this.delta(wgsLat, wgsLon);
        return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
    },
    gcj_decrypt: function (gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon))
            return { 'lat': gcjLat, 'lon': gcjLon };
        let d = this.delta(gcjLat, gcjLon);
        return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon };
    },
    gcj_decrypt_exact: function (gcjLat, gcjLon) {
        let initDelta = 0.01;
        let threshold = 0.000000001;
        let dLat = initDelta, dLon = initDelta;
        let mLat = gcjLat - dLat, mLon = gcjLon - dLon;
        let pLat = gcjLat + dLat, pLon = gcjLon + dLon;
        let wgsLat, wgsLon, i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            let tmp = this.gcj_encrypt(wgsLat, wgsLon);
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lon - gcjLon;
            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                break;
            if (dLat > 0)
                pLat = wgsLat;
            else
                mLat = wgsLat;
            if (dLon > 0)
                pLon = wgsLon;
            else
                mLon = wgsLon;
            if (++i > 10000)
                break;
        }
        return { 'lat': wgsLat, 'lon': wgsLon };
    },
    bd_encrypt: function (gcjLat, gcjLon) {
        let x = gcjLon, y = gcjLat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        let bdLon = z * Math.cos(theta) + 0.0065;
        let bdLat = z * Math.sin(theta) + 0.006;
        return { 'lat': bdLat, 'lon': bdLon };
    },
    bd_decrypt: function (bdLat, bdLon) {
        let x = bdLon - 0.0065, y = bdLat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        let gcjLon = z * Math.cos(theta);
        let gcjLat = z * Math.sin(theta);
        return { 'lat': gcjLat, 'lon': gcjLon };
    },
    mercator_encrypt: function (wgsLat, wgsLon) {
        let x = wgsLon * 20037508.34 / 180.;
        let y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
        y = y * 20037508.34 / 180.;
        return { 'lat': y, 'lon': x };
    },
    mercator_decrypt: function (mercatorLat, mercatorLon) {
        let x = mercatorLon / 20037508.34 * 180.;
        let y = mercatorLat / 20037508.34 * 180.;
        y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
        return { 'lat': y, 'lon': x };
    },
    distance: function (latA, lonA, latB, lonB) {
        let earthR = 6371000.;
        let x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
        let y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
        let s = x + y;
        if (s > 1)
            s = 1;
        if (s < -1)
            s = -1;
        let alpha = Math.acos(s);
        let distance = alpha * earthR;
        return distance;
    },
    outOfChina: function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat: function (x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function (x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
};

let aLiYun = 'https://vge-webgl.oss-cn-beijing.aliyuncs.com/';
let status = 1;
let provinceShow = true;
let cityShow = false;
let areaShow = false;
let provinceName = '全国';
let municipality = new Set([
    '北京市', '上海市', '天津市', '香港特别行政区', '澳门特别行政区', '重庆市',
    '密云区', '延庆区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '东城区', '西城区',
    '和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '宁河区', '静海区', '蓟州区', '滨海新区',
    '万州区', '涪陵区', '梁平区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '渝北区', '巴南区', '长寿区', '綦江区', '潼南区', '铜梁区', '大足区', '荣昌区', '璧山区', '城口县', '丰都县', '垫江县', '武隆区', '忠县', '开州区', '云阳县', '奉节县', '巫山县', '巫溪县', '黔江区', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县', '江津区', '合川区', '永川区', '南川区',
    '花地玛堂区', '圣安多尼堂区', '大堂区', '望德堂区', '风顺堂区', '路凼填海区', '嘉模堂区', '圣方济各堂区', '花王堂区',
    '中西区', '湾仔区', '东区', '南区', '九龙城区', '油尖旺区', '观塘区', '黄大仙区', '深水埗区', '新界', '北区', '大埔区', '沙田区', '西贡区', '元朗区', '屯门区', '荃湾区', '葵青区', '离岛区',
    '黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'
]);
let provinceFeatures = [];
let cityFeatures = [];
let areaFeatures = [];
let cityAdcode = 0;
let areaAdcode = 0;

// function media(coordinates) {
//     let c = JSON.parse(JSON.stringify(coordinates));
//     for (let i = 0; i < coordinates.length; i++) {
//         for (let j = 0; j < coordinates[i].length; j++) {
//             // for (let s = 0; s < coordinates[j].length; s++) {
//             let result = CoordinateOffset.gcj_decrypt_exact(coordinates[i][j][1], coordinates[i][j][0]);
//             c[i][j][0] = result.lon;
//             c[i][j][1] = result.lat;
//             // }
//         }
//     }
//     let entity = addPolygon(c);
//     window.earth.viewer3D.flyTo(entity);
// }





// function addPolygon(coordinates) {
//     window.earth.viewer3D.entities.removeById('areaPolygon');
//     let arr = [];
//     for (let i = 0; i < coordinates[0].length; i++) {
//         arr.push(coordinates[0][i][0]);
//         arr.push(coordinates[0][i][1]);
//     }
//     let areaPolygon = window.earth.viewer3D.entities.add({
//         id: 'areaPolygon',
//         name: 'areaPolygon',
//         polyline: {
//             id: 'glowingLine',
//             width: 12,
//             positions: Cesium.Cartesian3.fromDegreesArray(arr),
//             material: new VGEEarth.Material.Polyline.PolylineLinkPulseMaterial({
//                 color: Cesium.Color.AQUA,
//                 duration: 5000
//             }),
//             clampToGround: true
//         }
//     });
//     return areaPolygon;
// }

function media(coordinates, name) {
    let c = JSON.parse(JSON.stringify(coordinates));

    function processCoordinates(coords) {
        for (let i = 0; i < coords.length; i++) {
            if (Array.isArray(coords[i][0][0])) {
                // If the first element is a nested array, it means we have nested arrays (MultiPolygon)
                processCoordinates(coords[i]);
            } else if (Array.isArray(coords[i][0])) {
                // If the first element is an array, it means we have a simple array of coordinates (Polygon)
                for (let j = 0; j < coords[i].length; j++) {
                    let result = CoordinateOffset.gcj_decrypt_exact(coords[i][j][1], coords[i][j][0]);
                    coords[i][j][0] = result.lon;
                    coords[i][j][1] = result.lat;
                }
            }
        }
    }

    processCoordinates(c);

    let entity = addPolygon(c, name);
    window.earth.viewer3D.flyTo(entity);
}

function addPolygon(coordinates, name) {
    window.earth.viewer3D.entities.removeById('areaPolygon');

    function flattenCoordinates(coords, arr) {
        for (let i = 0; i < coords.length; i++) {
            if (Array.isArray(coords[i][0][0])) {
                // If the first element is a nested array, it means we have nested arrays (MultiPolygon)
                flattenCoordinates(coords[i], arr);
            } else if (Array.isArray(coords[i][0])) {
                // If the first element is an array, it means we have a simple array of coordinates (Polygon)
                let polygonArr = [];
                for (let j = 0; j < coords[i].length; j++) {
                    polygonArr.push(coords[i][j][0]);
                    polygonArr.push(coords[i][j][1]);
                }
                arr.push(polygonArr);
            }
        }
    }

    let allPolygons = [];
    flattenCoordinates(coordinates, allPolygons);

    let entities = [];
    let center = { lon: 0, lat: 0, count: 0 };

    for (let i = 0; i < allPolygons.length; i++) {
        let areaPolygon = window.earth.viewer3D.entities.add({
            id: 'areaPolygon_' + i,
            name: 'areaPolygon',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(allPolygons[i]),
                material: Cesium.Color.AQUA.withAlpha(0.5)
            }
        });
        entities.push(areaPolygon);

        // Calculate the center for placing the label
        for (let j = 0; j < allPolygons[i].length; j += 2) {
            center.lon += allPolygons[i][j];
            center.lat += allPolygons[i][j + 1];
            center.count += 1;
        }
    }

    if (center.count > 0) {
        center.lon /= center.count;
        center.lat /= center.count;

        // Add a label entity

    }

    return entities;
}


function flyToProvince(lonCode, latCode) {
    // document.getElementById('province-table').style.display = 'none';
    // document.getElementById('city-list-item').style.display = 'block';
    // document.getElementById('district-list-item').style.display = 'none';
    jsonPath = "./json/world_updated.zh.json"
    // axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/100000.json`).then(res => {
    axios.get(jsonPath).then(res => {
        provinceFeatures = res.data.features;
        provinceFeatures.forEach(element => {
            if (element.properties.lonCode <= lonCode + 2 && element.properties.lonCode >= lonCode - 2) {
                if (element.properties.latCode <= latCode + 2 && element.properties.latCode >= latCode - 2) {
                    provinceName = element.properties.name;
                    media(element.geometry.coordinates);
                }
            }
        });
    });

}

// function flyToCity(cityInfo) {
//     if (municipality.has(provinceName)) {
//         axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${cityInfo.properties.adcode}.json`).then(res => {
//             media(cityInfo.geometry.coordinates);
//             provinceName = cityInfo.properties.name;
//             areaAdcode = cityInfo.properties.adcode;
//             status = 3;
//         });
//     } else {
//         provinceName = cityInfo.properties.name;
//         document.getElementById('province-table').style.display = 'none';
//         document.getElementById('city-list-item').style.display = 'none';
//         document.getElementById('district-list-item').style.display = 'block';
//         axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${cityInfo.properties.adcode}.json`).then(res => {
//             areaFeatures = res.data.features;
//             media(cityInfo.geometry.coordinates);
//             areaAdcode = cityInfo.properties.adcode;
//             status = 3;
//             let districtListItem = document.getElementById('district-list-item');
//             districtListItem.innerHTML = '';
//             areaFeatures.forEach(areaItem => {
//                 let p = document.createElement('p');
//                 p.innerText = areaItem.properties.name;
//                 p.onclick = () => flyToArea(areaItem);
//                 districtListItem.appendChild(p);
//             });
//         });
//     }
// }

// function flyToArea(areaInfo) {
//     provinceName = areaInfo.properties.name;
//     axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${areaInfo.properties.adcode}.json`).then(res => {
//         areasFeatures = res.data.features;
//         media(areaInfo.geometry.coordinates);
//         status = 4;
//     });
// }

// function flyTaiwan(adcode) {
//     document.getElementById('province-table').style.display = 'block';
//     document.getElementById('city-list-item').style.display = 'none';
//     document.getElementById('district-list-item').style.display = 'none';
//     axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`).then(res => {
//         provinceFeatures = res.data.features;
//         provinceFeatures.forEach(element => {
//             if (element.properties.adcode === adcode) {
//                 provinceName = element.properties.name;
//                 media(element.geometry.coordinates);
//             }
//         });
//     });
// }

// function cityBack(adcode) {
//     axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${cityAdcode}.json`).then(res => {
//         provinceFeatures = res.data.features;
//         provinceFeatures.forEach(element => {
//             if (element.properties.adcode === adcode) {
//                 provinceName = element.properties.name;
//                 media(element.geometry.coordinates);
//             }
//         });
//     });
//     document.getElementById('province-table').style.display = 'none';
//     document.getElementById('city-list-item').style.display = 'block';
//     document.getElementById('district-list-item').style.display = 'none';
//     axios.get(aLiYun + `geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`).then(res => {
//         areaFeatures = res.data.features;
//         status = 3;
//     });
// }

// function toBack() {
//     if (status === 2) {
//         window.earth.viewer3D.entities.removeById('areaPolygon');
//         status = 1;
//         document.getElementById('province-table').style.display = 'block';
//         document.getElementById('city-list-item').style.display = 'none';
//         document.getElementById('district-list-item').style.display = 'none';
//     } else if (status === 3) {
//         status = 2;
//         flyToProvince(cityAdcode);
//     } else if (status === 4) {
//         status = 3;
//         cityBack(areaAdcode);
//     }
// }

// function inintalView() {
//     window.earth.viewer3D.camera.flyTo({
//         destination: Cesium.Cartesian3.fromDegrees(117.30, 42.40, 10000.0),
//         orientation: {
//             pitch: Cesium.Math.toRadians(-35.0)
//         }
//     });
// }
