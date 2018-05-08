<template>
  <v-container fluid>
    <h1 class="display-2 mb-3">Inventario</h1>
    <v-layout row wrap child-flex>
      <v-flex xs12 mb-3>
        <v-btn color="primary" @click.stop="getInventory()" :loading="loading" depressed style="float: right;" class="ma-0 mr-2">
          Actualizar
          <v-icon right>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-data-table
      :headers="headers"
      :items="inventory"
      class="elevation-1"
      :loading="loading"
      :total-items="totalItems"
      :pagination.sync="pagination"
      :rows-per-page-items="[10]"
      :rows-per-page-text="'Items por página'"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.article.name }}</td>
          <td class="text-xs-right">{{ props.item.stock }}</td>
          <td class="text-xs-right">{{ moment(props.item.created_at).format('ddd[,] DD [de] MMMM [del] YYYY') }}</td>
        </template>
      </v-data-table>
      <v-btn
        @click.stop="openNewInventoryDialog()"
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
    
    <InventoryCreate 
      :visible="newInventoryVisible" 
      @closed="closeNewInventoryDialog()"
      @saved="inventoryCreated"
    ></InventoryCreate>
  </v-container>
</template>

<script>
import moment from 'moment'
import * as inventoryService from '@/services/inventory'
import InventoryCreate from './Create'

moment.locale('es')

export default {
  name: 'InventoryList',
  computed: {},
  created () {
    this.getInventory()
  },
  data () {
    return {
      error: '',
      newInventoryVisible: false,
      inventory: [],
      articles: [],
      headers: [
        {text: 'Articulo', value: 'name'},
        {text: 'Stock', value: 'stock'},
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
        this.getInventory()
      },
      deep: true
    }
  },
  methods: {
    moment,
    getInventory () {
      this.loading = true
      inventoryService.get(this.pagination.page)
        .then(res => {
          this.inventory = res.data.data
          this.totalItems = res.data.total
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    openNewInventoryDialog () {
      this.newInventoryVisible = true
    },
    closeNewInventoryDialog () {
      this.newInventoryVisible = false
    },
    inventoryCreated (response) {
      this.closeNewInventoryDialog()
      this.getInventory()
    }
  },
  components: {
    InventoryCreate
  }
}
</script>