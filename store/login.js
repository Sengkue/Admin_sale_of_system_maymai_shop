export const state = () => ({
    profile:{},
  })
  
  export const mutations={
    setProfile(state, data){
      state.profile = data
    }
  }
  
  export const actions = {
    realLogin({ commit }, form) {
      this.$axios.post('/user/login', form).then((data) => {
        // this.$cookies.set('token', data.data.token)
        this.$cookies.set('user', data.data)
        console.log('return:',data.data)
        // this.$router.push('/')
      })
    },
  }
  