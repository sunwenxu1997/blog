<template>
<div style="height:100%">
     <head-nav></head-nav>
    <div class="readinglist-container">
        <h1><div>阅读列表</div></h1>
        <table>
            <tr>
                <th>书名</th>
                <th>作者</th>
                <th>ashenの评分</th>
            </tr>
            <tr v-for="({name, author, score}, index) in books" :key="index">
                <td class="col-1">{{ name }}</td>
                <td class="col-2">{{ author }}</td>
                <td class="col-3">
                    <star :score="score"></star>
                </td>
            </tr>
        </table>
    </div>
    </div>
</template>

<script>
/**
 * @author
 * @file 阅读列表组件
 */

import Star from '@/components/common/Star'
import request from '@/utils/request'
import HeadNav from "@/components/common/HeadNav";
export default {
    components:{
     HeadNav,
     Star
    },
    data() {
        return {
            books: []
        }
    },
    created() {
        request({
            url:'/books',
            method:'get',
            data:{}
        }).then(res=>{
            console.log(res)
            this.books = res.data
        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 @import '../assets/style/variable';
 .readinglist-container{
  margin: 0 auto;
  z-index: 2;
//   padding: 0.5em 0;
  max-width: 850px;
 }
 h1{
     margin-bottom: 2em;
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
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
    th {
        padding: 1em 0;
        color: white;
        border-bottom: 2px solid $background;
        font-size: 13px;
    }
    th:nth-child(1){
        background: $base;
    }
     th:nth-child(2){
        background:rgb(175, 175, 247);
    }
     th:nth-child(3){
        background:rgb(215, 215, 250);
    }
    tr:nth-child(1):hover{
         border: none;
    }
    tr:hover{
        background: $white;
        border-left: 2px solid $base;
         border-right: 2px solid $base;
    }
    tr{
        background: white;
    }
    td {
        text-align: center;
        /*font-size: 1.3rem;*/
        padding: 1em 0;
        border-bottom: 1px solid $background;
    }
    .col-1,
    .col-2 {
        width: 25%;
         transition: 0.3s;
          font-size: 13px;
    }
     .col-1:hover,
    .col-2:hover{
       background: rgb(245, 244, 244);
       font-size: 15px;
       
    }

    .col-2 {
        border-left: 1px solid $background;
        border-right: 1px solid $background;
    }

    .col-3 {
        color: $base;
    }
}
</style>
