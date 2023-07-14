<template>
    <div>
      <v-form @submit.prevent="createProvince">
        <v-text-field v-model="provinceName" label="Province Name"></v-text-field>
        <v-btn color="primary" type="submit">Create Province</v-btn>
      </v-form>
  
      <v-data-table
        :headers="tableHeaders"
        :items="provinces"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.provinceName }}</td>
            <td>
              <v-btn @click="deleteProvince(item.id)" color="error">Delete</v-btn>
              <v-btn @click="editProvince(item)" color="primary">Edit</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialogVisible" max-width="500px">
        <v-card>
          <v-card-title>Edit Province</v-card-title>
          <v-card-text>
            <v-text-field v-model="editingProvinceName" label="Province Name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="cancelEdit">Cancel</v-btn>
            <v-btn @click="saveEdit" color="primary">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        provinceName: "",
        provinces: [],
        tableHeaders: [
          { text: "Province Name", value: "provinceName" },
          { text: "Actions", value: "actions" }
        ],
        editingProvince: null,
        editingProvinceName: "",
        dialogVisible: false
      };
    },
    mounted() {
      this.fetchProvinces();
    },
    methods: {
      fetchProvinces() {
        axios
          .get("http://localhost:8080/province")
          .then(response => {
            this.provinces = response.data.result; // Use response.data.result as the array of provinces
          })
          .catch(error => {
            console.error("Error fetching provinces:", error);
          });
      },
      createProvince() {
        axios
          .post("http://localhost:8080/province", {
            provinceName: this.provinceName
          })
          .then(response => {
            this.provinces.push(response.data);
            this.provinceName = "";
          })
          .catch(error => {
            console.error("Error creating province:", error);
          });
      },
      deleteProvince(provinceId) {
        axios
          .delete(`http://localhost:8080/province/${provinceId}`)
          .then(() => {
            this.provinces = this.provinces.filter(
              province => province.id !== provinceId
            );
          })
          .catch(error => {
            console.error("Error deleting province:", error);
          });
      },
      editProvince(province) {
        this.editingProvince = province.id;
        this.editingProvinceName = province.provinceName;
        this.dialogVisible = true;
      },
      cancelEdit() {
        this.editingProvince = null;
        this.editingProvinceName = "";
        this.dialogVisible = false;
      },
      saveEdit() {
        axios
          .put(`http://localhost:8080/province/${this.editingProvince}`, {
            provinceName: this.editingProvinceName
          })
          .then(() => {
            const editedProvince = this.provinces.find(
              province => province.id === this.editingProvince
            );
            if (editedProvince) {
              editedProvince.provinceName = this.editingProvinceName;
            }
            this.cancelEdit();
          })
          .catch(error => {
            console.error("Error updating province:", error);
          });
      }
    }
  };
  </script>
  