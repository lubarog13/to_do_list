<template>
  <div id="app">
    <MainPage/>
  </div>
</template>

<script>

import MainPage from "@/views/MainPage";
export default {
  name: 'App',
  components: {MainPage},
}
</script>

<style lang="scss">
@import "./assets/fonts/style.css";
* {
  box-sizing: border-box;
  flex-shrink: 0;
}
body, html, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.row {
  display: flex;
  width: 100%;
  align-items: center;
}
#app {
  font-family:  "Vela Sans", sans-serif;
  color: #16191D;
  width: 80%;
  margin: 100px auto;
  @media (max-width: 500px) {
    margin: 60px auto;
  }
  @media (max-width: 350px) {
    width: 90%;
  }
}
</style>
