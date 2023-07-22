<template>
  <v-card>
    <v-tabs v-model="tab" background-color="teal" dark>
      <v-tab v-for="item in items" :key="item.tab">
        <h3>
          {{ item.tab }}
        </h3>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="ສິນຄ້າຂາຍດີ">
        <v-card flat>
          <v-row>
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-text> ສິນຄ້າຂາຍດີ </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <home-top-product-graph-year />
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item key="ລາຍໄດ້ລາຍຮັບ">
        <v-card flat>
          <v-card-text>
            <home-top-import-product-month />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: 'ສິນຄ້າຂາຍດີ', content: 'Customer Tab' },
        { tab: 'ລາຍໄດ້ລາຍຮັບ', content: 'ລາຍໄດ້ລາຍຮັບ' },
      ],
    }
  },
}
</script>
