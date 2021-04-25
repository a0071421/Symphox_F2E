<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/assets/all";
html, body, #app {
  height: 100%;
}
#app {
  max-width: 1024px;
  margin: 0 auto;
  background-color: #efe9e7;
}
</style>
