<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-card class="py-2 teal white--text">Product Detail</v-card>
      </v-col>
      <v-col cols="6" class="text-center">
        <v-img :src="getProductDetail.profile" width="250px"></v-img>
      </v-col>
      <v-col cols="6">
        <div>
          ຊຶ່ສິນຄ້າ: <span>{{ getProductDetail.name }}</span>
        </div>
        <div>
          ປະເພດສິນຄ້າ: <span>{{ getProductDetail.category }}</span>
        </div>
        <div>
          ຂະໜາດ: <span>{{ getProductDetail.size_id }}</span>
        </div>
        <div>
          ຈຳນວນ: <span>{{ getProductDetail.quantity }}</span>
        </div>
        <div>
          ລາຄາຂາຍ: <span>{{ formatPrice(getProductDetail.sale_price) }}</span>
        </div>
        <div>ຄຳອະທີບາຍ:</div>
        <div>{{ getProductDetail.description }}</div>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center text-center">
        <v-slide-item
          v-for="(banner, index) in getBanner"
          :key="index"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-img
                  :src="banner.url"
                  :alt="banner.altText"
                  width="100"
                  contain
                ></v-img>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopId',

  computed: {
    getProductDetail() {
      return this.$store.state.product.StateSelectOne
    },
    getBanner() {
      return this.$store.state.product.banner
    },
  },
  mounted() {
    this.$store.dispatch('product/selectOne', this.$route.params.id)
    this.$store.dispatch('product/selectBanner', this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped></style>
