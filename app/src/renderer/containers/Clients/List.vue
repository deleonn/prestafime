<template>
  <v-container fluid>
    <h1 class="display-2 mb-3">Clientes</h1>
    <v-layout row wrap child-flex>
      <v-flex xs12 mb-3>
        <v-btn color="primary" @click.stop="getClients()" :loading="loading" depressed style="float: right;" class="ma-0 mr-2">
          Actualizar
          <v-icon right>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-data-table
      :headers="headers"
      :items="clients"
      class="elevation-1"
      :loading="loading"
      :total-items="totalItems"
      :pagination.sync="pagination"
      :rows-per-page-items="[10]"
      :rows-per-page-text="'Clientes por página'"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.phone_number }}</td>
          <td class="text-xs-right">{{ moment(props.item.created_at).format('ddd[,] DD [de] MMMM [del] YYYY') }}</td>
        </template>
      </v-data-table>
      <v-btn
        @click.stop="openNewClientDialog()"
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
    
    <ClientsCreate 
      :visible="newClientVisible" 
      @closed="closeNewClientDialog()"
      @saved="clientCreated"
    ></ClientsCreate>
  </v-container>
</template>

<script>
import moment from 'moment'
import * as clientsService from '@/services/clients'
import ClientsCreate from './Create'

moment.locale('es')

export default {
  name: 'ClientsList',
  computed: {},
  created () {
    this.getClients()
  },
  data () {
    return {
      error: '',
      newClientVisible: false,
      clients: [],
      headers: [
        {text: 'Nombre', value: 'name'},
        {text: 'Correo', value: 'email'},
        {text: 'Télefono', value: 'phone_number'},
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
        this.getClients()
      },
      deep: true
    }
  },
  methods: {
    moment,
    getClients () {
      this.loading = true
      clientsService.get(this.pagination.page)
        .then(res => {
          this.clients = res.data.data
          this.totalItems = res.data.total
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    openNewClientDialog () {
      this.newClientVisible = true
    },
    closeNewClientDialog () {
      this.newClientVisible = false
    },
    clientCreated (response) {
      this.closeNewClientDialog()
      this.getClients()
    }
  },
  components: {
    ClientsCreate
  }
}
</script>