<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card class="pa-3 mb-10 teal white--text rounded-0">
          <div class="d-flex justify-center">
            <div class="text-h5">Create promotions</div>
          </div>
        </v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="my-0 py-0">
                <v-text-field
                  v-model="name"
                  filled
                  dense
                  label="name"
                  prepend-inner-icon="mdi-cog-counterclockwise"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                  :rules="nameRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="my-0 py-0">
                <v-text-field
                  v-model="condition"
                  filled
                  dense
                  label="condition"
                  prepend-inner-icon="mdi-sign-yield"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                  :rules="conditionRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="my-0 py-0">
                <v-text-field
                  v-model="discount"
                  filled
                  dense
                  label="discount"
                  prepend-inner-icon="mdi-brightness-percent"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                  :rules="discountRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="back()"> Close </v-btn>
          <v-btn
            :loading="loading"
            color="blue darken-1"
            class="mr-2"
            text
            @click="insert()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    dialog: '',
    name: '',
    condition: '',
    discount: '',
    searchText: '',
    nameRules: [v => !!v || 'Name is required'],
    conditionRules: [v => !!v || 'Condition is required'],
    discountRules: [
      v => !!v || 'Discount is required',
      v => !isNaN(parseFloat(v)) && isFinite(v) || 'Discount must be a number',
    ],
  }),
  mounted() {
    this.dialog = this.$store.state.promotion.insert
  },
  methods: {
    back() {
      this.$store.commit('promotion/setInsert', false)
    },
    async insert() {
      this.loading = true
      const data = {
        name: this.name,
        condition: this.condition,
        discount: this.discount,
      }
      await this.$store.dispatch('promotion/insert', data)
      setTimeout(() => {
        this.loading = false
        this.$store.dispatch('promotion/selectAll')
        this.$store.commit('promotion/setInsert', false)
        this.name = ''
        this.condition = ''
        this.discount = ''
      }, 1000)
    },
  },
}
</script>
