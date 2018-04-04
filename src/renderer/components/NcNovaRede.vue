<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 class="mt-4">
            <v-form  ref="form" lazy-validation id="formNcNewDrive">
                <v-card-title class="headline">
                    Adicionar Unidade de Rede
              </v-card-title>
              <v-text-field
              @keyup="nomeDiscoPreenchido=false"
              v-model="caminhoDisco"
              label="Insira o caminho do disco a ser adicionado"
              required
              :rules="novoDiscoRules">
          </v-text-field>
          <div class="text-xs-center">
            <v-btn @click="submit"color="info" center route to="/nc-home">Conectar </v-btn>
            <v-btn @click="clear">Limpar</v-btn>
        </div>
    </v-form>
</v-flex>
</v-layout>
</template>

<script>

export default {
    name: 'Home',
    data: () => ({
        novoDiscoRules: [
        v => !!v || 'Campo obrigatório',
        ],
        caminhoDisco: '',
        nomeDiscoPreenchido: '',
        ldap_url: 'ldap://fgv.br:389',
        ldap_domain: 'FGV',
        defaultDrivers: [
        '\\\\fgvfsbi.fgv.br\\EPGE',
        //'\\\\bo2002.fgv.br\\user\\wanderson.braganca',
        '\\\\fgvfsdc.fgv.br\\iep-www-professor\\rubens'
        ],
        networkDrives: {},
        ldap_url: 'ldap://fgv.br:389',
        valid: false,
        usuario: '',
    }),
    methods: {
        submit() {
          console.log("Sucesso")
      },
      clear() {
          this.$refs.form.reset();
          this.nomeDiscoPreenchido = false;
      },
  }
};
</script>