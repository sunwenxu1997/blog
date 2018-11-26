<template>
<div style="height:100%">
 <head-nav></head-nav>
    <article class="article">
        <header>
            <h1>{{ title }}</h1>
            <h4>
                     <svg class="icon" aria-hidden="true" >
                           <use xlink:href="#icon-youhui"></use>
                       </svg>
                <span class="tag" v-for="(tag,index) in tags" :key="index">{{ tag }}</span>
            </h4>
              <h4 class="time">{{ publishTime }}</h4>
              <p v-html="parseMarkdown(content)"></p>
        </header>
    </article>
    </div>
</template>

<script>
/**
 * @author
 * @file 特定文章组件
 */

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
      title: "",
      publishTime: "",
      tags: "",
      content: ""
    };
  },
  created() {
    const id = this.$route.params.id;
    request({
      url: `/articles/${id}`,
      method: "get",
      data: {}
    })
      .then(res => {
          console.log(res)
        const data = res.data[0];
        this.title = data.title;
       this.publishTime = moment(data.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')
        this.content = data.content;
        this.tags = data.tags ? data.tags.split(",") : [];
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
.article{
    max-width: 850px;
    min-height: 600px;
    margin: 0 auto;
    background: white;
    position: relative;
     box-shadow: 1px 1px 1px $special;
    animation: fadeIn 0.5s ease both 1;
    transition: 0.5s;
}@keyframes fadeIn{
    0%{
        opacity: 0;
        transform: scale(0.8)
    }
    100%{
        opacity: 1;
        transform: scale(1)
    }
}
.article::before{
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid white;
    border-right: 10px solid white;
    border-left: 10px solid white;
    border-bottom: 10px solid white;
    position: absolute;
    right: 0px;
    transition: 0.5s;
    // transform-origin: 0% 0%;
    // transform: rotate(-45deg);
}
.article::after{
    content: '';
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-right: 20px solid $base;
    border-left: 20px solid transparent;
    border-bottom: 20px solid $base;
    position: absolute;
    bottom: 0;
    right: 0px;
}
.article:hover{
    box-shadow: 1px 1px 1px transparent;
}
.article:hover::before{
      border-top: 10px solid $background;
    border-right: 10px solid $background;
     border-left: 10px solid rgb(253, 251, 251);
    border-bottom: 10px solid rgb(253, 251, 251);
}
h1{
    padding-top: 0.5em;
    border-bottom: 0px solid transparent;
}
.tag {
  color: $base;
  margin-right: 1em;
}
h1,h4,p{
    padding-left: 1em;
    
  .icon{
      width: 1em;
      height: 1em;
  }
}
p{
    padding-bottom: 1em;
    font-size: 15px;
    font-weight: 200;
    text-indent: 2em;
}
</style>
