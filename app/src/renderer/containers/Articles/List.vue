<template>
  <v-container fluid>
    <h1 class="display-2 mb-3">Artículos</h1>
    <v-layout row wrap child-flex>
      <v-flex xs12 mb-3>
        <v-btn color="primary" @click.stop="getArticles()" :loading="loading" depressed style="float: right;" class="ma-0 mr-2">
          Actualizar
          <v-icon right>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-data-table
      :headers="headers"
      :items="articles"
      class="elevation-1"
      :loading="loading"
      :total-items="totalItems"
      :pagination.sync="pagination"
      :rows-per-page-items="[10]"
      :rows-per-page-text="'Artículos por página'"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ moment(props.item.created_at).format('ddd[,] DD [de] MMMM [del] YYYY') }}</td>
        </template>
      </v-data-table>
      <v-btn
        @click.stop="openNewArticleDialog()"
        fixed
        dark
        fab
        bottom
        right
        color="accent"
        >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    
    <ArticlesCreate 
      :visible="newArticleVisible" 
      @closed="closeNewArticleDialog()"
      @saved="articleCreated"
    ></ArticlesCreate>
  </v-container>
</template>

<script>
import moment from 'moment'
import * as articlesService from '@/services/articles'
import ArticlesCreate from './Create'

moment.locale('es')

export default {
  name: 'ArticlesList',
  computed: {},
  created () {
    this.getArticles()
  },
  data () {
    return {
      error: '',
      newArticleVisible: false,
      articles: [],
      headers: [
        {text: 'Nombre', value: 'name'},
        {text: 'Descripción', value: 'description'},
        {text: 'Fecha de creación', value: 'created_at'}
      ],
      loading: false,
      totalItems: 0,
      pagination: {}
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getArticles()
      },
      deep: true
    }
  },
  methods: {
    moment,
    getArticles () {
      this.loading = true
      articlesService.get(this.pagination.page)
        .then(res => {
          this.articles = res.data.data
          this.totalItems = res.data.total
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    openNewArticleDialog () {
      this.newArticleVisible = true
    },
    closeNewArticleDialog () {
      this.newArticleVisible = false
    },
    articleCreated (response) {
      this.closeNewArticleDialog()
      this.getArticles()
    }
  },
  components: {
    ArticlesCreate
  }
}
</script>