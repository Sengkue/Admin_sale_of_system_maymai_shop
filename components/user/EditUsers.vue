<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card class="pa-3 mb-10 teal white--text rounded-0">
          <div class="d-flex justify-center">
            <div class="text-h5">Update Users</div>
          </div>
        </v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" class="my-0 py-0">
                <v-select
                  v-model="owner_id"
                  :items="getOwner"
                  item-value="id"
                  item-text="firstName"
                  label="Owner"
                  filled
                  dense
                  prepend-inner-icon="mdi-account-heart"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  :disabled="employee_id !== ''"
                  required
                ></v-select>
              </v-col>
              <v-col cols="6" class="my-0 py-0">
                <v-select
                  v-model="employee_id"
                  :items="getEmployee"
                  item-value="id"
                  item-text="firstName"
                  label="Employee"
                  filled
                  dense
                  prepend-inner-icon="mdi-account-group"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  :disabled="owner_id !== ''"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6" class="my-0 py-0">
                <v-text-field
                v-model="phone"
                  filled
                  dense
                  label="User Number*"
                  prepend-inner-icon="mdi-cellphone"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="my-0 py-0">
                <v-text-field
                v-model="password"
                  filled
                  dense
                  label="Password"
                  prepend-inner-icon="mdi-key"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="my-0 py-0">
                  <v-select
                  v-model="status"
                  filled
                  dense
                  :items="['admin', 'user']"
                  label="User Status*"
                  prepend-inner-icon="mdi-family-tree"
                  clearable
                  clear-icon="mdi-close-circle-outline"
                  required
                ></v-select>
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
            @click="update()"
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
    showPassword: false,
    dialog: true,
    id: '',
    employee_id: '',
    owner_id: '',
    password: '',
    status: '',
    phone: '',
    searchText: '',
  }),
  computed: {
    getUser() {
      return this.$store.state.user.findOne
    },
    getEmployee() {
      return this.$store.state.employee.AllEmployee
    },
    getOwner() {
      return this.$store.state.owner.AllOwner
    },
  },
  watch: {
    getUser: {
      immediate: true,
      handler(value) {
        this.id = value.id || ''
        this.employee_id = value.employee_id || ''
        this.owner_id = value.owner_id || ''
        this.phone = value.phone || ''
        // this.password = value.password || '';
        this.status = value.status || ''
      },
    },
  },
  methods: {
    back() {
      this.$store.commit('user/setEdit', false)
    },
    async update() {
      this.loading = true
      const updateId = this.id
      const data = {
        employee_id: this.employee_id,
        owner_id: this.owner_id,
        phone: this.phone,
        password: this.password,
        status: this.status,
      }
      await this.$store.dispatch('user/update', {
        updateId,
        data,
      })
      setTimeout(() => {
        this.loading = false
        this.$store.dispatch('user/selectUser')
        this.$store.commit('user/setEdit', false)
      }, 1000)
    },
  },
}
</script>
