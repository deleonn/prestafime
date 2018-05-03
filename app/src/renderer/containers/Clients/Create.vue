<template>
  <v-dialog v-model="isVisible" max-width="500px">
    <v-form v-model="valid" ref="form">
      <v-card tile>
        <v-card-title>
          <span class="headline">Crea un cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
									<v-text-field
										label="Nombre"
										v-model="client.name"
										@submit.prevent="save()"
                    required
                    :rules="nameRules"
									></v-text-field>
									<v-text-field
										label="Correo"
										v-model="client.email"
                    required
                    :rules="emailRules"
									></v-text-field>
									<v-text-field
										label="Telefono"
										v-model="client.phone_number"
                    required
                    :rules="phoneRules"
									></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" flat @click.native="clear()">Cancelar</v-btn>
          <v-btn color="primary" flat @click.prevent="save()" :loading="loading" @submit.prevent="save()" type="submit" :disabled="!valid">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import * as clientsService from '@/services/clients'
import toast from '@/services/toast'

export default {
  name: 'ClientsCreate',
  data () {
    return {
      error: '',
      valid: true,
      client: {
        name: '',
        email: '',
        phone_number: ''
      },
      loading: false,
      nameRules: [
        v => !!v || 'El nombre es requerido'
      ],
      emailRules: [
        v => !!v || 'El E-mail es requerido',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El E-mail debe ser valido'
      ],
      phoneRules: [
        v => !!v || 'El telefono es requerido'
      ]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isVisible: {
      get () {
        return this.$props.visible
      },
      set (newVal) {
        if (!newVal) {
          this.$emit('closed')
        }
      }
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true
        clientsService.create(this.client)
          .then(res => {
            this.$emit('saved', res.data)
            this.loading = false
            this.client = {}
            this.$refs.form.reset()
            toast.show({
              text: '¡Registro creado con éxito!'
            })
          })
          .catch(err => {
            this.error = err
            this.loading = false
            toast.show({
              text: 'Ocurrió un error. Inténtalo de nuevo',
              color: 'error'
            })
          })
      }
    },
    clear () {
      this.$emit('closed')
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
