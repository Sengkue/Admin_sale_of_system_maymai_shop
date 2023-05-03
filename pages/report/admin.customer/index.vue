<template>
    <div id="chart" v-ripple="{ class: `error--text` }">
      <v-row no-gutters class="justify-center">
        <h1>ລາຍງານຂໍ້ມູນລູກ</h1>
      </v-row>
  
      <v-row no-gutters class="ml-7">
        <v-col cols="mx-2" md="3">
          <v-card class="mx-2" height="237" elevation="2">
            <v-row no-gutters class="justify-center">
              <div>
                <v-icon size="120" color="#4FC3F7">mdi-account</v-icon>
                <div class="pa-2">
                  <h3>ລູກຄ້າທັງໜົດ</h3>
                  <span> ຄົນ</span>
                </div>
              </div>
            </v-row>
            <v-row no-gutters class="mr-2 mt-2">
              <v-spacer></v-spacer>
              <v-btn class color="primary">
                <v-icon dark left>mdi-printer</v-icon>print
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="justify-center">
        <v-card class="ma-2 ml-9" width="100%">
          <v-row no-gutters class="justify-center">
            <h3>ຂໍ້ມູນລູກຄ້າທັງໝົດ</h3>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="customermember"
            hide-default-footer
          >
            <template v-slot:item="{ item }">
              <tr
                v-if="item.status == 'Member'"
                v-ripple="{ class: `white--text` }"
              >
                <td class="align-baseline justify-start">
                  <v-card
                    class="mx-auto"
                    height="100"
                    width="70"
                    :img="fectImg(item.image)"
                  >
                  </v-card>
                </td>
                <td>{{ item.full_name }}</td>
                <td>{{ item.tel }}</td>
                <td>{{ item.facebook }}</td>
                <td>{{ item.email }}</td>
                <td>
                  {{ item.village + ', ' }} {{ item.district + ', '
                  }}{{ item.province + ', ' }} {{ item.country }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        headers: [
          {
            text: 'ຮູບ',
            align: 'center',
            sortable: false,
            value: 'image',
          },
          { text: 'ຊື່ ແລະ ນານສະກຸນ', value: 'full_name' },
          { text: 'ເບີໂທລະສັບ', value: 'tel' },
          { text: 'ເຟສບຸກ', value: 'facebook' },
          { text: 'ອີແມວ', value: 'email' },
          { text: 'ທີ່ຢູ່', value: '' },
        ],
      }
    },
  }
  </script>