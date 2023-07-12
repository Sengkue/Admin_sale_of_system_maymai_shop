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
      <v-col v-if="getBanner !== null && getBanner !=='' && getBanner !==[]" cols="12" class="d-flex flex-wrap justify-center text-center">
        <v-card max-width="100%">
        <v-slide-group class="pa-4" show-arrows>
      <v-slide-item v-for="(banner, index) in getBanner" :key="index" v-slot="{ active, toggle }">
        <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-4" height="200" width="100" @click="toggle">
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-img :src="banner.url" :alt="banner.altText" width="100" contain @click="showImage(banner.url)"></v-img>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    
    </v-slide-group>
  </v-card>
    <v-expand-transition>
      <v-sheet v-if="model !== null" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <h3 class="text-h6">
            <v-img v-if="selectedImage" :src="selectedImage" max-height="300" contain></v-img>
          </h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopId',
  data: () => ({
      selectedImage: null,
      
    }),
  computed: {
    getProductDetail() {
      return this.$store.state.product.StateSelectOne
    },
    getBanner() {
      return this.$store.state.banner.banner
    },
  },
  mounted() {
    this.$store.dispatch('product/selectOne', this.$route.params.id)
    this.$store.dispatch('banner/selectById', this.$route.params.id)

  },
  methods: {
    showImage(imageUrl) {
      this.selectedImage = imageUrl;
    }
  }
}
</script>

<style lang="scss" scoped></style>
