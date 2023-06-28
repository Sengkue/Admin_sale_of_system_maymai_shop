export const state = () => ({
  StateSelectAll:[],
  StateSelectOne: "",
  edit: false,
  view: false,
  insert: false,
  image: null,
  uploadProgress: 0, // new state property
});

export const mutations = {
  setImage(state, data) {
    state.image = data;
  },
  setSelectAll(state, data) {
    state.StateSelectAll = data;
  },
  setSelectOne(state, data) {
    state.StateSelectOne = data;
  },
  setView(state, data) {
    state.view = data;
  },
  setEdit(state, data) {
    state.edit = data;
  },
  setInsert(state, data) {
    state.insert = data;
  },
  setUploadProgress(state, progress) {
    state.uploadProgress = progress;
  },
};
export const actions = {
  async selectAll({ commit }) {
    await this.$axios
      .get("/supplier")
      .then((data) => {
        commit("setSelectAll", data.data);
      })
      .catch((error) => {
        this.$toast.error("ການດືງຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
      });
  },
  async selectOne({ commit }, data) {
    const id = data.id;
    await this.$axios
      .get(`/supplier/${id}`)
      .then((data) => {
        commit("setSelectOne", data.data);
      })
      .catch((error) => {
        this.$toast.error("ການດືງຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
      });
  },
  async delete({ commit }, data) {
    const id = data.deleteId;
    await this.$axios
      .delete(`/supplier/${id}`)
      .then((data) => {
      })
      .catch((error) => {
        this.$toast.error("ການລືບຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
      });
  },
  async insert({ commit }, data) {
    await this.$axios
      .post("supplier/", data)
      .then((data) => {
        this.$toast.success("ການເພີ່ມຂໍ້ມູນຂອງທ່ານສຳເລັດ!");
        commit("setUploadProgress", 0);
      })
      .catch((error) => {
        this.$toast.error("ການເພີ່ມຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
      });
  },
  async upload({ commit }, data) {
    const formData = new FormData();
    formData.append("file", data);
    const config = {
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        commit("setUploadProgress", percentCompleted);
      },
    };
    await this.$axios
      .post("upload/single", formData, config)
      .then((data) => {
        commit("setImage", data.data.url);
      })
      .catch((error) => {
        this.$toast.error("ຮູບພາບມີບັນຫາ!", error);
      });
  },

  async update({ commit }, data) {
    const id = data.id;
    const dataItems = data.formData;
    await this.$axios
      .put(`/supplier/${id}`, dataItems)
      .then((data) => {
        this.$toast.success("ການແກ້ໄຂຂໍ້ມູນຂອງທ່ານສຳເລັດ!");
      })
      .catch((error) => {
        this.$toast.error("ຮູການແກ້ໄຂຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
      });
  },
};
