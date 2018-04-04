<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-4">
      <v-spacer></v-spacer>
      <v-card class="mt-5">
        <v-card-title class="headline">
          Unidades de Rede
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap class="pa-3">
            <table class="datatable table">
              <thead>
                <tr>
                  <th style="width: 80px;">Letra</th>
                  <th>Caminho</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="networkDrive in networkDrives">
                  <td class="text-xs-center"><strong>{{ networkDrive.letter }}:</strong></td>
                  <td>{{ networkDrive.path }}</td>
                  <td><v-btn><v-icon>delete</v-icon></v-btn></td>
                </tr>
              </tbody>
            </table>
          </v-layout>
          <div class="text-xs-center">
            <v-btn route to="/nc-nova-rede" color="info">
              <v-icon>add
              </v-icon>
              &nbsp;Adicionar Rede
            </v-btn>
            <v-btn color="info">
              <v-icon>loop</v-icon>
              &nbsp;Restaurar Redes
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="./script"></script>