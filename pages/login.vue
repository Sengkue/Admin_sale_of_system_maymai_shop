<template>
  <div>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-10">
            <v-window v-model="step">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4 class="text-center">Loing in to Your Acount</h4>
                        <h6 class="text-center grey--text">
                          Login to your account so you can continue building
                          <br />and editing your onboarding flows
                        </h6>

                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                            <v-text-field
  v-model="phone"
  label="Phone"
  outlined
  dense
  color="blue"
  autocomplete="off" 
  class="mt-16"
  :rules="[
    (v) => !!v || 'Phone is required',
    (v) =>
      (v && v.length <= 25) ||
      'Phone must be less than 10 characters',
  ]"
>
</v-text-field>

                            <v-text-field
                              v-model="password"
                              label="Password"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              type="password"
                              :rules="[
                                (v) => !!v || 'Name is required',
                                (v) =>
                                  (v && v.length <= 25) ||
                                  'Name must be less than 10 characters',
                              ]"
                            >
                            </v-text-field>
                            <v-row>
                              <v-col cols="12" sm="7">
                                <v-checkbox
                                  label="Remember Me"
                                  class="mt-n1"
                                  color="blue"
                                ></v-checkbox>
                              </v-col>
                              <v-col cols="12" sm="5">
                                <span class="caption blue--text"
                                  >Forgot password</span
                                >
                              </v-col>
                            </v-row>
                            <v-btn color="blue" dark block tile @click="login"
                              >Login</v-btn
                            >
                            <h5 class="text-center grey--text mt-4 mb-3">
                              Or Log in using
                            </h5>
                            <div
                              class="d-flex justify-space-between align-center mx-10 mb-16"
                            >
                              <v-btn
                                depressed
                                outlined
                                color="grey"
                                @click="addLog"
                              >
                                <v-icon color="red">mdi-google</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="grey">
                                <v-icon color="blue">mdi-facebook</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="grey">
                                <v-icon color="ligt-blue">mdi-twitter</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6" class="blue rounded-bl-xl">
                      <div style="text-align: center; padding: 180px 0">
                        <v-card-text class="white--text">
                          <h3 class="text-center">
                            Don't Have an Account yet?
                          </h3>
                          <h6>
                            Let's get you all set up so you can start creating
                            your first<br />
                            onboarding experience
                          </h6>
                        </v-card-text>

                        <div class="text-center">
                          <v-btn tile outlined dark @click="step++"
                            >SIGN UP
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row>
                    <v-col cols="12" md="6" class="blue rounded-br-xl">
                      <div style="text-align: center; padding: 180px 0">
                        <v-card-text class="white--text">
                          <h3 class="text-center">Alredy Signed up?</h3>
                          <h6 class="text-center">
                            Log in to your account so you can continue building
                            and<br />
                            editing your onboarding flows
                          </h6>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn tile outlined dark @click="step--"
                            >Log in</v-btn
                          >
                        </div>
                      </div>
                    </v-col>

                    <!--end login --------------------------------------------------------login -->

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h3 class="text-center">Sign Up for an Account</h3>
                        <h5 class="text-center grey--text">
                          Let's get you all set up so you can start creatin your
                          <br />
                          first onboarding experiance
                        </h5>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                            <!---------------------------------- profile image user -->
                            <div class="justify-center text-center mt-5">
                              <div>
                                <v-avatar  size="120">
                                  <v-img v-if="url" :src="url"></v-img>
                                  <v-img v-else src="image/profile.gif" ></v-img>
                                </v-avatar>
                              </div>
                              <v-file-input
                                id="file"
                                v-model="file"
                                label="Image"
                                filled
                                class="d-none"
                                prepend-icon="mdi-camera"
                                @change="onFileChange"
                                @click="upload"
                              ></v-file-input>
                              <!--------------------------- buttom profile -->
                              <v-btn class="mt-2" color="primary" small @click="upload" > <v-icon>mdi-tray-arrow-up</v-icon>
                                Profile
                              </v-btn>
                            </div>

                            <v-text-field
                              v-model="R_name"
                              label="Name"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              class="mt-4"
                              :rules="[
                                (v) => !!v || 'Name is required',
                                (v) =>
                                  (v && v.length <= 25) ||
                                  'Name must be less than 10 characters',
                              ]"
                            />

                            <v-text-field
                              v-model="R_phone"
                              label="phone"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              :rules="[
                                (v) => !!v || 'Name is required',
                                (v) =>
                                  (v && v.length <= 25) ||
                                  'Name must be less than 10 characters',
                              ]"
                            />
                            <v-text-field
                              v-model="R_password"
                              label="Password"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              type="password"
                              :rules="[
                                (v) => !!v || 'Name is required',
                                (v) =>
                                  (v && v.length <= 25) ||
                                  'Name must be less than 10 characters',
                              ]"
                            />
                            <v-row>
                              <v-col cols="12" sm="7">
                                <v-checkbox
                                  label="I Accept AAE"
                                  class="mt-n1"
                                  color="blue"
                                  :rules="[(v) => !!v || 'Name is required']"
                                >
                                </v-checkbox>
                              </v-col>
                              <v-col cols="12" sm="5">
                                <span class="caption blue--text ml-n4"
                                  >Terms &Conditions</span
                                >
                              </v-col>
                            </v-row>
                            <v-btn color="blue" dark block tile @click="signup"
                              >Sign up</v-btn
                            >

                            <h5 class="text-center grey--text mt-4 mb-3">
                              Or Sign up using
                            </h5>
                            <div
                              class="d-flex justify-space-between align-center mx-10 mb-11"
                            >
                              <v-btn depressed outlined color="grey">
                                <v-icon color="red">mdi-google</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="grey">
                                <v-icon color="blue">mdi-facebook</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="grey">
                                <v-icon color="light-blue lighten-3"
                                  >mdi-twitter</v-icon
                                >
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-form>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: 'EcommerceLandingLogin',
  layout: 'blank',
  data() {
    return {
      file: null,
      url: null,
      step: 1,
      phone: '',
      password: '',
      valid: true,
      R_name: '',
      R_phone: '',
      R_password: '',
    }
  },
  propos: {
    source: String,
  },

  mounted() {
    // this.$store.dispatch('user/realLogin')
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/login', {
          phone: this.phone,
          password: this.password,
        })
      }
    },
    addLog() {
      this.phone = 'eve.holt@reqres.in'
      this.password = 'cityslicka'
    },
    signup() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/register', {
          name: this.R_name,
          phone: this.R_phone,
          password: this.R_password,
          profile: this.file,
        })
      }
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },
    upload() {
      document.getElementById('file').click()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
</style>
