<template>
    <div style="height:100%">
        <head-nav></head-nav>
          <div class="articlelist-container">
               <div class="article-list">
            <article v-for="{id, title,tags, publishTime} in articles" :key="id" class="article">
                  <router-link  :to="'/articles/' + id">
                <header>
                    <h2>
                        <router-link class="title" :to="'/articles/' + id">{{ title }}</router-link>
                    </h2>
                         <span class="tags">
                        <svg class="icon" aria-hidden="true" >
                           <use xlink:href="#icon-youhui"></use>
                       </svg>
                        {{tags}}</span>
                    <h4 class="time">{{ publishTime }}</h4>
                   
                    <footer>
                    <section class="read-more">阅读全文</section>
                </footer>
                </header>
                </router-link>
            </article>
        </div>
              
          </div>
    </div>
</template>

<script>
import parseMarkdown from "@/utils/parseMarkdown";
import request from "@/utils/request";
import HeadNav from "@/components/common/HeadNav";
import moment from "moment";
moment.locale("zh-CN");
export default {
  components: {
    HeadNav
  },
  data() {
    return {
      offset: "",
      articles: ""
    };
  },

  created() {
    request({
      url: `/articles`,
      method: "get",
      data: {}
    })
      .then(res => {
        const pattern = /<!-- more -->/i;
        for (let article of res.data) {
          article.publishTime = moment(article.publishTime).format(
            "YYYY年-MM月-DD日 HH:mm:ss"
          );
        }
        this.articles = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    parseMarkdown
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
.articlelist-container {
  max-width: 850px;
  margin: 0 auto;
  
}
// 覆盖article全局样式
h2 {
  border-bottom: none;
  margin: 0.5em auto;
  padding: 0;
  padding-left: 1em;
  transition: 0.1s;
  font-weight: 200;
}
.time{
    padding: 0;
    padding-left: 1em;
}
.title {
  color: $title;
  padding-bottom: 0.3em;
}


.read-more {
   color: white;
}
.tags .icon{
    width:1em;
    height:1em;
}
.tags{
    padding-left: 1em;
    color: $base;
}
.pagination {
  @include flex($justify: space-between);
  font-size: 1.5rem;
  margin-top: 1.5em;
}

.prev,
.next {
  a {
    cursor: pointer;
    color: $base;
  }
}

.hide {
  opacity: 0;
}
.article{
    display: block;
    height: 80px;
    // overflow: hidden;
    background: white;
    margin-top: 10px;
    box-shadow: 1px 1px 1px $special;
    position: relative;
    transition: 0.3s;
    border: 2px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
}
.article:last-child{
    margin-bottom: 20px;
}
.article:hover{
      box-shadow: 0px 0px 1px $special;
      border: 2px solid $base;
}
.article header{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition:border-left 0.3s,box-shadow 0.3s;
    overflow: hidden;
    border-left: 2px solid transparent;
}
.article:hover header{
 border-left: 2px solid $base;
}
.article:hover h2{
   font-weight: 800;
}

footer{
    width: 10%;
    height: 100%;
    position: absolute;
    right: -15%;
    top: 0;
    background: $base;
    font-size: 15px;
    line-height: 80px;
    z-index: 2;
    transition: 0.3s;
}
footer::before{
    content: '';
    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-left: 40px solid transparent;
    border-bottom: 40px solid $base;
    border-right: 40px solid $base;
    position: absolute;
    left: -80px;
    z-index: -1;
}
.article:hover footer{
    right: 0%;
}
</style>
