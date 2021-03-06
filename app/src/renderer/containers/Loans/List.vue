<template>
  <v-container fluid>
    <h1 class="display-2 mb-3">Préstamos</h1>
    <v-layout row wrap child-flex>
      <v-flex xs12 mb-3>
        <v-btn color="primary" @click.stop="getLoans()" :loading="loading" depressed style="float: right;" class="ma-0 mr-2">
          Actualizar
          <v-icon right>refresh</v-icon>
        </v-btn>
      </v-flex>
      <v-data-table
      :headers="headers"
      :items="loans"
      class="elevation-1"
      :loading="loading"
      :total-items="totalItems"
      :pagination.sync="pagination"
      :rows-per-page-items="[10]"
      :rows-per-page-text="'Items por página'"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.client.name }}</td>
          <td>{{ props.item.articles[0].name }}</td>
          <td>{{ props.item.articles[0].description }}</td>
          <td class="text-xs-right">{{ moment(props.item.created_at).format('ddd[,] DD [de] MMMM [del] YYYY') }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="checkItem(props.item)">
              <v-icon color="teal">check</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-btn
        @click.stop="openNewLoanDialog()"
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
    
    <LoanCreate 
      :visible="newLoanVisible" 
      @closed="closeNewLoanDialog()"
      @saved="loanCreated"
    ></LoanCreate>
  </v-container>
</template>

<script>
import moment from 'moment'
import * as loansService from '@/services/loans'
import LoanCreate from './Create'
import confirm from '@/services/confirm'
import toast from '@/services/toast'

moment.locale('es')

export default {
  name: 'LoansList',
  computed: {},
  created () {
    this.getLoans()
  },
  data () {
    return {
      error: '',
      newLoanVisible: false,
      loans: [],
      articles: [],
      headers: [
        {text: 'Nombre del cliente', value: 'client'},
        {text: 'Artículo prestado', value: 'article'},
        {text: 'Descripción del artículo', value: 'description'},
        {text: 'Fecha de creación', value: 'created_at'},
        {text: 'Acciones', value: 'actions'}
      ],
      loading: false,
      totalItems: 0,
      pagination: {}
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getLoans()
      },
      deep: true
    }
  },
  methods: {
    moment,
    getLoans () {
      this.loading = true
      loansService.get(this.pagination.page)
        .then(res => {
          this.loans = res.data.data
          this.totalItems = res.data.total
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.error = err
        })
    },
    checkItem (loan) {
      this.loading = true
      confirm.show({
        title: '¿Deseas marcar este préstamo como entregado?',
        text: 'Esta acción no se puede revertir.',
        persistent: true
      }).then(res => {
        loansService.completeLoan(loan)
          .then(res => {
            this.loading = false
            this.closeNewLoanDialog()
            this.getLoans()
            toast.show({
              text: 'El préstamo se ha completado correctamente'
            })
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            toast.show({
              text: 'Ocurrió un error. Inténtalo de nuevo',
              color: 'error'
            })
          })
      }).catch(err => {
        console.warn(err)
        this.loading = false
      })
    },
    openNewLoanDialog () {
      this.newLoanVisible = true
    },
    closeNewLoanDialog () {
      this.newLoanVisible = false
    },
    loanCreated (response) {
      this.closeNewLoanDialog()
      this.getLoans()
    }
  },
  components: {
    LoanCreate
  }
}
</script>