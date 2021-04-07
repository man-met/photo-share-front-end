<template>
  <div class="feed-container">
    <video
      v-show="!frameCaptured"
      ref="video"
      class="camera-feed"
      autoplay
    ></video>
    <canvas v-show="frameCaptured" ref="canvas" id="canvas"></canvas>
  </div>
  <div class="button-wrapper">
    <ion-icon name="barcode-outline" class="icon-size"></ion-icon>
    <button class="capture-button" @click="capture"></button>
    <ion-icon
      @click="toggleCamera"
      name="camera-reverse-outline"
      class="icon-size"
    ></ion-icon>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { onBeforeUnmount, onMounted } from '@vue/runtime-core';

export default {
  setup() {
    const video = ref(null);
    const canvas = ref(null);
    let stream = null;
    const cameraOptions = ['user', 'environment'];
    const currentCameraOption = ref(0);
    const frameCaptured = ref(false);

    const toggleCamera = async () => {
      await stopCamera();
      currentCameraOption.value = 1 - currentCameraOption.value;
      await initCamera();
    };

    const capture = async () => {
      // console.log(frameCaptured.value);
      // console.log(video.value);
      // console.log(canvas.value);
      let context = canvas.value.getContext('2d');
      // console.log(context);
      // console.log(video.value);
      // context.beginPath();
      // context.rect(0, 0, 100, 100);
      // context.stroke();
      context.drawImage(
        video.value,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      await stopCamera();
      frameCaptured.value = true;
    };

    const initCamera = async () => {
      try {
        if (
          'mediaDevices' in navigator &&
          'getUserMedia' in navigator.mediaDevices
        ) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: cameraOptions[currentCameraOption.value],
            },
          });
          video.value.srcObject = stream;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const stopCamera = async () => {
      try {
        if (video.srcObject !== null) {
          const tracks = stream.getTracks();
          tracks.forEach(function (track) {
            track.stop();
            video.srcObject = null;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      initCamera();
    });

    onBeforeUnmount(() => {
      stopCamera();
    });

    return {
      video,
      canvas,
      toggleCamera,
      capture,
      frameCaptured,
    };
  },
};
</script>

<style>
.feed-container {
  border: 1px solid green;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.camera-feed {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* -webkit-transform: scaleX(-1);
  transform: scaleX(-1); */
  /* z-index: 1; */
}

#canvas {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 0, 0.2);
  /* -webkit-transform: scaleX(-1);
  transform: scaleX(-1); */
}

.button-wrapper {
  /* border: 1px solid red; */
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 200px;
}

.icon-size {
  font-size: 34px;
  color: white;
}

.capture-button {
  padding: 20px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: white;
}
</style>
