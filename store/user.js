// import jwt from 'jsonwebtoken';
export const state = () => ({
  profile:{},
  AllUser:{},
  edit: false,
  view: false,
  insert: false,
  findOne:''
})

export const mutations={
  setProfile(state, data){
    state.profile = data
  },
  setAllUser(state, data){
    state.AllUser = data
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
  setFindOne(state, data) {
    state.findOne = data;
  },
}

export const actions = {
  async update({ commit }, data) {
    const id = data.updateId;
    const items = data.data;
    await this.$axios.put(`/user/${id}`, items);
  },
  async selectOne({ commit }, id) {
    const response = await this.$axios.get(`/user/${id}`);
    commit('setFindOne', response.data.result);
  },
  async insert({ commit }, data) {
    await this.$axios.post('/user', data);
  },
  async selectUser({ commit }) {
    const response = await this.$axios.get('/user');
    commit('setAllUser', response.data);
  },

  async login({ commit }, form) {
    try {
      const res = await this.$axios.post('/user/login', form);
  
      // Set the token cookie
      this.$cookies.set('token', res.data.token);
  
      // Decode the token to get the ID
      // const decodedToken = jwt.decode(res.data.token);

      if(res.data.employee_id !== null){
        // Set the ID cookie
        this.$cookies.set('id', res.data.employee_id);
      }else{
         // Set the ID cookie
         this.$cookies.set('id', res.data.owner_id);
      }
  
      // Set other cookies
      this.$cookies.set('status', res.data.status);
      this.$cookies.set('name', res.data.employeeFirstName ? res.data.employeeFirstName : res.data.ownerFirstName);
  
      this.$router.push('/');
      this.$toast.success('Welcome to Maymai Shop POS');
    } catch (error) {
      // Handle the error here
      this.$toast.error('Login failed, please check your number and password!', error);
      // You can perform additional actions like displaying an error toast or updating the state
    }
  }
  
  
};
