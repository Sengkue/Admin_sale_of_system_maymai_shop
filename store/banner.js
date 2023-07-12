export const state = () => ({
    banner:[]
  });
  
  export const mutations = {
    setSelectBanner(state,data){
     state.banner = data;
    },
  };
  export const actions = {
    async selectById({ commit }, id) {
      await this.$axios
        .get(`/image/product/${id}`)
        .then((data) => {
          commit("setSelectBanner", data.data.data);
        })
        .catch((error) => {
          this.$toast.error("ການດືງຂໍ້ມູນຂອງທ່ານມີບັນຫາ!", error);
        });
    },
  };
  