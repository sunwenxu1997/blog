<template>
    <div class="editor">
      <input type="text" class="title" id="title" v-model="title" @input="autoSave">
      <div class="operate-bar">
        <section class="tag-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youhui"></use>
          </svg>
          <ul class="tags">
            <li class="tag" v-for="(tag,index) in getTags" :key="index">
              {{tag}}
              <sup @click="deleteTag(index)">x</sup>
            </li>
          </ul>
          <input v-if="showTags" type="text" class="tag-input" id="tag-input" @keydown.enter="addTag">
          <span v-else class="tag-add" @click="addTag">+</span>
        </section>
        <section class="btn-container">
          <button id="delete" class="delete" @click="deleteArticle">删除文章</button>
          <button id="submit" class="not-del" @click="publishArticle">发布文章</button>
        </section>
      </div>
      <p class="tips">标签查询页面只能批量更改标签，修改的文章内容会自动保存</p>
      <div class="content">
        <textarea></textarea>
      </div>
    </div>
</template>
<script>
//引入编辑器
import "simplemde/dist/simplemde.min.css";
import SimpleMDE from "simplemde";
import request from "@/utils/request";
import { mapState, mapGetters } from "vuex";
//引入debounce方法
import debounce from "lodash.debounce";
export default {
  name: "Editor",
  data() {
    return {
      showTags: false,
      simplemde: "" //编辑器
    };
  },
  computed: {
    ...mapState(["id", "tags", "content", "isPublished"]),
    ...mapGetters(["getTags"]),
    //因为这个title是数据双向绑定的，因此，它可能会被改变，如果我们直接从mapState中读取它的话
    //那么如果改变title的话，又因为它没有setter方法，就会导致无法直接改变state中的title.
    title: {
      get() {
        return this.$store.state.title;
      },
      set(value) {
        this.$store.commit("SET_TITLE", value);
      }
    }
  },
  mounted() {
    // this.tags = this.$store.getters.getTags;
    this.simplemde = new SimpleMDE({
      placeholder: "Talk to me , what are you say...",
      spellChecker: false,
      toolbarTips: false
    });
    //将vuex里面的正在编辑的文章的相关信息输出到编辑器里面
    this.simplemde.value(this.content);
    //当键盘输入或复制时都会自动保存
    this.simplemde.codemirror.on("keyHandler", () => this.autoSave());
    this.simplemde.codemirror.on("inputRead", () => this.autoSave());
  },
  //监控ID的变化，如果一旦发生变化，就直接将内容变化
  watch: {
    id(newVal, oldVal) {
      this.simplemde.value(this.content);
    }
  },
  methods: {
    //避免多次输入，发送请求次数频发
    autoSave: debounce(function() {
      if (this.id) {
        //  console.log('开始保存文章')
        this.$store.dispatch("saveArticle", {
          id: this.id,
          title: this.title,
          tags: this.getTags.join(","),
          content: this.simplemde.value(),
          isPusblished: this.isPusblished
        });
      }
    }, 1000),
    //删除标签
    deleteTag(index) {
      this.getTags.splice(index, 1);
      this.autoSave();
    },
    //  添加标签
    addTag() {
      //第一次点击加号不执行此代码
      if (this.showTags) {
        //第二次回车时执行此代码
        const newTag = document.querySelector("#tag-input").value;
        //判断标签内容重复
        if (newTag && this.getTags.indexOf(newTag) === -1) {
          this.getTags.push(newTag);
          //每次回车时会自动保存
          this.autoSave();
        }
      }
      //第一次点击加号执行此代码
      this.showTags = !this.showTags;
    },
    //删除文章
    deleteArticle() {
      request({
        url: `/articles/${this.id}`,
        method: "delete",
        data: {}
      })
        .then(res => {
          //  console.log(res)
          //删除之后需要更新视图,让视图中的视图也删掉
          this.$store.commit("SET_DELETE_ARTICLE");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发布文章
    publishArticle() {
      //判断之前是否发布过
      if (!this.isPusblished) {
        request({
          url: `/articles/publish/${this.id}`,
          method: "put",
          data: {
            title: this.title,
            // tags: this.tags.join(","),
            content: this.simplemde.value(),
            isPublished: 1
          }
        })
          .then(res => {
            this.$store.commit("SET_PUBLISH_STATE");
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
/*记得引入全局变量的文件*/
@import "../../assets/style/variable";
.title {
  margin-bottom: 0.3em;
  width: 100%;
  height: 2em;
  border: none;
  font-size: 2.4rem;
  color: $title;
  outline: none;
  border-bottom: 1px solid $special;
  background: none;
  text-align: center;
}
.operate-bar {
  @include flex($justify: space-between);
  height: 4em;
  font-size: 1.3rem;
  margin-bottom: 1em;
  .tag-container {
    @include flex($justify: flex-start);
    .icon {
      width: 1.5em;
      height: 1.5em;
      margin-right: 10px;
    }
    .tags {
      @include flex;
      list-style: none;
      margin-right: 10px;
      padding: 0;
      .tag {
        margin-right: 10px;
        color: $base;
        position: relative;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .tag-add {
      font: {
        weight: 600;
        size: 1.6rem;
      }
      color: $special;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.tips {
  color: $quote;
  text-align: center;
}
.content {
  font-size: 1.6rem;
}
</style>
