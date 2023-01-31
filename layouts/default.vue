<template>
  <div>
    <!-- mobile -->
    <div v-if="$vuetify.breakpoint.mobile">
      <v-app>
        <Nuxt />
      </v-app>
    </div>
    <!-- web  -->
    <v-app v-else class="font grey lighten-5">
      <MainDesktop />
      <v-main>
      </v-main>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>