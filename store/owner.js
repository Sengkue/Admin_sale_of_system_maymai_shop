export const state = () => ({
    AllOwner:[],
    Banner:{},
  })
  
  export const mutations={
    setOwner(state, data){
      state.AllOwner = data
    },
    setBanner(state, data){
      state.Banner = data
    }
  }
  
  export const actions = {
    selectOwner({commit}){
        this.$axios.get('/owner').then((res)=>{
            commit('setOwner', res.data.result)
        })
    },
    selectBanner({commit}, id){
      this.$axios.get(`/banner/${id}`).then((res)=>{
          commit('setBanner', res.data.result)
         console.log('kkkkkkkkkk', res.data)
      })
  }
  }
  