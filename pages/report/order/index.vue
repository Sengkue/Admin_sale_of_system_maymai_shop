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
      <v-tab-item key="ສິນຄ້າທັງໝົດໃຈສະຕ໊ອກ">
        <v-card flat>
          <v-card-text>
            <report-product-all />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item key="ສິນຄ້າໃກ້ໝົດສະຕ໊ອກ">
        <v-card flat>
          <v-card-text>
            <Report-product-almost-out-stock />
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
        { tab: 'ສິນຄ້າທັງໝົດໃຈສະຕ໊ອກ', content: 'Product Tab' },
        { tab: 'ສິນຄ້າໃກ້ໝົດສະຕ໊ອກ', content: 'Employee Tab' },
      ],
    }
  },
}
</script>
