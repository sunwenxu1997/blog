<template>
<div style="height:100%">
     <head-nav></head-nav>
    <Aside></Aside>
    <div class="about-container main">
        <h2>关于我 /
            <span>ABOUT ME</span>
        </h2>
        <hr>
        <main>
            <textarea></textarea>
            <section class="btn-container">
                <button class="not-del" @click="updateAbout">提交修改</button>
            </section>
        </main>
    </div>
    </div>
</template>

<script>
/**
 * @author
 * @file 关于我的后台管理组件
 * */
import Aside from "@/components/common/Aside";
import HeadNav from "@/components/common/HeadNav";
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import request from "@/utils/request";

export default {
  data() {
    return {
      id: "",
      simplemde: ""
    };
  },
  components: {
    Aside,
    HeadNav
  },
   //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要
  mounted() {
    this.simplemde = new SimpleMDE({
      autoDownloadFontAwesome: false,
      spellChecker: false
    })
   request({
       url:'/briefs',
       method:'get'
   }).then(res=>{
       this.simplemde.value(res[0].content)
   })
  },
  methods: {
      //提交修改
    updateAbout() {
      request({
          url:`/briefs/${this.id}`,
          method:'put',
          data:{content:this.simplemde.value()}
      }).catch(err=>{
          console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
main {
  height: calc(100% - 48px);
  padding: 0.5em 0;
  overflow: auto;
  font-size: 1.6rem;
}
.btn-container {
  @include flex($justify: flex-end);
}
</style>
