<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-footer :fixed="footerFixed" app>
        <v-spacer></v-spacer>
        <div class="text-xs-center">
          <span>&copy; FGV EPGE - 2018</span>
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'mapeia-unidade-de-rede2',
    data: () => ({
      footerFixed: false,
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
