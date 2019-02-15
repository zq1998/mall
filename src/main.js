// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false;

import "../static/css/global.css"

// import MintUI from 'mint-ui'
// Vue.use(MintUI);//注册全局组件给Vue.prototype挂载对象 this.xx访问
// import  'mint-ui/lib/style.css'
import MyMintUIPlugin from './MyMintUIPlugin';
Vue.use(MyMintUIPlugin);

/* eslint-disable no-new */
import Axios from 'axios'
import Installer from "@/plugin/installer"
Vue.use(Installer);
Vue.prototype.$axios=Axios;
Axios.defaults.baseURL="";
// 定义拦截器
Axios.interceptors.request.use(function (config) {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // });
  //不变配置 公众请求头
  return config;//config{header}
});
Axios.interceptors.response.use(function (response) {
  //response {config:{},data:{} ,headers:{}}
  Indicator.close();
  return response;
});

import VuePreview from 'vue-preview'
Vue.use(VuePreview);

// 注册全局组件
import MyUI from "@/components/common/MyUI";
import MyLi from "@/components/common/MyLi";
import NavBar from "@/components/common/NavBar";
import Comment from "@/components/common/Comment";
import Swipe from "@/components/common/Swipe";
Vue.component(MyUI.name,MyUI);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);
Vue.component(Comment.name,Comment);
Vue.component(Swipe.name,Swipe);
// 全局过滤器
import Moment from 'moment'
Moment.locale('zh-cn');
Vue.filter('convert',function (data, formatStr) {
  return Moment(data).format(formatStr);
});
// 相对时间过滤器
Vue.filter('relTime',function (time) {
  return Moment(time).fromNow();
});
//控制字数显示guolvqi
Vue.filter('controllShow',function (str,num) {
  if(str.length<num){
    return str;
  }else {
    return str.substr(0,num-1)+'...';
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
