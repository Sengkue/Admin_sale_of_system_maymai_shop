<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-img src="/icon.png" />
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-row>
          <v-col cols="12" class="d-flex justify-space-between">
            <h1>ລາຍລະອຽດ</h1>
            <v-btn color="error" to="/product">back</v-btn></v-col
          >
          <v-col cols="12">ຊື່ສິນຄ້າ:</v-col>
          <v-col cols="12">ລາຄາຊື້:</v-col>
          <v-col cols="12">ລາຄາຂາຍ:</v-col>
          <v-col cols="12">ຈຳນວນ:</v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="teal"> banner </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopId',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
