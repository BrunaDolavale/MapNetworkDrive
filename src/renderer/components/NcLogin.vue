<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-4">
      <v-form v-model="valid" ref="form" lazy-validation id="formNcSignIn">
        <v-text-field
        prepend-icon="person"
        label="Usuário"
        v-model="usuario"
        :rules="usuarioRules"
        required
        @keyup="usuarioAutenticado=false"
        ></v-text-field>
        <v-text-field
        prepend-icon="lock"
        label="Senha"
        v-model="senha"
        :rules="senhaRules"
        type="password"
        required
        @keyup="usuarioAutenticado=false"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn
          @click="submit"
          color="info"
          center
          :disabled="!valid"
          >
          Conectar
        </v-btn>
        <v-btn @click="clear">Limpar</v-btn>
      </div>
    </v-form>
  </v-flex>
</v-layout>
</template>

<script>
const ldap = require('ldapjs');
const networkDrive = require('windows-network-drive');

export default {
  name: 'Home',
  data: () => ({
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
        usuarioRules: [
        v => !!v || 'Campo obrigatório',
        ],
        senha: '',
        senhaRules: [
        v => !!v || 'Campo obrigatório',
        ],
        usuarioAutenticado: false,
      }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const login = this.loginLdap(`${this.ldap_domain}\\${this.usuario}`, this.senha);
        return false;
      }
    },

    clear() {
      this.$refs.form.reset();
      this.usuarioAutenticado = false;
    },

    loginLdap(dn, password) {
      var clientLdap = ldap.createClient({url: this.ldap_url});
      var obj = this;
      clientLdap.bind(dn, password, function (err) {
        clientLdap.unbind();
        obj.usuarioAutenticado = (err === null);
      });

      return obj.usuarioAutenticado;
    },

    mountDrives() {
      this.loadNetworkDrives();
      var $self = this;
      for (var index in this.networkDrives) {
        let drive = this.networkDrives[index];
        if (drive.mounted === false) {
          networkDrive.mount(drive.path, drive.letter, `${this.ldap_domain}\\${this.usuario}`, this.senha)
          .then(function (driveLetter) {
            drive.mounted = true;
            $self.loadNetworkDrives();
          });
        }
      }
    },

    loadNetworkDrives() {
      networkDrive.list()
      .then(drives => this.setNetworkDrives(drives), error => { this.setNetworkDrives({}) });
    },

    driveLettersAvailable(drives={}) {
      let lettersList = 'HIJKLMNOPQRSTUVWXYZ'.split('');
      let driveLetters = Object.keys(drives);

      let lettersAvailable = lettersList.filter(function(item) {
        return driveLetters.indexOf(item) < 0;
      });

      return lettersAvailable;
    },

    setNetworkDrives(drives={}) {
      let driveLettersAvailable = this.driveLettersAvailable(drives);
      let drivePaths = Object.values(drives);
      let driveLetters = Object.keys(drives);
      let items = [];
      for (var index in this.defaultDrivers) {
        if (driveLettersAvailable.length > 0) {
          let item = {
            path: this.defaultDrivers[index],
          };
          let driveLetterIndex = drivePaths.indexOf(this.defaultDrivers[index]);
          if (driveLetterIndex >= 0) {
            item['letter'] = driveLetters[driveLetterIndex];
            item['mounted'] = true;
            let indexDriveLettersAvailable = driveLettersAvailable.indexOf(item['letter']);
            if (indexDriveLettersAvailable !== -1) driveLettersAvailable.splice(indexDriveLettersAvailable, 1);
          } else {
            item['letter'] = driveLettersAvailable.pop();
            item['mounted'] = false;
          }

          items.push(item);
        } else {
          console.log('Error: não existe letra disponível');
        }
      }
      this.networkDrives = items;
    }
  },

  mounted() {
    try {
      this.loadNetworkDrives();
    } catch(err) {
    }
  },

  watch: {
    usuarioAutenticado: function(newVal, oldVal) {
      if (newVal) {
        this.mountDrives();
        console.log('Montando drives de rede...');
      }
    }
  }

};
</script>