<template>
  <v-dialog v-model="isVisible" max-width="500px">
    <v-form v-model="valid" ref="form">
      <v-card tile>
        <v-card-title>
          <span class="headline">Crea un préstamo</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
                <v-select
                  :items="clients"
                  item-text="name"
                  item-value="id"
                  v-model="loan.client_id"
                  label="Cliente"
                  single-line
                  :rules="clientRules"
                ></v-select>
                <v-select
                  :items="articles"
                  item-text="name"
                  item-value="id"
                  v-model="loan.article_id"
                  label="Artículo"
                  single-line
                  :rules="articleRules"
                ></v-select>
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
import * as loansService from '@/services/loans'
import * as clientsService from '@/services/clients'
import * as articlesService from '@/services/articles'
import toast from '@/services/toast'

export default {
  name: 'LoanCreate',
  data () {
    return {
      error: '',
      valid: true,
      loan: {
        client_id: '',
        article_id: ''
      },
      articles: [],
      clients: [],
      loading: false,
      clientRules: [
        v => !!v || 'El cliente es requerido'
      ],
      articleRules: [
        v => !!v || 'El articulo es requerido'
      ]
    }
  },
  created () {
    this.getClients()
    this.getArticles()
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
    getArticles () {
      this.loading = true
      articlesService.unpaginated()
        .then(res => {
          this.articles = res.data
          this.loading = false
        })
    },
    getClients () {
      this.loading = true
      clientsService.unpaginated()
        .then(res => {
          this.clients = res.data
          this.loading = false
        })
    },
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true
        loansService.create(this.loan)
          .then(res => {
            this.$emit('saved', res.data)
            this.loading = false
            this.loan = {}
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
