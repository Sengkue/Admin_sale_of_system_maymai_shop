export const state = () => ({
    AllDistrict:'',
    OneDistrict:''
  })
  
  export const mutations={
    setDistrict(state, data){
      state.AllDistrict = data
    },
    setOneDistrict(state, data){
        state.OneDistrict = data
      }
  }
  
  export const actions = {
    selectDistrict({commit}){
        this.$axios.get('/district').then((res)=>{
            commit('setDistrict', res.data.result)
            console.log('show111:',res.data.result)
        })
    },
    selectOneDistrict({commit},id){
        this.$axios.get(`/district/${id}`).then((res)=>{
            commit('setOneDistrict', res.data.result)
            console.log('show111:',res.data.result)
        })
    }
  }
  