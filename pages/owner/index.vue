<template>
  <div>
    <v-container fluid>
      <v-row v-for="a in getOwner" :key="a.id">
        <v-col cols="12" class="d-flex justify-center">
          <div><v-img :src="a.profile" width="150px"></v-img></div>
        </v-col>
        <v-col cols="4" class="d-flex">
          <div>firstname: {{ a.firstName }}</div>
        </v-col>
        <v-col cols="4">
          <div>LastName: {{ a.lastName }}</div>
        </v-col>
        <v-col cols="4">
          <div>ShopeName: {{ a.shopName }}</div>
        </v-col>
        <v-col cols="4">
          <div>Phone Number: {{ a.phone }}</div>
        </v-col>
        <v-col cols="4">
          <div>Email: {{ a.email }}</div>
        </v-col>
        <v-col cols="4">
          <div>Gender: {{ a.gender }}</div>
        </v-col>
        <v-col cols="12">
          <div>Address: {{ a.address }}</div>
        </v-col>
        <v-col cols="12">
          <div>Description: {{ a.description }}</div>
        </v-col>
        <v-col cols="12" style="border: 1px solide black"> banner </v-col>
        <v-col cols="12">{{ getOwner }}</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopIndex',

  data() {
    return {
      banner_id: '',
    }
  },
  computed: {
    getOwner() {
      return this.$store.state.owner.AllOwner
    },
    getBannerId() {
      return this.$store.state.owner.AllOwner.map((item) => {
        return (this.banner_id = item.bannerId)
      })
    },
  },
  mounted() {
    this.$store.dispatch('owner/selectOwner')
    this.$store.dispatch('owner/selectBanner', this.getBannerId)
  },

  methods: {},
}
</script>

<style lang="scss" scoped></style>
