<template>
<div style="height:100%">
        <head-nav></head-nav>
        <div class="archive-container">
            <div>
                <h1><div>文章归档</div></h1>
                <section v-for="(year,index) in years" :key="index" class="years">
                    <h2><span>{{ year }}</span></h2>
                    <ul class="list" v-for="(intro,index) in introductions[year]" :key="index">
                        <li>
                            <router-link :to="'/articles/' + intro.id" class="title">{{ intro.title }}</router-link>
                            <span class="time"> {{ intro.publishTime }}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        </div>
</template>

<script>
/**
 * @author
 * @file 归档组件
 */
import HeadNav from "@/components/common/HeadNav";
import request from "@/utils/request";
import moment from "moment";
moment.locale("zh-CN");
export default {
  components: {
    HeadNav
  },
  data() {
    return {
      introductions: {},
      years: []
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
          const introYear = moment(intro.publishTime).year();
          if (this.years.indexOf(introYear) === -1) {
            this.years.push(introYear);
            this.introductions[introYear] = [];
          }
          intro.publishTime = moment(intro.publishTime).format("MM-DD");
          this.introductions[introYear].push(intro);
        }
      })
      .catch(err => alert(err));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/style/variable";
.archive-container {
    max-width: 850px;
    margin: 0 auto;
  ul {
    list-style-type: circle;
    li {
      margin: 0.8em 0;
      &:hover{
          list-style-type: disc;
      }
    }
    
  }
  .time{
      margin-left: 1em;
  }
  .title:hover{
       text-decoration: underline;
  }
  .date {
    color: $special;
  }

  a {
    color: $base;
  }
}
 h1 div{
     background: $base;
     width: 20%;
     height:100%;
     font-size: 15px;
     color: white;
     text-align: center;
     line-height: 1.8em;
 }
 .years{
     margin-top: 2em;
     box-sizing: border-box;
     background: white;
     padding-bottom: 1em;
     position: relative;
      box-shadow: 1px 1px 1px $special;
      border: 2px solid transparent;
      transition: 0.5s;
      &:hover{
     box-shadow: 0px 0px 1px $special;
      border: 2px solid $base;
      }
 }
 .years::before{
     content: '';
     width: 10px;
     height: 10px;
     background: $background;
     position: absolute;
     top: 1em;
     right: 1em;
     box-shadow: 1px 1px 1px $special inset;
 }
  .years::after{
      content: '';
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid $base;
      border-left: 10px solid transparent;
      border-right: 10px solid $base;
      position: absolute;
      right: 0px;
      bottom: 0;
  }
 .years::after{
     content: '';
 }
 h2 span{
     width:4em;
     height: 20px;
     display: block;
     background: $base;
     color: white;
     padding: 0em 1em;
     position: relative;
     left: -10px;
 }
  h2 span::before{
      content: '';
      width: 0;
      height: 0;
      border-top: 10px solid $base;
      border-bottom: 10px solid $base;
      border-left: 10px solid $base;
      border-right: 10px solid transparent;
      position: absolute;
      right: -10px;
      transition: 0.5s;
  }
   h2 span::after{
      content: '';
      width: 0;
      height: 0;
      border-top: 6px solid rgb(115, 115, 206);
      border-bottom: 6px solid transparent;
      border-left: 6px solid transparent;
      border-right: 6px solid rgb(115, 115, 206);
      position: absolute;
      left: 0px;
      z-index: -1;
  }
</style>
