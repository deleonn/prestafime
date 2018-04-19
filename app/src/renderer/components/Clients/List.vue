<template>
<div class="container-fluid">
    <header>
      <h4>Clientes</h4>
      <div class="actions row my-4">
        <div class="col">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><i class="fa fa-search"></i></div>
            </div>
            <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search">
          </div>
        </div>
        <div class="col">
          <button type="submit" class="btn btn-primary mb-2 float-right">Nuevo</button>
        </div>
      </div>
    </header>
    <table class="table" v-if="clients.length > 0">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Telefono</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in clients" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.phone_number}}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <span>No hay registros.</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {api} from '@/services/api'

moment.locale('es')

export default {
  name: 'ClientsList',
  computed: {},
  mounted () {
    this.all()
  },
  data () {
    return {
      clients: []
    }
  },
  methods: {
    moment,
    all () {
      return api.get(`/clients`)
        .then(res => {
          this.clients = res.data
          console.warn(this.clients)
        })
    }
  }
}
</script>