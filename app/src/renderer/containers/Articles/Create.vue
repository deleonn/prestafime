<template>
  <v-dialog v-model="isVisible" max-width="500px">
    <v-form v-model="valid" ref="form">
      <v-card tile>
        <v-card-title>
          <span class="headline">Crea un artículo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
									<v-text-field
										label="Nombre"
										v-model="article.name"
										@submit.prevent="save()"
                    required
                    :rules="nameRules"
									></v-text-field>
									<v-text-field
										label="Descripción"
										v-model="article.description"
                    required
                    :rules="descriptionRules"
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
import * as articlesServices from '@/services/articles'
import toast from '@/services/toast'

export default {
  name: 'ArticlesCreate',
  data () {
    return {
      error: '',
      valid: true,
      article: {
        name: '',
        description: ''
      },
      loading: false,
      nameRules: [
        v => !!v || 'El nombre es requerido'
      ],
      descriptionRules: [
        v => !!v || 'La descripción es requerida'
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
        articlesServices.create(this.article)
          .then(res => {
            this.$emit('saved', res.data)
            this.loading = false
            this.article = {}
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
