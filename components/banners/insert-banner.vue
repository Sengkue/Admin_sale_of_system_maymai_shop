<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px" max-height="100%">
      <v-card>
        <v-form ref="form" v-model="valid">
          <v-card class="red white--text text-center py-2 mb-n10">
            <span class="text-h5">Create image slide</span>
          </v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <!--------------------------- input images banner profile -->
                <v-col cols="12" class="mt-4">
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
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
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
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    selectedFiles: null,
    dialog: true,
    loading: false,
  }),
  mounted() {
    this.dialog = this.$store.state.owner.insert
  },
  methods: {
    getFileUrl(file) {
      return URL.createObjectURL(file)
    },
    back() {
      this.$store.commit('owner/setInsert', false)
    },
    async insert() {
      this.loading = true
      const formDatas = new FormData()
      for (const file of this.selectedFiles) {
        formDatas.append('files', file)
      }
      await this.$axios.post('/upload/multiple', formDatas).then((res) => {
        res.data.files.map((image) => {
          const imageUrl = image.url
          return this.$axios.post('/banner', {
            ownerId: null,
            url: imageUrl,
          })
        })
      })
      await this.$store.dispatch('owner/selectBanner')
      this.$store.commit('owner/setInsert', false)
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
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
