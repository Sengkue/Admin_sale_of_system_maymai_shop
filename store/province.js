export const state = () => ({
    AllProvince:'',
  })
  
  export const mutations={
    setProvince(state, data){
      state.AllProvince = data
    }
  }
  
  export const actions = {
    selectProvince({commit}){
        this.$axios.get('/province').then((res)=>{
            commit('setProvince', res.data.result)
        })
    }
  }
  