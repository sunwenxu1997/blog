<template>
<div style="height:100%">
    <head-nav></head-nav>
    <div class="tag-container">
        <h1><div>标签</div></h1>
        <nav>
            <ul class="tags">
                <li v-for="(tag,index) in tags" :key="index" class="tag">
                    <a href="javascript:void(0)" @click="goAnchor(tag)">{{ tag }}</a>
                </li>
            </ul>
        </nav>
        <ul class="tag-list">
            <li v-for="(tag,index) in tags" :key="index" class="tag-lt">
                 <svg class="icon" aria-hidden="true" >
                           <use xlink:href="#icon-youhui"></use>
                       </svg>
                <span :id="tag" :name="tag">{{ tag }}</span>
                <ul>
                    <li v-for="(intro,index) in introductions[tag]" :key="index">
                        <router-link :to="'/articles/' + intro.id">{{ intro.title }}</router-link>
                        <span class="time"> {{ intro.publishTime }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    </div>
</template>

<script>
/**
 * @author
 * @file Hello World
 */
import request from "@/utils/request";
import moment from "moment";
import HeadNav from "@/components/common/HeadNav";
moment.locale("zh-CN");
export default {
  components: {
    HeadNav
  },
  data() {
    return {
      introductions: {},
      tags: []
    };
  },
  created() {
    request({
      url: "/introductions",
      method: "get",
      data: {}
    })
      .then(res => {
        for (let intro of res.data) {
          intro.tags = intro.tags ? intro.tags.split(",") : [];
          intro.publishTime = moment(intro.publishTime).format("YYYY-MM-DD");
          for (let tag of intro.tags) {
            if (this.tags.indexOf(tag) === -1) {
              this.tags.push(tag);
              this.introductions[tag] = [];
            }
            this.introductions[tag].push(intro);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goAnchor(id) {
      //点击滚轮到当前显示位置
      const anchor = document.getElementById(id);
      if (window.innerWidth > 480) {
        document.documentElement.scrollTop = anchor.offsetTop;
        document.body.scrollTop = anchor.offsetTop;
      } else {
        document.documentElement.scrollTop = anchor.offsetTop - 64;
        document.body.scrollTop = anchor.offsetTop - 64;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/variable";
.tag-container {
  max-width: 850px;
  margin: 0 auto;
  .icon {
    width: 1em;
    height: 1em;
  }

  .tags {
    padding: 0;
    list-style: none;

    .tag {
      display: inline;
      margin-right: 1em;
      padding: 0.5em 1em;
      background: #f1f3f7;
      border-radius: 5px;
      transition: 0.3s;
      position: relative;

      a {
        color: rgb(199, 198, 198);
        transition: 0.3s;
      }
      &:hover {
        background: white;
      }
      &:hover a {
        color: $base;
      }
    }
  }
  .tag::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: $background;
    position: absolute;
    left: 2px;
  }
  .tag-list {
    width: 100%;
    padding: 0;
    list-style: none;
     .tag-lt{
         box-sizing: border-box;
          border: 2px solid transparent;
         transition: 0.5s;
      box-shadow: 1px 1px 1px $special;
      position: relative;
      cursor: default;
      &:hover{
          border: 2px solid $base;
          box-shadow: 0px 0px 1px $special;
      }
      }
    li {
      margin: 0 0.8em 0.8em 0;
      background: white;
      padding: 0.5em 0 0.5em 1em;
      float: left;
    }
  }
 .tag-lt::before{
     content: '';
     width: 8px;
     height: 8px;
     background: $background;
     position: absolute;
     right: 10px;
     box-shadow: 1px 1px 1px $special inset;
    //  border-radius: 50%;
 }
  a {
    color: $base;
  }
}
nav {
  padding-bottom: 1em;
}
h1 {
  margin-bottom: 2em;
}
h1 div {
  background: $base;
  width: 20%;
  height: 100%;
  font-size: 15px;
  color: white;
  text-align: center;
  line-height: 1.8em;
}
</style>
