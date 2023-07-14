<template>
  <div>
    <v-form @submit.prevent="createDistrict">
      <v-select
        v-model="selectedProvince"
        :items="provinces"
        item-text="provinceName"
        item-value="id"
        label="Select Province"
        outlined
      ></v-select>
      <v-text-field v-model="districtName" label="District Name"></v-text-field>
      <v-btn color="primary" type="submit">Create District</v-btn>
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
            <v-btn @click="showDistricts(item.id)" color="primary"
              >Show Districts</v-btn
            >
            <v-data-table
              v-if="selectedProvince === item.id && item.districts.length > 0"
              :headers="districtTableHeaders"
              :items="item.districts"
              :items-per-page="5"
              class="elevation-0"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.districtName }}</td>
                  <td>
                    <v-btn @click="deleteDistrict(item.id)" color="error"
                      >Delete</v-btn
                    >
                    <v-btn @click="editDistrict(item)" color="primary"
                      >Edit</v-btn
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
            <div v-else>No districts available</div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogVisible" max-width="500px">
      <v-card>
        <v-card-title>Edit District</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editingDistrictName"
            label="District Name"
          ></v-text-field>
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
import axios from 'axios'

export default {
  data() {
    return {
      selectedProvince: null,
      districtName: '',
      provinces: [],
      tableHeaders: [
        { text: 'Province Name', value: 'provinceName' },
        { text: 'Actions', value: 'actions' },
      ],
//       tableHeaders: [
//   { text: "Province Name", value: "provinceName", align: "start" },
//   { text: "Actions", value: "actions", align: "end" }
// ],
      districtTableHeaders: [
        { text: 'District Name', value: 'districtName' },
        { text: 'Actions', value: 'actions' },
      ],
      editingDistrict: null,
      editingDistrictName: '',
      dialogVisible: false,
    }
  },
  mounted() {
    this.fetchProvinces()
  },
  methods: {
    fetchProvinces() {
      axios
        .get('http://localhost:8080/province')
        .then((response) => {
          this.provinces = response.data.result.map((province) => ({
            ...province,
            districts: [],
          }))
        })
        .catch((error) => {
          console.error('Error fetching provinces:', error)
        })
    },
    fetchDistricts(provinceId) {
      axios
        .get(`http://localhost:8080/district/province/${provinceId}`)
        .then((response) => {
          const provinceIndex = this.provinces.findIndex(
            (province) => province.id === provinceId
          )
          if (provinceIndex > -1) {
            this.provinces[provinceIndex].districts = response.data.result
          }
        })
        .catch((error) => {
          console.error('Error fetching districts:', error)
        })
    },
    createDistrict() {
      axios
        .post('http://localhost:8080/district', {
          provinceId: this.selectedProvince,
          districtName: this.districtName,
        })
        .then((response) => {
          this.fetchDistricts(this.selectedProvince)
          this.districtName = ''
        })
        .catch((error) => {
          console.error('Error creating district:', error)
        })
    },
    deleteDistrict(districtId) {
      axios
        .delete(`http://localhost:8080/district/${districtId}`)
        .then(() => {
          const province = this.provinces.find(
            (province) => province.id === this.selectedProvince
          )
          if (province) {
            province.districts = province.districts.filter(
              (district) => district.id !== districtId
            )
          }
        })
        .catch((error) => {
          console.error('Error deleting district:', error)
        })
    },
    editDistrict(district) {
      this.editingDistrict = district.id
      this.editingDistrictName = district.districtName
      this.dialogVisible = true
    },
    cancelEdit() {
      this.editingDistrict = null
      this.editingDistrictName = ''
      this.dialogVisible = false
    },
    saveEdit() {
      axios
        .put(`http://localhost:8080/district/${this.editingDistrict}`, {
          districtName: this.editingDistrictName,
        })
        .then(() => {
          const province = this.provinces.find(
            (province) => province.id === this.selectedProvince
          )
          if (province) {
            const editedDistrict = province.districts.find(
              (district) => district.id === this.editingDistrict
            )
            if (editedDistrict) {
              editedDistrict.districtName = this.editingDistrictName
            }
          }
          this.cancelEdit()
        })
        .catch((error) => {
          console.error('Error updating district:', error)
        })
    },
    showDistricts(provinceId) {
      if (this.selectedProvince === provinceId) {
        this.selectedProvince = null
      } else {
        this.selectedProvince = provinceId
        this.fetchDistricts(provinceId)
      }
    },
  },
}
</script>
