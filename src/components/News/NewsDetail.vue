<template>
  <div >
    <nav-bar :title="myTitle" />
    <div class="news-title">
      <p>{{newsInfo.title}}</p>
      <div>
        <span>{{newsInfo.click}}次点击</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{newsInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
      </div>
    </div>
    <div class="news-content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
    export default {
      name: "NewsDetail",
      data(){
        return{
          newsInfo:{},
          myTitle:''
        }
      },
      created() {
        let {id} =this.$route.params;
        let url=`getnew/${id}`;
        this.$axios.get(url)
          .then(res=>{
            this.newsInfo=res.data.message[0];
          })
          .catch(err =>{
            console.log(err);
          })
      },
      beforeRouteEnter(to,from,next){
        let title= '详情';
        if(from.name==='NewsList'){
          title= '新闻详情';
        }else if(from.name==='GoodDetail'){
          title= '商品图文信息';
        }
        next(vm =>{
          vm.myTitle=title;
        })
      }
    }
</script>

<style scoped>
  .news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
  }

  .news-title span {
    margin-right: 30px;
  }

  .news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  /*主体文章的左右距离*/
  .news-content {
    padding: 10px  5px;
  }
</style>
