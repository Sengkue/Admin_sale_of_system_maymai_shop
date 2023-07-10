export const state = () => ({
    AllOwner:[],
    Banner:{},
    ownerId:{}
  })
  
  export const mutations={
    setOwner(state, data){
      state.AllOwner = data
    },
        setOwnerOne(state, data){
      state.ownerId = data
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
    selectBanner({commit}){
      this.$axios.get(`/banner`).then((res)=>{
          commit('setBanner', res.data.result)
      })
  },
      selectOwnerId({commit},id){
        this.$axios.get(`/owner/${id}`).then((res)=>{
            commit('setOwnerOne', res.data.result)
        })
    },

  }
  