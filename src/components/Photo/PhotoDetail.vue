<template>
    <div>
      <nav-bar title="图文详情"></nav-bar>
      <div class="photo-title">
        <p>{{photoInfo.title}}</p>
        <span>发起日期：{{photoInfo.add_time | convertTime('YYYY年MM月DD日')}}</span>
        <span>{{photoInfo.click}}次浏览</span>
        <span>分类：民生经济</span>
      </div>
      <my-ul>
        <my-li v-for="(img,index) in imgs " :key="index">
          <img :src="img.src" slot="icon"  alt="">
        </my-li>
      </my-ul>
      <div class="photo-desc">
        <p v-html="photoInfo.content"></p>
      </div>
      <!-- 使用评论组件 -->
      <comment :cid="$route.params.id"/>
    </div>
</template>

<script>
  import MyUl from "../common/MyUI";
    export default {
      name: "PhotoDetail",
      data(){
        return{
          photoInfo:{}, //图文详情
          imgs:[], //缩略图
        }
      },
      created() {
        let pid=this.$route.params.id;
        // 发起请求 获取详情信息
        this.$axios.get(`getimageInfo/${pid}`)
          .then(res=>{
            this.photoInfo = res.data.message[0];
          })
          .catch(console.log);
        // 获取图片缩略图信息
        this.$axios.get(`getthumimages/${pid}`)
          .then(res=>{
            this.imgs = res.data.message;
            //  给图片对象加入宽高
            this.imgs.forEach( img => {
              img.w = 200;
              img.h = 200;
              img.msrc = img.src;
            });
          })
          .catch(console.log)
      }
    }
</script>

<style scoped>
  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .photo-title {
    overflow: hidden;
  }

  .photo-title,
  .photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  .photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
  }

  .photo-title span {
    margin-right: 20px;
  }

  .photo-desc p {
    font-size: 18px;
  }
</style>
