export const state = () => ({
  profile:{},
  Allcategory:[],
  edit: false,
  view: false,
  insert: false,
  findOne:''
})

export const mutations={
  setProfile(state, data){
    state.profile = data
  },
  setAllcategory(state, data){
    state.Allcategory = data
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
    try {
      const id = data.updateId;
      const items = data.data;
      await this.$axios.put(`/category/${id}`, items);
      this.$toast.success('Category updated successfully');
    } catch (error) {
      this.$toast.error('update Category fail!!! ', error)
      
    }
  },
  
  async selectOne({ commit }, id) {
    try {
      const response = await this.$axios.get(`/category/${id}`);
      commit('setFindOne', response.data.result);
    } catch (error) {
      // Handle the error here
      this.$toast.error('Select Category fail!!! ', error)
      // You can perform additional actions like displaying an error toast or updating the state
    }
  },
  
 async insert({ commit }, category) {

   await this.$axios.post('category', category)
      .then((res) => {
       this.$toast.success('Insert Category success.')
      })
      .catch((error) => {
       this.$toast.error('Insert Category fail!!! ', error)
         });
  },
  
  async selectCategory({ commit }) {
    try { 
      await this.$axios.get('/category').then((res)=>{
        commit('setAllcategory', res.data.result);
      });
    } catch (error) {
      this.$toast.error('An error occurred while fetching categories'); }
  },
  
  

  async login({ commit }, form) {
    try {
      const res = await this.$axios.post('/category/login', form);
      this.$cookies.set('token', res.data.token);
      this.$cookies.set('status', res.data.status);
      this.$cookies.set('name', res.data.employeeFirstName ? res.data.employeeFirstName : res.data.ownerFirstName);
      this.$router.push('/');
      this.$toast.success('welcome to maymai shop pos')
    } catch (error) {
      // Handle the error here
      this.$toast.error('Login fail, please check your number and password! ',error);
      // You can perform additional actions like displaying an error toast or updating the state
    }
  },
  
};
