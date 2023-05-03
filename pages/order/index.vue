<template>
  <div>
    <v-row justify="center">
      <h2 class="mt-5 mb-7">ສັ່ງຊື້ສິນຄ້າ</h2>
    </v-row>
    <v-divider></v-divider>
    <v-stepper v-model="e1" class="elevation-0 grey lighten-5">
      <v-stepper-header>
        <router-link to="">
          <v-btn
            class="mt-4"
            text
            style="font-size: 20px; "
          >
            <v-icon large left>mdi-history</v-icon>
            ປະຫວັດການສັ່ງຊື້ສິນຄ້າ
          </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <template v-for="n in steps">
          <v-stepper-step
            dense
            flat
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
            <h2 v-if="n == 1">ເລືອກສິນຄ້າ</h2>
            <h2 v-if="n == 2">ຢຶນຢັນສັ່ງຊື້ສິນຄ້າ</h2>
          </v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
        <v-spacer></v-spacer>
        <v-chip @click="steps2" class="ma-5" color="#004D40" outlined>
          <v-avatar left>
            <v-icon>mdi-cart</v-icon>
          </v-avatar>
          {{ orderList.length }}
        </v-chip>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <!-- __________________________________________________111____________________________________________________________ -->

          <v-card
            v-if="n == 1 || e1 == 1"
            class="grey lighten-5 elevation-2 ma-0"
          >
            <div>
              <v-data-table
                :headers="materialHeaders"
                :items="material"
                :search="search"
                item-key="pro_name"
                sort-by="idex"
                class="elevation-2 table"
              >
                <template #top>
                  <v-toolbar flat>
                    <v-toolbar-title>ລາຍການຂໍ້ມູນສິນຄ້າ</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="ຄົ້ນຫາ"
                      outlined
                      dense
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-divider></v-divider>
                </template>
                <template #item="{ item }">
                  <tr v-ripple="{ class: `white--text` }">
                    <td>{{ item.idx }}</td>
                    <td align="center">
                      <v-card
                        height="100"
                        width="100"
                        :img="fectImg(item.image)"
                      ></v-card>
                    </td>
                    <td>{{ item.pro_name }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.color }}</td>
                    <td>{{ item.size }}</td>
                    <!-- <td>{{ item.unit }}</td> -->
                    <td>
                      <v-row>
                        <v-btn
                          @click="AddItem(item)"
                          class="mx-2"
                          fab
                          dark
                          :color="item.check"
                        >
                          <v-icon large>{{ item.icon }}</v-icon>
                        </v-btn>
                      </v-row>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="steps2"
                style="font-size: 20px; font-weight: bold"
                color="#00E5FF"
                rounded
                class="mt-5"
              >
                ໄປໜ້າກະຕ່າສິນຄ້າ
                <v-icon large right
                  >mdi-arrow-right-bold-hexagon-outline</v-icon
                >
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- __________________________________________________222____________________________________________________________ -->

          <v-card v-if="n == 2" class="elevation-0 ma-0">
            <v-data-table
              :headers="headers"
              :items="orderList"
              :search="search"
              hide-default-footer
              item-key="name"
              v-model="selected"
              sort-by="calories"
              class="elevation-2"
            >
              <template #top>
                <div>
                  <v-toolbar flat>
                    <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="suplierItem.name"
                      readonly
                      prepend-icon="mdi-account"
                      label="Suppier"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card>
                        <v-card-title
                          style="
                            font-size: 25px;
                            font-weight: bold;
                            
                          "
                        >
                          ທ່ານຕ້ອງການລຶບຂໍ້ມູນລາຍການນີ້ບໍ...?
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="error"
                            text
                            style="font-size: 20px; "
                            @click="close"
                            >ຍົກເລິກ</v-btn
                          >
                          <v-btn
                            color="primary"
                            text
                            style="font-size: 20px; "
                            @click="deleteItemConfirm"
                            >ຢຶນຢັນລຶບ</v-btn
                          >
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </div>
              </template>

              <template #item="{ item }">
                <tr v-ripple="{ class: `white--text` }">
                  <td>{{ item.index }}</td>
                  <td>
                    <v-img
                      :src="fectImg(item.image)"
                      contain
                      height="100"
                      width="100"
                    ></v-img>
                  </td>
                  <td>{{ item.pro_name }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.color }}</td>
                  <td>{{ item.size }}</td>
                  <td>
                    <v-text-field
                      class="mt-5 tcenter"
                      filled
                      dense
                      rounded
                      prepend-inner-icon="mdi-minus"
                      append-icon="mdi-plus"
                      autofocus
                      v-model="item.qty"
                      hint="ຈໍານວນທີ່ຕ້ອງການ"
                      @click:append="Add(pro)"
                      @click:prepend-inner="Minus(item)"
                      @keypress="InputQty($event, item)"
                      @keyup="ZeroQty(item)"
                      v-ripple="{ class: `white--text` }"
                    >
                      <template slot="append">
                        <v-btn
                          style="margin-top: -7px; margin-right: -20px"
                          color="green"
                          icon
                          @click="Add(item)"
                        >
                          <v-icon large>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <template slot="prepend-inner">
                        <v-btn
                          style="margin-top: -7px; margin-left: -20px"
                          color="green"
                          icon
                          @click="Minus(item)"
                        >
                          <v-icon large>mdi-minus</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </td>
                  <!-- <td>{{ item.unit }}</td> -->
                  <td>
                    <v-row>
                      <v-icon color="red" large @click="deleteItem(item)"
                        >mdi-delete</v-icon
                      >
                    </v-row>
                  </td>
                </tr>
              </template>

              <template #footer>
                <v-row class="ma-5" align="center" justify="center">
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="clear"
                    style="font-size: 20px; font-weight: bold"
                    color="#FF8A65"
                    rounded
                    class="mt-2 mr-7 mb-5"
                  >
                    <v-icon left large>mdi-close-circle</v-icon>ຍົກເລິກ
                  </v-btn>

                  <v-btn
                    @click="saveOrder"
                    style="font-size: 20px; font-weight: bold"
                    color="#1DE9B6"
                    rounded
                    class="mt-2 mr-5 mb-5"
                    :disabled="emty"
                  >
                    <v-icon large left>mdi-check-circle</v-icon
                    >ຢຶນຢັນສັ່ງຊື້ສິນຄ້າ
                  </v-btn>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="dialogSuplier" max-width="700px">
      <v-card class="ma-2">
        <v-data-table
          :headers="headersSuplier"
          :items="suplier"
          :search="sreachSuppier"
          item-key="idx"
          sort-by="name"
          class="elevation-2 table"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>ຂໍ້ມູນຜູ້ສະໜອງ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
          </template>
          <template #item="{ item }">
            <tr v-ripple="{ class: `white--text` }">
              <td>
                <v-row class="justify-center">
                  <v-icon
                    @click="ChoiceSuplier(item)"
                    class="mr-2"
                    color="success"
                    >mdi-account-check</v-icon
                  >
                </v-row>
              </td>
              <td>{{ item.idx }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.address }}</td>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="CloseSuplier">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
      steps: 2,
      dialog: false,
      dialogDelete: false,
      dialogSuplier: false,
      materialHeaders: [
        { text: 'ລໍາດັບ', value: 'idex' },
        {
          text: 'ຮູບ',
          align: 'center',
          sortable: false,
          value: 'image',
        },
        { text: 'ສິນຄ້າ', value: 'name' },
        { text: 'ປະເພດ', value: 'category' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ/ເບີ້', value: 'size' },
        // { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ເລຶອກ', value: 'actions', sortable: false },
      ],
      headers: [
        { text: 'ລໍາດັບ', value: 'idex' },
        {
          text: 'ຮູບ',
          align: 'start',
          sortable: false,
          value: 'image',
        },
        { text: 'ສິນຄ້າ', value: 'pro_name' },
        { text: 'ປະເພດ', value: 'category' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ', value: 'size' },
        { text: 'ຈໍານວນ', value: 'qty' },
        // { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ລຶບ', value: 'actions', sortable: false },
      ],
      sreachSuppier: '',
      headersSuplier: [
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'ລໍາດັບ', value: 'idx' },
        { text: 'ຊື່ຜູ້ສະໜອງ', value: 'name' },
        { text: 'ເບີ້ໂທ', value: 'tel' },
        { text: 'ອີເມວ', value: 'email' },
        { text: 'ທີ່ຢູ່', value: 'address' },
      ],
      suplierItem: {
        sup_id: '',
        name: '',
        tel: '',
        email: '',
        address: '',
      },
      m_id: '',
      orderList: [],
      orderby: {
        m_order_id: null,
        emp_id: '',
        sup_id: '',
        orderdetail: [],
      },
    }
  },
}
</script>