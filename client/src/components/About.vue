<template>
<div style="height:100%">
    <head-nav></head-nav>
        <div class="about-container">
            <h1><div>关于我</div></h1>
            <div class="content">
            <p v-html="parseMarkdown(about)"></p>
            </div>
        </div>
        </div>
</template>

<script>
/**
 * @author
 * @file About me组件
 */
import HeadNav from "@/components/common/HeadNav";
import parseMarkdown from '@/utils/parseMarkdown'
import request from '@/utils/request'
export default {
    components:{
        HeadNav
    },
    data() {
        return {
            about: ''
        }
    },
    created() {
        // axios.get('/api/v1/briefs')
        //     .then(res => this.about = res.data[0].content)
        //     .catch(err => alert(err))
        request({
            url:'/briefs',
            method:'get',
            data:{}
        }).then(res=>{
            this.about = res.data[0].content
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        parseMarkdown
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 @import '../assets/style/variable';
.about-container{
    max-width: 850px;
    margin: 0 auto;
    .content{
        width: 100%;
        min-height: 200px;
        background: white;
        padding-top: 2em;
        box-shadow: 1px 1px 1px $special;
        border: 2px solid transparent;
        transition: 0.5s;
        position: relative;
        &:hover{
            box-shadow: 0px 0px 1px $special;
        }
        p{
            font-size: 15px;
            font-weight: 200;
        }
    }
}

 .content::before{
     content: '';
     width: 1.5em;
     height: 1.5em;
     background: $background;
     position: absolute;
     left: 1em;
     top: 1em;
     box-shadow: 1px 1px 1px $special inset; 
     transition: 0.5s;
 }
 .content::after{
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
    // transform-origin: 0% 0%;
    // transform: rotate(-45deg);
}
 .content:hover::before{
       box-shadow: 0px 0px 0px $special inset; 
 }
h1{
    // margin-top: 1em;
     margin-bottom: 2em;
}
 h1 div{
     background:$base;
     width: 20%;
     height:100%;
     font-size: 15px;
     color: white;
     text-align: center;
     line-height: 1.8em;
 }

ul {
    padding-left: 1.2em;
    li {
        margin: 1em auto;
    }
}
</style>
