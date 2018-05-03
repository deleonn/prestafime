<template>

  <v-snackbar
    :timeout="timeout"
    :color="color"
    v-model="active"
    class="application"
    :top="positionY === 'top'"
    :bottom="positionY === 'bottom'"
    :right="positionX === 'right'"
    :left=" positionX === 'left'"
  >

    <v-icon
      dark
      left
      v-if="icon.length > 0">
      {{ icon }}
    </v-icon>

    {{ text }}

	<v-btn dark flat icon @click.native="active = false" :color="'white'">
		<v-icon>mdi-close</v-icon>
	</v-btn>

  </v-snackbar>

</template>


<script>
export default {
  data () {
    return {
      active: false,
      text: '',
      icon: '',
      color: null,
      timeout: 3000,
      dismissible: true,
      positionX: 'right',
      positionY: 'top'
    }
  },
  methods: {
    show (options = {}) {
      if (this.active) {
        this.close()
        this.$nextTick(() => this.show(options))
        return
      }
      Object.keys(options).forEach(field => (this[field] = options[field]))
      this.active = true
    },
    close () {
      this.active = false
    },
    dismiss () {
      if (this.dismissible) {
        this.active = false
      }
    }
  }
}
</script>