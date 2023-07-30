<template>
  <div>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" md="4">
        <v-card>
          <v-img :src="product.profile" alt="Product Image" height="200"></v-img>
          <v-card-text>
            <h2>{{ product.name }}</h2>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Size ID:</strong> {{ product.size_id }}</p>
            <p><strong>Color:</strong> {{ product.color }}</p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>Quantity:</strong> {{ product.quantity }}</p>
            <p><strong>Sale Price:</strong> {{ product.sale_price }}</p>
            <p><strong>Cost Price:</strong> {{ product.cost_price }}</p>
            <p><strong>Barcode:</strong> {{ product.Barcode }}</p>
            <p><strong>Created At:</strong> {{ formatDate(product.createdAt) }}</p>
            <p><strong>Updated At:</strong> {{ formatDate(product.updatedAt) }}</p>
            <p><strong>Supplier Name:</strong> {{ product.supplier_name }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn  v-if="showSeeMoreButton" @click="loadMore">See More</v-btn>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminSaleOfSystemMaymaiShopTest',

  data() {
    return {
      products: [],
      limit: 4, // Initial limit is set to 4
    };
  },

  computed: {
    showSeeMoreButton() {
      return this.products.length % this.limit === 0;
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    formatDate(dateString) {
      // Implement a function to format date strings as per your requirement
      // For example: return new Date(dateString).toLocaleDateString();
      return dateString;
    },

    loadData() {
      // Fetch data from the API using Axios with the current limit
      axios.get(`http://localhost:8080/product/limit?limit=${this.limit}`)
        .then(response => {
          this.products = response.data.result;
        })
        .catch(error => {
          console.error(error);
        });
    },

    loadMore() {
      this.limit += 4; // Increment the limit by 4
      this.loadData(); // Fetch data with the updated limit
    },
  },
};
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
</style>
