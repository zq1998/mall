<template>
  <div>
    <nav-bar title="购物车"/>
    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="(goods,index) in shopcart" :key="goods.id">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.thumb_path" alt="">
          <div class="pay-calc">
            <p>{{goods.title}}</p>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="substract(goods)">-</span>
              <span>{{goods.buyNum}}</span>
              <span @click="add(goods,index)">+</span>
              <a href="javascript:;" @click="del(goods)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
    import MyBus from '@/MyBus';
    export default {
      name: "shopcart",
      data(){
        return{
          shopcart:[],
        }
      },
      async created() {
          let url='goods/getshopcartlist/'+Object.keys(test.goodsObj).join(',');
          this.shopcart=(await this.$axios.get(url)).data.message;
        for (let i = 0; i< this.shopcart.length ; i ++) {
          let goods = this.shopcart[i];
          let num = test.goodsObj[goods.id];
          if(num) {
            // 手动完成响应式
            this.$set(goods,'buyNum',num);
            this.$set(goods,'isSelected',true);
            // goods.buyNum = num;
            // goods.isSelected = true;
          }
        }
      },
      methods: {
        del(goods,i) {
          // 删除数组元素
          let num=goods.buyNum;
          this.shopcart.splice(i,1);
          // 删除test.goodsObj的数据
          // delete test.goodsObj[goods.id];
          this.$store.dispatch('addNumByAct',-num);
        },
        substract(goods){
          goods.buyNum --;
          // test.goodsObj[goods.id]--;
          this.$store.dispatch('addNumByAct',-1);
        },
        add(goods){
          goods.buyNum ++;
          // test.goodsObj[goods.id]++;
          this.$store.dispatch('addNumByAct',1);
        }
      },
      computed:{
        payment() {
          // 件数/金额
          let count = 0;
          let total = 0;
          this.shopcart.forEach( goods => {
            // 如果 勾选
            if(goods.isSelected) {
              count += goods.buyNum;
              total += goods.buyNum * goods.sell_price;
            }
          });
          return {
            total,count
          }
        }
      },
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        let result = confirm('确定要离开吗？');
        if(result) {
          // 保存用户的编辑数据
          // 计算总数
          let total = Object.values(test.goodsObj).reduce((prev, cur)=> prev + cur );
          // MyBus.$emit('shopcartNum',total);
          this.$store.dispatch('changeNumByAct',total);
          next();
        } else {
          next(false);// 取消导航
        }
      }
    }
</script>

<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }

  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }

  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }

  .pay-detail ul li >:nth-child(1),
  .pay-detail ul li >:nth-child(3) {
    display: inline-block;
  }

  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .pay-detail ul li >:nth-child(1) {
    line-height: 80px;
  }
  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }
  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  .calc a {
    margin-left: 20px;
  }

  .show-1,
  .show-2 {
    display: inline-block;
  }
  .show-1,
  .show-2 {
    margin-left: 30px;
  }
  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
