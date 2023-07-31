<template>
  <v-row justify="center">
    <v-card>
      <v-form ref="form">
        <v-card class="teal white--text text-center py-5 mb-n8">
          <h2>ແກ້ໄຂສິນຄ້າ</h2>
        </v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Profile Image -->
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
                      <v-img v-else src="/images/logo.png"></v-img>
                    </v-avatar>
                  </div>
                  <v-file-input
                    id="file"
                    v-model="file"
                    :rules="imageRules"
                    label="ຮູບສິນຄ້າ"
                    class="d-none"
                    prepend-icon="mdi-camera"
                    @change="onFileChange"
                    @click="upload"
                  ></v-file-input>
                  <!-- Profile Button -->
                  <v-btn class="mt-2" color="primary" small @click="upload">
                    <v-icon>mdi-tray-arrow-up</v-icon>
                    ແກ້ໄຂຮູບສິນຄ້າ
                  </v-btn>
                </div>
              </v-col>

              <!-- Banners -->
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
                  <v-col
                    v-if="selectedFiles !== null && selectedFiles !== ''"
                    cols="12"
                    class="mt-n5 d-flex flex-wrap"
                  >
                    <div
                      v-for="(item, index) in selectedFiles"
                      :key="index"
                      class="pa-0 ma-0"
                    >
                      <v-img
                        :src="getFileUrl(item)"
                        width="60"
                        height="70"
                        contain
                      ></v-img>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    style="border: 1px solid black"
                    class="d-flex flex-wrap mb-1 pa-0"
                  >
                    <template v-for="(item, i) in getProductBanner">
                      <v-col :key="i" cols="3" md="2">
                        <v-hover v-slot="{ hover }">
                          <div
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                          >
                            <v-img
                              :src="item.url"
                              width="70"
                              height="80"
                              contain
                            >
                              <v-card-title class="text-h6 white--text">
                                <v-row
                                  class="fill-height flex-column"
                                  justify="space-between"
                                >
                                  <div class="align-self-center mt-5">
                                    <v-btn
                                      :class="{ 'show-btns': hover }"
                                      :color="transparent"
                                      icon
                                      :style="
                                        hover
                                          ? 'border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px black;'
                                          : ''
                                      "
                                      @click="deleteBanner(item.id)"
                                    >
                                      <v-icon
                                        :class="{ 'show-btns': hover }"
                                        :color="transparent"
                                        large
                                      >
                                        mdi-delete-forever
                                      </v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                              </v-card-title>
                            </v-img>
                          </div>
                        </v-hover>
                      </v-col>
                    </template>
                  </v-col>
                </v-row>
              </v-col>

              <!-- Input Fields -->
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
                  label="ລະຫັດສິນຄ້າ*"
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
          <v-btn color="blue darken-1" text @click="back()">ປິດ</v-btn>
          <v-btn
            color="blue darken-1"
            :loading="loading"
            text
            @click="update()"
          >
            ບັນທືກ
          </v-btn>
          <!-- :disabled="!valid" -->
        </v-card-actions>
      </v-form>
    </v-card>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    uploadImage: false,
    transparent: 'rgba(255, 255, 255, 0)',
    file: null,
    file1: null,
    url: null,
    url1: null,
    imageRules: [(v) => !!v || 'Image is required'],
    loading: false,
    modal: null,
    name: null,
    category: null,
    description: null,
    quantity: null,
    sale_price: null,
    cost_price: null,
    Barcode: null,
    supplier_id: null,
    urlImage: null,
    selectedFiles: null,
    productId: null,
    getPercentage: 0,
  }),
  computed: {
    getProductBanner() {
      return this.$store.state.banner.banner || [];
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
    this.$store.dispatch('banner/selectById', this.$route.params.id)
  },
  created() {
    this.productId = this.$route.params.id
    this.$axios
      .get(`/product/${this.productId}`)
      .then((res) => {
        this.name = res.data.result.name
        this.category = res.data.result.category_id
        this.description = res.data.result.description
        this.quantity = res.data.result.quantity
        this.sale_price = res.data.result.sale_price
        this.cost_price = res.data.result.cost_price
        this.Barcode = res.data.result.Barcode
        this.supplier_id = res.data.result.supplier_id
        this.urlImage = res.data.result.profile
        this.url = res.data.result.profile
      })
      .catch((err) => {
        this.$toast.error(err)
      })
  },
  methods: {
    async deleteBanner(id) {
      await this.$axios.delete(`/image/${id}`)
      await this.$store.dispatch('banner/selectById', this.$route.params.id)
    },
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
    async update() {
    this.uploadImage = true;
    const file = this.file;
    const formData = new FormData();
    formData.append('file', file);
    this.$refs.form.validate();
    this.loading = true;
    if (this.file !== null) {
      this.urlImage = await this.$axios
        .post('upload/single', formData)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.success('File upload failed', error);
        });
    }
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
    };
    await this.$axios.put(`product/${this.$route.params.id}`, data);

    if (this.selectedFiles !== null && this.selectedFiles.length > 0) {
      const formDatas = new FormData();
      for (const file of this.selectedFiles) {
        formDatas.append('files', file);
      }
      const config = {
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          this.getPercentage = percentCompleted;
        }.bind(this),
      };

      const res = await this.$axios.post('/upload/multiple', formDatas, config);
      await Promise.all(
        res.data.files.map(async (image) => {
          const imageUrl = image.url;
          // const name = '555';
          const name = image.originalName
          return await this.$axios.post(`/image`, {
            productId: this.productId,
            url: imageUrl,
            altText: name,
          });
        })
      );
    }

    await this.$store.dispatch('product/selectAll');
    this.$toast.success('Updated successfully');
    this.loading = false;
    this.uploadImage = false;
    this.reset();
    this.$router.push('/product');
  },
    reset() {
      this.name = null
      this.category = null
      this.description = null
      this.quantity = null
      this.sale_price = null
      this.cost_price = null
      this.Barcode = null
      this.supplier_id = null
      this.urlImage = null
      this.url = null
      this.selectedFiles = null
      this.file = null
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
