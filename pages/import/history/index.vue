<template>
    <div>
      <!-- :items="import_history" -->
      <v-data-table
        :headers="Headers"
        :items="getOrder"
        show-expand
        :search="search"
        single-expand
        :expanded.sync="expanded"
        class="elevation-1"
      >
      <template #[`item.employeefirstName`]="{item}">
        <div v-if="item.employeefirstName===null">
          <div class="blue--text">ເຈົ້າຂອງຮ້ານ</div>
        </div>
        <div v-else>{{ item.employeefirstName }}</div>
      </template>
        <template #top>
          <v-row justify="center">
            <h2 class="mt-5 mb-7">ປະຫວັດນໍາເຂົ້າສິນຄ້າ</h2>
          </v-row>
          <v-divider></v-divider>
          <div>
            <v-toolbar flat>
              <v-toolbar-title>ປະຫວັດນໍາເຂົ້າສິນຄ້າ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider
              ><v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                single-line
                outlined
                dense
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
  
              <router-link to="/import">
                <v-btn
                  class="mx-2"
                  style="font-size: 17px; font-weight: bold"
                  color="primary"
                >
                  <v-icon large> mdi-plus </v-icon>
                  ນໍາເຂົ້າສິນຄ້າ
                </v-btn>
              </router-link>
            </v-toolbar>
            <v-divider></v-divider>
          </div>
        </template>
        <template #[`item.receive_date`]="{ item }">
          <div>
            {{ formatDateLo(item.receive_date) }}
          </div>
        </template>
  
        <template #[`item.actions`]="{ item }">
          <v-icon
            class="mr-2"
            color="blue"
            @click="$router.push('/import/view/' + item.id)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        search: '',
        expanded: [],
        Headers: [
          {
            text: 'ລໍາດັບ',
            value: 'index',
          },
          {
            text: 'ໃບນໍາເຂົ້າວັດຖຸດິບ',
            value: 'id',
          },
          { text: 'ພະນັກງານ', align: 'center', value: 'employeefirstName' },
          { text: 'ວັນທີ່ສັ່ງຊື້', align: 'center', value: 'receive_date' },
          { text: 'actions', value: 'actions' },
        ],
        detaillist: [],
        detail: [],
      }
    },
    computed: {
      getOrder() {
        return this.$store.state.import.AllImport.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      },
    },
    mounted() {
      this.$store.dispatch('import/selectAll')
    },
  }
  </script>
  