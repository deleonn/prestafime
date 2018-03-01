<template>
  <div id="app">
    <sidenav></sidenav>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidenav from '@/components/Sidenav/Sidenav'
  export default {
    name: 'app',
    components: { Sidenav }
  }
</script>

<style>
  .main-content {
    margin-left: 70px;
    padding-left: 20px;
    padding-top: 20px;
  }
</style>
