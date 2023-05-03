<template>
    <div>
      <v-row justify="center">
        <v-col ols="12" md="11">
          <form @submit.prevent="submit" class="mt-4">
            <v-card elevation="10" style="margin-top: 2px; padding-bottom: 10px">
              <v-row no-gutters class="justify-center">
                <h1 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງ</h1>
              </v-row>
              <v-row no-gutters class="ma-5 justify-space-around">
                <v-col cols="12" md="9">
                  <v-card class="mr-4 elevation-0">
                    <v-text-field
                      v-model="suplier.name"
                      :rules="[(v) => !!v || 'name is require']"
                      :counter="100"
                      label="ຊື່ຜູ້ສະໜອງ"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="suplier.tel"
                      :rules="[(v) => !!v || 'tel is require']"
                      :counter="100"
                      label="ເບີ້ໂທ"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="suplier.email"
                      :rules="[(v) => !!v || 'email is require']"
                      label="ອີເມວ"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="suplier.address"
                      :rules="[(v) => !!v || 'address is require']"
                      :counter="100"
                      label="ທີ່ຢູ່"
                      required
                      
                    ></v-text-field>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider class=""></v-divider>
              <v-row class="ma-5">
                <v-chip
                  @click="back"
                  class="ma-2 deep-purple lighten-4"
                  to="/supplier"
                >
                  <v-icon left> mdi-arrow-left-circle </v-icon>ກັບສູ່ໜ້າຜູ້ສະໜອງ
                </v-chip>
                <v-spacer></v-spacer>
  
                <v-chip @click="clear" class="ma-2 error">
                  <v-icon left> mdi-close-circle </v-icon>ຍົກເລິກ
                </v-chip>
  
                <v-chip @click="submit" class="ma-2 green accent-3">
                  <v-icon left> mdi-check-circle </v-icon>ບັນທຶກ
                </v-chip>
              </v-row>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        dialogWarning: false,
        dialogTitle: '',
        suplier: {
          name: '',
          tel: '',
          email: '',
          address: '',
        },
      }
    },
  }
  </script>