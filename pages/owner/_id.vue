<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <div><v-img src="/images/logo.png" width="150px"></v-img></div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="firstName"
            label="firstname"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="lastName"
            label="LastName"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="shopName"
            label="ShopeName"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="phone"
            label="Phone Number"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="gender"
            label="Gender"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="address"
            label="Address"
            outlined
            dense
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            label="Description"
            outlined
            dense
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" style="border: 1px solide black"> banner </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopIndex',

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
