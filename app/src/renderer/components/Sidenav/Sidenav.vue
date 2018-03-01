<template>
  <aside class="sidenav">

  </aside>
</template>

<script>
  export default {
    name: 'sidenav',
    data () {
      return {
        module: 'sidenav'
      }
    }
  }
</script>

<style>
  .sidenav {
    position: fixed;
    height: 100vh;
    width: 70px;
    background: #f7f7f7;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, .19);
    padding-top: 20px;
  }
</style>
