<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>
          <nc-login></nc-login>
          <nc-redes></nc-redes>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NcLogin from '@/components/NcLogin'
import NcRedes from '@/components/NcRedes'

export default {
  name: 'mapeia-unidade-de-rede',
  components: {
    NcLogin,
    NcRedes
  },
  data: () => ({
    show: false,
    title: 'Vuetify.js'
  })
}
</script>

