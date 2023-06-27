export const state = () => ({
    AllDistrict:'',
    OneDistrict:'',
    byProvinceId: '',
  })
  
  export const mutations={
    setDistrict(state, data){
      state.AllDistrict = data
    },
    setOneDistrict(state, data){
        state.OneDistrict = data
      },
      setByProvinceId(state, data){
        state.byProvinceId = data
      }
  }
  
  export const actions = {
    selectDistrict({commit}){
        this.$axios.get('/district').then((res)=>{
            commit('setDistrict', res.data.result)
        })
    },
    getByProvinceId({commit},id){
        this.$axios.get(`district/province/${id}`).then((res)=>{
            commit('setByProvinceId', res.data.result)
        })
    }
  }
  