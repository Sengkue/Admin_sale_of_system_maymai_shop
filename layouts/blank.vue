<template>
  <v-app :dark="dark">
    <Nuxt/>
  </v-app>
</template>

<script>
export default {
  name: 'EcommerceLandingBlank',
  middleware: 'onLogin',
  created(){
    this.dark = this.$cookies.get('mode')
    this.$vuetify.theme.dark = this.dark
    },
};
</script>