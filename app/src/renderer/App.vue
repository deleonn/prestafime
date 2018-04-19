<template>
  <v-app v-bind="{dark: theme}">
    <div id="app">
      <sidenav @theme="modifyTheme"></sidenav>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>

<script>
  import Sidenav from '@/components/Sidenav/Sidenav'
  export default {
    name: 'app',
    components: { Sidenav },
    data () {
      return {
        theme: false
      }
    },
    methods: {
      modifyTheme (value) {
        this.theme = value
      }
    }
  }
</script>

<style>
  .window-draggable {
    position: absolute;
    width: 100%;
    top: 0px;
    left: 0px;
    height: 35px;
    pointer-events: none;
    -webkit-app-region: drag;
    z-index: 9999;
  }
  .main-content {
    margin-left: 70px;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
  }
</style>
