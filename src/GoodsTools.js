let obj={
  goodsObj:{'87':1,'88':5},
  addShopcart({id,num}) {
    if(this.goodsObj[id]){
      this.goodsObj[id]+=num;
    }else {
      this.goodsObj[id]=num;
    }
  },
  deleteGoods(){

  }
};
window.text =obj;
export default obj;
