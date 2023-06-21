<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card class="pa-3 mb-10 teal white--text rounded-0">
          <div class="d-flex justify-center">
            <div class="text-h5">Create Users</div>
          </div>
        </v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6" class="my-0 py-0">
      <v-select
        v-model="owner_id"
        :items="ownerOptions"
        filled
        dense
        label="Owner*"
        prepend-inner-icon="mdi-account-heart"
        required
        v-slot="{ attrs }"
      >
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-bind="attrs"
              v-model="searchText"
              clearable
              solo-inverted
              hide-details
              placeholder="Search"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-select>
    </v-col>
              <v-col cols="6" class="my-0 py-0">                <v-text-field
                filled
                  dense
                  v-model="phone"
                  label="User Number*"
                  prepend-inner-icon="mdi-account-group"
                  required
                ></v-text-field></v-col>
              <v-col cols="6" class="my-0 py-0">                <v-text-field
                filled
                  dense
                  v-model="phone"
                  label="User Number*"
                  prepend-inner-icon="mdi-cellphone"
                  required
                ></v-text-field></v-col>
              <v-col cols="6" class="my-0 py-0">
                <v-text-field
                filled
                  dense
                  v-model="phone"
                  label="User Number*"
                  prepend-inner-icon="mdi-key"
                  required
                ></v-text-field></v-col>
                <v-col cols="12" class="my-0 py-0">
      <v-select
        filled
        dense
        v-model="status"
        :items="['admin', 'user']"
        label="User Status*"
        prepend-inner-icon="mdi-family-tree"
        required
      ></v-select>
    </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="back()"> Close </v-btn>
          <v-btn color="blue darken-1" class="mr-2" text @click="insert()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog:'',
    employee_id: "",
    owner_id: "",
    password: "",
    status: "",
    phone: "",
    ownerOptions: [
        'John Doe',
        'Jane Smith',
        'Michael Johnson',
        // Add more owner options as needed
      ],
      searchText: ''
  }),
  mounted() {
    this.dialog = this.$store.state.user.insert;
  },
  methods: {
    back() {
      this.$store.commit("user/setInsert", false);
    },
    insert() {
      const data = {
        employee_id: this.employee_id,
        owner_id: this.owner_id,
        phone: this.phone,
        password: this.password,
        status: this.status,
        // Name: this.userNmame,
      };
      this.$store.dispatch("user/insert", data);
      this.$store.commit("user/setInsert", false);
      this.$store.dispatch("user/selectAll");
    },
  },
};
</script>
