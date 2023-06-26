export const state = () => ({
    AllOwner:'',
  })
  
  export const mutations={
    setOwner(state, data){
      state.AllOwner = data
    }
  }
  
  export const actions = {
    selectOwner({commit}){
        this.$axios.get('/owner').then((res)=>{
            commit('setOwner', res.data.result)
            console.log('show:',res.data.result)
        })
    }
  }
  