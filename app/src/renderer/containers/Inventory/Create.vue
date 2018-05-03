<template>
  <v-dialog v-model="isVisible" max-width="500px">
    <v-form v-model="valid" ref="form">
      <v-card tile>
        <v-card-title>
          <span class="headline">Crea un objeto del inventario</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
									<v-select
                  :items="articles"
                  item-text="name"
                  item-value="id"
                  v-model="inventory.article_id"
                  label="Articulo"
                  single-line
                ></v-select>
									<v-text-field
										label="Stock"
										v-model="inventory.stock"
                    required
                    type="number"
                    :rules="stockRules"
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
import * as inventoryService from '@/services/inventory'
import * as articlesService from '@/services/articles'
import toast from '@/services/toast'

export default {
  name: 'InventoryCreate',
  data () {
    return {
      error: '',
      valid: true,
      inventory: {
        name: '',
        stock: '',
        article_id: ''
      },
      articles: [],
      loading: false,
      nameRules: [
        v => !!v || 'El nombre es requerido'
      ],
      stockRules: [
        v => !!v || 'El stock es requerido'
      ]
    }
  },
  created () {
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
          console.log(res)
          this.articles = res.data
          this.loading = false
        })
    },
    save () {
      if (this.$refs.form.validate()) {
        this.loading = true
        inventoryService.create(this.inventory)
          .then(res => {
            this.$emit('saved', res.data)
            this.loading = false
            this.inventory = {}
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
