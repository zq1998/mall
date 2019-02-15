import Vuex from 'vuex';
import Vue from 'vue';
import num from './num.js'

Vue.use(Vuex);
let store=new Vuex.Store({
  modules:{
    num:num
  }
  }
);
export default store;
