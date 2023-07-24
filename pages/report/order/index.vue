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

      <v-tab-item key="ສິນຄ້ານິຍົນສັ່ງຊື້">
        <v-card flat>
          <v-card-text>
            <home-top-import-product />
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
        { tab: 'ສິນຄ້ານິຍົນສັ່ງຊື້', content: 'Product Tab' }
      ],
    }
  },
}
</script>
