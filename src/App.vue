<template>
  <div id="app">
    <mt-header  title="管理系统"></mt-header>
    <transition name="fade" mode="out-in">
      <router-view class="tmpl"/>
    </transition>
    
    <mt-tabbar v-model="selected">
        <mt-tab-item id="Home">
          <div @click="change('Home')">
            <img slot="icon" src="../static/img/index.png" alt="">
            首页
          </div>
          首页
        </mt-tab-item>
      <mt-tab-item id="Member">
        <div @click="change('Member')">
          <img slot="icon" src="../static/img/vip.png" alt="">
          会员
        </div>
      </mt-tab-item>
      <mt-tab-item id="Shopcart">
        <div @click="change('Shopcart')" >
          <img slot="icon" src="../static/img/shopcart.png" alt="">
          购物车
          <mt-badge size="small" type="error">
            {{totalNum}}
          </mt-badge>
        </div>
      </mt-tab-item>
      <mt-tab-item id="Search">
        <div @click="change('Search')">
          <img slot="icon" src="../static/img/find.png" alt="">
          查找
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import MyBus from './MyBus';
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed:{
    ...mapGetters([
      'getNum'
    ])
  },
  created(){
    MyBus.$on('addShopcart',(num)=>{
      this.totalNum+=num;
    });
    MyBus.$on('shopcartNum',(num)=>{
      this.totalNum = num;
    });
  },
  data () {
    return {
      selected: '',
      totalNum:0
    }
  },
  methods:{
    change(val){
      this.$router.push({
        name:val
      });
    }
  },
  watch:{
    selected:function (newV, oldV) {
      this.$router.push({
          name:newV
        }
      );
    }
  }
}
</script>

<style scoped>
  .fade-enter-active .fade-leave-active{
    transition: opacity 1s;
  }
  .fade-enter .fade-leave-to{
    opacity: 0;
  }
  .mt-tabbar{
    bottom: 0;
  }
  .mint-tab-item img {
    display: block;
    width: 55px;
    height: 55px;
  }
</style>
