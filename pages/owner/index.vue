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
              <v-btn @click="upload_slide()">upload-slide</v-btn>
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
        <v-col
          cols="12"
          style="border: 1px solid black"
          class="d-flex flex-wrap mb-1 pa-0"
        >
          <v-slide-group show-arrows>
            <v-slide-item
              v-for="(item, i) in getProductBanner"
              :key="i"
              v-slot="{ active, toggle }"
              class="px-2"
            >
              <v-hover v-slot="{ hover }">
                <div :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                  <v-card
                    :color="active ? 'primary' : 'grey lighten-1'"
                    height="200"
                    width="200"
                    @click="toggle"
                  >
                    <v-img :src="item.url" height="100%" contain>
                      <v-card-title class="text-h6 white--text">
                        <v-row
                          class="fill-height flex-column"
                          justify="space-between"
                        >
                          <div class="align-self-center mt-16">
                            <v-btn
                              :class="{ 'show-btns mr-3': hover }"
                              :color="transparent"
                              icon
                              :loading="loading"
                              :style="
                                hover
                                  ? 'border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px black;'
                                  : ''
                              "
                              @click="deleteBanner(item.id)"
                            >
                              <v-icon :color="hover ? 'red' : ''" large>
                                mdi-delete-forever
                              </v-icon>
                            </v-btn>
                            <v-btn
                              :class="{ 'show-btns ml-3': hover }"
                              :color="transparent"
                              icon
                              :loading="loading"
                              :style="
                                hover
                                  ? 'border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px black;'
                                  : ''
                              "
                              @click="selectedImage = item.url"
                            >
                              <v-icon :color="hover ? 'blue' : ''" large>
                                mdi-eye
                              </v-icon>
                            </v-btn>
                          </div>
                        </v-row>
                      </v-card-title>
                    </v-img>
                  </v-card>
                </div>
              </v-hover>
            </v-slide-item>
          </v-slide-group>
          <v-expand-transition >
            <v-sheet v-if="selectedImage !== null" width="100%" tile>
              <v-row  class="fill-height" align="center" justify="center">
                <v-img v-ripple :src="selectedImage" contain  @click="selectedImage = null"></v-img>
              </v-row>
            </v-sheet>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="getInsertImage">
      <Banners-insert-banner />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopIndex',

  data() {
    return {
      selectedImage:null,
      loading: false,
      transparent: 'rgba(255, 255, 255, 0)',
      banner_id: null,
      owner_id: null,
    }
  },
  computed: {
    getInsertImage() {
      return this.$store.state.owner.insert
    },
    getOwner() {
      return this.$store.state.owner.AllOwner
    },
    getProductBanner() {
      return this.$store.state.owner.Banner
    },
    getOwnerId() {
      return this.$store.state.owner.AllOwner.map((item) => {
        return (this.owner_id = item.id)
      })
    },
  },
  mounted() {
    this.$store.dispatch('owner/selectOwner')
    this.$store.dispatch('owner/selectBanner')
  },

  methods: {
    async deleteBanner(id) {
      this.loading = true
      await this.$axios.delete(`/banner/${id}`)
      await this.$store.dispatch('owner/selectBanner')
      this.loading = false
    },
    upload_slide() {
      this.$store.commit('owner/setInsert', true)
    },
    update() {
      this.$router.push('/owner/' + this.getOwnerId)
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

<style lang="scss" scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgb(255, 0, 0) !important;
}
</style>
