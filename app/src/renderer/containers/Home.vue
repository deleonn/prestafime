<template>
  <v-container grid-list-xs>
    <div class="my-5">
      <h2 class="display-2 secondary--text">Bienvenido, Jorge.</h2>
      <p class="subheading mt-2">Este es el estado actual de PrestaFIME.</p>
    </div>
    <v-layout row wrap>
      <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Articulos</div>
                      <div>{{articles.length}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
        </v-flex>
      <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Préstamos</div>
                      <div>{{loans.length}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
        </v-flex>
      <v-flex xs4>
            <v-card color="secondary" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Clientes</div>
                      <div>{{clients.length}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as articlesService from '@/services/articles'
import * as clientsService from '@/services/clients'
import * as loansService from '@/services/loans'

export default {
  name: 'home',
  data () {
    return {
      articles: [],
      clients: [],
      loans: []
    }
  },
  created () {
    this.getArticles()
    this.getClients()
    this.getLoans()
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    getArticles () {
      articlesService.unpaginated()
        .then(res => {
          this.articles = res.data
        })
    },
    getClients () {
      clientsService.unpaginated()
        .then(res => {
          this.clients = res.data
        })
    },
    getLoans () {
      loansService.unpaginated()
        .then(res => {
          this.loans = res.data
        })
    }
  }
}
</script>

<style>
  h1 {
    color: #245a35;
  }
</style>
