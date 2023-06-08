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
      this.$axios.post('localhost:8080/user/login', form).then((data) => {
        this.$cookies.set('token', data.data.token)
        this.$cookies.set('user', data.data)
        this.$router.push('/')
      })
    },
  }
  