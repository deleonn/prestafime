<template>
  <div id="wrapper">
    <h1>Inventario</h1>
  </div>
</template>

<script>
  export default {
    name: 'InventoryList',
    mounted () {
      this.logThis()
    },
    methods: {
      logThis () {
        console.log('component mounted')
      }
    }
  }
</script>