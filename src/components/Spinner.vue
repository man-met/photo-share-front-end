<template>
  <div class="spin"></div>
</template>

<script>
export default {};
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #ff8800;
  opacity: 1;
  animation: spin 1s ease infinite;
  z-index: 101;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}

.spinner-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background: black;
  opacity: 0.5;
  z-index: 100;
}
</style>
