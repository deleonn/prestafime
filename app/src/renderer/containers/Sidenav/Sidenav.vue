<template>
  <v-navigation-drawer stateless hide-overlay :mini-variant="mini" v-model="drawer" class="sidenav elevation-1" fixed>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="secondary">pets</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.route" class="mb-4">
        <v-tooltip right open-delay="500">
          <v-list-tile-action slot="activator">
            <v-icon large>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list-tile>
    </v-list>
    <v-layout row wrap justify-center>
      <div>
        <v-switch
        @click="modifyTheme"
        v-model="theme"
        ></v-switch>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'sidenav',
    data () {
      return {
        module: 'sidenav',
        drawer: true,
        items: [
          { title: 'Inicio', icon: 'dashboard', route: '/' },
          { title: 'Préstamos', icon: 'book', route: '/loans' },
          { title: 'Artículos', icon: 'widgets', route: '/articles' },
          { title: 'Inventario', icon: 'storage', route: '/inventory' },
          { title: 'Clientes', icon: 'people', route: '/clients' }
          // { title: 'Usuarios', icon: 'account_circle', route: '/users' }
        ],
        mini: true,
        right: null,
        theme: false
      }
    },
    methods: {
      modifyTheme () {
        this.$emit('theme', !this.theme)
      }
    }
  }
</script>

<style lang="scss">
  .sidenav {
    height: 100vh;
    padding-top: 20px;
  }
</style>
