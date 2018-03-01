<template>
  <div>
    <h1>PrestaFIME</h1>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted () {
      this.logThis()
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      logThis () {
        console.log('component mounted')
      }
    }
  }
</script>

<style>
  h1 {
    color: #245a35;
  }
</style>
