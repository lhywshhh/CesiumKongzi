var keyplace = 0;

// 旅途暂停事件
function triggerEventAtPosition(position) {
  console.log(keyplace);

  // 示例：当实体到达特定位置时触发事件
  const targetPosition = Cesium.Cartesian3.fromDegrees(
    data_keyplace.Longitude[keyplace],
    data_keyplace.Latitude[keyplace],
    1
  );
  const distance = Cesium.Cartesian3.distance(position, targetPosition);

  // 在距离目标位置小于1000米时触发事件
  if (distance < 1000) {
    console.log("事件触发：实体到达目标位置");
    viewer.clock.shouldAnimate = false;

    // 展开卷轴
    fold();
    $(".maskLayer").show();
    functions[data_keyplace.Country[keyplace]]();
    unfold();

    console.log(keyplace);
    keyplace++;
  }
}

// 旅途继续
$(".btn-close,.maskLayer").on("click", function () {
  console.log("点击关闭");
  $(".maskLayer").hide();
  fold();
  viewer.clock.shouldAnimate = true;
});

const scene = viewer.scene;

var place;
var path;

// 初始化导航路线
function initializeNavigation() {
  place = new Cesium.SampledPositionProperty();

  place.setInterpolationOptions({
    interpolationDegree: 4,
    interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
  });

  var start = Cesium.JulianDate.fromDate(new Date());
  var stop = Cesium.JulianDate.addSeconds(start, 690000, new Cesium.JulianDate());

  for (var i = 0; i < positions.length; i++) {
    var time = Cesium.JulianDate.addSeconds(start, i * 10, new Cesium.JulianDate());
    var positionValue = Cesium.Cartesian3.fromDegrees(positions[i][0], positions[i][1], 1);
    place.addSample(time, positionValue);
  }

  path = viewer.entities.add({
    name: "小马",
    position: place,
    orientation: new Cesium.CallbackProperty(function (time, result) {
      var position = place.getValue(time, result);
      if (!position) {
        return result;
      }
      // 计算模型的方向，并在Y轴旋转90度
      var velocityOrientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(90), 0, 0));
      return velocityOrientation;
    }, false),
    path: {
      leadTime: 0,
      trailTime: 60000000,
      width: 5,
      resolution: 1,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 1,
        color: Cesium.Color.BLUEVIOLET,
      }),
    },
    model: {
      uri: "./glb/ImageToStl.com_10026_horse_v01-it2.glb",
      minimumPixelSize: 128,
      maximumScale: 200,
    },
    label: {
      text: "小马",
      font: '14pt sans-serif',
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    }
  });




  var velocityOrientation = new Cesium.VelocityOrientationProperty(place);

  path.orientation = new Cesium.CallbackProperty(function (time, result) {
    var orientation = velocityOrientation.getValue(time, result);
    if (!orientation) {
      return null;
    }

    var xRotation = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_X, Cesium.Math.toRadians(0));
    var yRotation = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Y, Cesium.Math.toRadians(0));
    var zRotation = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, Cesium.Math.toRadians(0));

    var combinedRotation = Cesium.Quaternion.multiply(orientation, xRotation, result);
    combinedRotation = Cesium.Quaternion.multiply(combinedRotation, yRotation, result);
    combinedRotation = Cesium.Quaternion.multiply(combinedRotation, zRotation, result);

    return combinedRotation;
  }, false);

  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(positions[0][0], positions[0][1], 10000), // 从上方俯视的位置
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-90.0), // 垂直向下俯视
      roll: 0.0,
    },
    duration: 3, // 飞行的持续时间，单位为秒
  });

  viewer.trackedEntity = path;

  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  viewer.scene.preRender.addEventListener(function () {
    if (viewer.trackedEntity) {
      const entityposition = viewer.trackedEntity.position.getValue(viewer.clock.currentTime);
      if (entityposition) {
        const offset = new Cesium.Cartesian3(0, 50000, 50000);
        const transform = Cesium.Transforms.eastNorthUpToFixedFrame(entityposition);
        viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(0, 0, 50000)); // 俯视视角偏移量
        triggerEventAtPosition(entityposition);
      }
    }
  });

}

// Shade selected model with highlight.
const fragmentShaderSource = `
    uniform sampler2D colorTexture;
    in vec2 v_textureCoordinates;
    uniform vec4 highlight;
    void main() {
        vec4 color = texture(colorTexture, v_textureCoordinates);
        if (czm_selected()) {
            vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;
            out_FragColor = vec4(highlighted, 1.0);
        } else { 
            out_FragColor = color;
        }
    }
  `;

const stage = scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    fragmentShader: fragmentShaderSource,
    uniforms: {
      highlight: function () {
        return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
      },
    },
  })
);
stage.selected = [];

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
  const pickedObject = viewer.scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject)) {
    stage.selected = [pickedObject.primitive];
  } else {
    stage.selected = [];
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

const bubblesData = [];
for (let i = 0; i < 9; i++) {
  bubblesData[i] = { position: [data_keyplace.Longitude[i], data_keyplace.Latitude[i]] };
}

function createBubbles(data) {
  data.forEach((item, index) => {
    const bubbleEntity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(item.position[0], item.position[1]),
      billboard: {
        image: 'images/定位点_点击.png',
        width: 50,
        height: 50,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      label: {
        text: 'Label ' + index,
        font: '14pt sans-serif',
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      }
    });

    if (index) {
      bubbleEntity.clickFunction = function () {
        fold();
        $(".maskLayer").show();
        functions[data_keyplace.Country[index]]();
        unfold();
      };
    }
  });
}

viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
  const pickedObject = viewer.scene.pick(movement.position);
  if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && pickedObject.id.clickFunction) {
    pickedObject.id.clickFunction();
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

function startNavigation() {
  // 初始化导航路线
  initializeNavigation();
  // 创建导航点
  createBubbles(bubblesData);
  // 加快动画速度
  viewer.clock.multiplier = 6; // 设置为60倍速
  // 开始动画
  viewer.clock.shouldAnimate = true;
}

function stopNavigation() {
  // 停止动画
  viewer.clock.shouldAnimate = false;
  // 恢复默认速度
  viewer.clock.multiplier = 1;
  // 移除所有实体
  viewer.entities.removeAll();
  // 清除跟踪的实体
  viewer.trackedEntity = undefined;
}

