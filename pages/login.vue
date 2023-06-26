<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center mt-2 bg1">
        <h1 class="ml-5 pl-5">Welcome to Maymai shop</h1>
      </v-col>
      <v-col cols="12" md="8" sm="8">
        <v-card class="bg">
          <v-container>
            <v-img src="/icon.png" contain></v-img>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-card width="100%" height="100%" class="bg_spider bg">
          <v-row class="ma-0 pa-0">
            <v-col cols="12">
              <v-card-text class="text-center">
                <h2>ລອກອິນເຂົ້າສູ່ລະບົບ</h2>
              </v-card-text>
            </v-col>
            <v-col cols="12">
              <v-container>
                <v-form ref="form" @submit.prevent="submitHandler">
                  <v-card>
                    <v-card-text>
                      <v-text-field
                        v-model="telephone"
                        :rules="numberRules"
                        type="Number"
                        label="Phone Number"
                        placeholder="XXXXXXXX"
                        prepend-inner-icon="mdi-cellphone"
                        outlined
                        dense
                        required
                      />
                      <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        :type="passwordShow ? 'text' : 'password'"
                        label="Password"
                        placeholder="Password"
                        prepend-inner-icon="mdi-key"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        outlined
                        dense
                        required
                        @click:append="passwordShow = !passwordShow"
                      />
                    </v-card-text>
                    <v-card-actions class="justify-center">
                      <v-btn
                        type="submit"
                        class="mx-5 teal"
                        width="100%"
                        :style="{
                          background:
                            'linear-gradient(to right, #5e1b1b, #e60000)',
                          color: 'white',
                        }"
                      >
                        <span rounded class="px-5">Login</span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'UpayDomainLogin',
  layout: 'blank',
  data() {
    return {
      loading: false,
      passwordShow: false,
      telephone: '',
      numberRules: [
        (v) => !!v || 'Number is required',
        (v) =>
          (v && v.length >= 8) || 'Phone number must be 8 character or more!',
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 3) || 'Password must be 6  characters or more!',
      ],
    }
  },

  mounted() {},

  methods: {
    async submitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$store.dispatch('user/login', {
          phone: this.telephone,
          password: this.password,
        })
        setTimeout(() => {
          this.loading = false
        }, 800)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
