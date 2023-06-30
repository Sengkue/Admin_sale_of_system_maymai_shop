<template>
  <v-row justify="center">
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card class="teal white--text text-center py-5 mb-n8">
          <h2>ສ້າງສິນຄ້າ</h2>
        </v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" class="">
                <div class="justify-center text-center mt-5">
                  <div>
                    <v-avatar
                      size="130"
                      style="
                        border-radius: 10%;
                        border: 3px solid teal;
                        box-shadow: 12px;
                      "
                    >
                      <v-img v-if="url" :src="url"></v-img>
                      <v-img v-else src="logo.png"></v-img>
                    </v-avatar>
                  </div>
                  <v-file-input
                    id="file"
                    v-model="file"
                    :rules="imageRules"
                    label="Image"
                    class="d-none"
                    prepend-icon="mdi-camera"
                    @change="onFileChange"
                    @click="upload"
                  ></v-file-input>
                  <!--------------------------- buttom profile -->
                  <v-btn class="mt-2" color="primary" small @click="upload">
                    <v-icon>mdi-tray-arrow-up</v-icon>
                    Profile
                  </v-btn>
                </div>
              </v-col>

              <!--------------------------- input images banner profile -->
              <v-col cols="6" class="mt-4">
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="selectedFiles"
                      accept="image/*"
                      label="ເລືອກຮູບ Banners"
                      multiple
                      filled
                      show-size
                      prepend-icon="mdi-camera"
                    >
                    </v-file-input>
                  </v-col>
                  <v-col cols="12" class="mb-5 mt-n5 d-flex flex-wrap">
                    <div
                      v-for="(item, index) in selectedFiles"
                      :key="index"
                      class="mx-1"
                    >
                      <v-img
                        :src="getFileUrl(item)"
                        width="60"
                        height="70"
                      ></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <!-- -------------------   input text field -->
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="name"
                  prepend-inner-icon="mdi-shopping"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="ຊື່*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="Barcode"
                  prepend-inner-icon="mdi-barcode-scan"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="BarCode*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                  v-model="category"
                  filled
                  dense
                  :items="getCategory"
                  item-value="id"
                  item-text="category"
                  label="ປະເພດສິນຄ້າ"
                  required
                  prepend-inner-icon="mdi-tshirt-crew"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                  v-model="supplier_id"
                  filled
                  dense
                  :items="getSupplier"
                  item-value="id"
                  item-text="name"
                  label="ຜູ້ສະໜອງ"
                  required
                  prepend-inner-icon="mdi-store-outline"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                ></v-select>
              </v-col>

              <v-col cols="12" class="py-0" sm="6">
                <v-text-field
                  v-model="cost_price"
                  prepend-inner-icon="mdi-cellphone"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="ລາຄາຊື້"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="sale_price"
                  prepend-inner-icon="mdi-cellphone"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="ລາຄາຂາຍ"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="quantity"
                  prepend-inner-icon="mdi-cellphone"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="ຈຳນວນ"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="description"
                  prepend-inner-icon="mdi-semantic-web"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  filled
                  dense
                  label="ຄຳອະທີບາຍ"
                  class="custom-textarea"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div v-if="uploadImage" class="loading-graphic">
            <div class="loading-bar" :style="{ width: getPercentage + '%' }">
              <div class="loading-number">{{ getPercentage }}%</div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="back()"> Close </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            :disabled="!valid"
            @click="insert()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    uploadImage: false,
    valid: false,
    file: null,
    file1: null,
    url: null,
    url1: null,
    imageRules: [(v) => !!v || 'Image is required'],
    loading: false,
    modal: '',
    name: '',
    category: '',
    description: '',
    quantity: '',
    sale_price: '',
    cost_price: '',
    Barcode: '',
    supplier_id: '',
    urlImage: '',
    selectedFiles: '',
    productId: '',
    getPercentage: 0,
  }),
  computed: {
    // getPercentage: {
    //   get() {
    //     return this.$store.state.product.uploadProgress
    //   },
    //   set(value) {},
    // },
    getOneUser() {
      return this.$store.state.supplier.StateSelectOne
    },
    getSupplier() {
      return this.$store.state.supplier.StateSelectAll
    },
    getCategory() {
      const allCategory = this.$store.state.category.Allcategory
      if (allCategory && allCategory.rows) {
        return allCategory.rows.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      } else {
        return []
      }
    },
  },
  mounted() {
    this.$store.dispatch('supplier/selectAll')
    this.$store.dispatch('category/selectCategory')
    this.$store.dispatch('category/selectCategory')
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },
    upload() {
      document.getElementById('file').click()
    },
    getFileUrl(file) {
      return URL.createObjectURL(file)
    },

    back() {
      this.$router.push('/product')
    },
    async insert() {
      this.uploadImage = true
      const file = this.file
      const formData = new FormData()
      formData.append('file', file)
      this.$refs.form.validate()
      if (!this.valid) return
      this.loading = true
      this.urlImage = await this.$axios
        .post('upload/single', formData)
        .then((response) => {
          return response?.data?.url
        })
        .catch((error) => {
          this.$toast.success('File upload failed', error)
        })
      // console.log('showurl:', this.urlImage)
      const data = {
        name: this.name,
        category: this.category,
        description: this.description,
        quantity: this.quantity,
        sale_price: this.sale_price,
        cost_price: this.cost_price,
        Barcode: this.Barcode,
        supplier_id: this.supplier_id,
        profile: this.urlImage,
      }
      this.productId = await this.$axios.post('product/', data).then((res) => {
        return res?.data?.result?.id
      })

      const formDatas = new FormData()
      for (const file of this.selectedFiles) {
        formDatas.append('files', file)
      }
      const config = {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          this.getPercentage = percentCompleted
        },
      }
      const res = await this.$axios.post('/upload/multiple', formDatas, config)
      const images = await res.data.files.map((image) => {
        const imageUrl = image.url
        const name = image.originalName
        return this.$axios
          .post(`/image`, {
            productId: this.productId,
            url: imageUrl,
            altText: name,
          })
          .then((res) => {
            console.log('cound', res)
          })
      })
      console.log('showUrl-image:', images)
      // const requests = images.map((image) => {
      //   const imageUrl = image.image
      //   return this.$axios.post(`/shop-banners-admin/${this.productId}`, {
      //     url: imageUrl,
      //   })
      // })
      // await Promise.all(requests)

      this.uploadImage = false
      await this.$store.dispatch('supplier/selectAll')
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-graphic {
  width: 100%;
  height: 30px;
  background-color: #ddd;
}

.loading-bar {
  height: 100%;
  background-color: #0078d4;
  text-align: right;
  transition: width 0.3s;
}

.loading-number {
  display: inline-block;
  padding: 5px;
  font-size: 12px;
  color: #fff;
}
.shadow {
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  padding: 5px;
  box-shadow: 2px 2px 4px #999;
}
.custom-textarea textarea {
  height: 10px; /* Set the desired height */
}
</style>
