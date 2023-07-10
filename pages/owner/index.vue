<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card
            class="d-flex justify-space-between teal white--text py-2 mt-n3 px-5"
          >
            <h1>ຈັດການຂໍ້ມູນເຈົ້າຂອງຮ້ານ</h1>
            <div>
              <v-btn @click="deleteAction">delete</v-btn>
              <v-btn @click="update()">update</v-btn>
              <v-btn to="/owner/create">add</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
        <v-col cols="12" class="d-flex flex-wrap">
          <div v-for="(item, index) in getBanner" :key="index" class="mx-1">
            <v-img :src="item.url" width="250px"></v-img>
          </div>
        </v-col>
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
      owner_id: '',
    }
  },
  computed: {
    getOwner() {
      return this.$store.state.owner.AllOwner
    },
    getBanner() {
      return this.$store.state.owner.Banner
    },
    getBannerId() {
      return this.$store.state.owner.AllOwner.map((item) => {
        return (this.banner_id = item.bannerId)
      })
    },
    getOwnerId() {
      return this.$store.state.owner.AllOwner.map((item) => {
        return (this.owner_id = item.id)
      })
    },
  },
  mounted() {
    this.$store.dispatch('owner/selectOwner')
    this.$store.dispatch('owner/selectBanner', this.getBannerId)
  },

  methods: {
    update(){
      this.$router.push('/owner/'+ this.getOwnerId)
    },
    async deleteAction() {
      await this.$swal
        .fire({
          title: 'ທ່ານແນ່ໃຈບໍ?',
          text: `ທີ່ຈະຍົກເລີກຂໍ້ມູນລາຍການນີ້!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ຢືນຢັນລືບ!',
          cancelButtonText: 'ຍົກເລີກ',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loading = true
            await this.$axios.delete(`owner/${this.getOwnerId}`)
            this.$store.dispatch('owner/selectOwner')
            this.$store.dispatch('owner/selectBanner', this.getBannerId)

            this.loading = false
            this.$swal.fire({
              title: 'ລືບສຳເລັດ!',
              text: 'ຂໍ້ມູນໄດ້ຖືກລືບສຳເລັດ.',
              icon: 'success',
              confirmButtonText: 'OKAY',
              customClass: {
                container: 'my-swal-container',
              },
            })
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
