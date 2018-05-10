<template>

	<v-dialog v-model="active" :persistent="persistent" :max-width="maxWidth">
		<v-card>
			<v-card-title class="headline">{{title}}</v-card-title>
			<v-card-text>{{text}}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey darken-1" flat @click.native="cancel()" v-if="type === 'confirm'">{{cancelButtonText}}</v-btn>
				<v-btn color="primary darken-1" flat @click.native="accept()">{{acceptButtonText}}</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</template>


<script>
export default {
  data () {
    return {
      active: false,
      text: '',
      title: '',
      persistent: false,
      maxWidth: '700px',
      cancelButtonText: 'Cancelar',
      acceptButtonText: 'Aceptar',
      type: 'alert'
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
    },
    cancel () {
      this.active = false
      this.$emit('canceled')
    },
    accept () {
      this.active = false
      this.$emit('accepted')
    }
  }
}
</script>