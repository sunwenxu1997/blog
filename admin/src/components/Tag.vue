<template>
<div style="height: 100%">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="tag-container main">
        <h2>标签筛选 /
            <span>CHOOSE BY TAG</span>
        </h2>
        <hr>
        <main>
            <div class="tag-list">
                <section class="tag">
                    <h5>标签</h5>
                    <ul class="tags" @click="chooseTag($event)">
                        <li class="tag" v-for="(tag,index) in tags" :key="index" :class="{chosen: chosenTags.indexOf(tag) > -1}">{{ tag }}</li>
                    </ul>
                </section>
                <section class="chosen-tag" v-show="chosenTags.length" >
                    <h5>修改标签</h5>
                    <ul class="tags">
                        <li class="tag-edit" v-for="(tag,index) in chosenTags" :key="index">
                            <input type="text" class="tag-input" :value="tag" @change="changeTag($event, index)">
                             <sup @click="deleteTag(tag, index)">x</sup>
                        </li>
                    </ul>
                </section>
                <article-list v-on:tags="getTags" ref="articleList"></article-list>
            </div>
            <editor></editor>
        </main>
    </div>
</div>
</template>

<script>
// 引入request请求模块
import request from "@/utils/request";
// 引入头部和侧边导航组件
import HeadNav from "@/components/common/HeadNav";
import Aside from "@/components/common/Aside";
// 引入文章列表的组件
import ArticleList from "@/components/common/ArticleList";
// 引入文章的编辑的组件
import Editor from "@/components/common/Editor";
export default {
  name: "Tag",
  components: {
    Editor,
    ArticleList,
    HeadNav,
    Aside
  },
  data() {
    return {
      // 所有的标签
      tags: [],
      // 所有选中的标签
      chosenTags: []
    };
  },
  methods: {
    getTags(tags) {
      // console.log(tags);
      // this.tags.push(...tags);
    },
    chooseTag(evt) {
      // console.log(evt.target.tagName);
      if (evt.target.tagName === "LI") {
        const value = evt.target.innerHTML;
        if (!evt.target.classList.contains("chosen")) {
          this.chosenTags.push(value);
        } else {
          // 排重
          this.chosenTags = this.chosenTags.filter(val => val !== value);
        }
        // 调用子组件的方法，进行传值
        this.$refs.articleList.updateListByTags(this.chosenTags);
      }
    },
     deleteTag(tag, i) {
            const tagIndex = this.tags.indexOf(tag)
            // 不再显示该tag
            this.chosenTags.splice(i, 1)
            this.tags.splice(tagIndex, 1)
            this.$refs.articleList.updateListByTags(this.chosenTags)
            // 删除文章中的tag
            this.$refs.articleList.deleteArticleTag(tag)
        },
    changeTag(evt, index) {
      const oldVal = this.chosenTags[index];
      const newVal = evt.target.value;
      // 判断tag标签是否为空
      if (!newVal) {
        alert("请直接删除Tag!");
        evt.target.value = oldVal;
        return;
      }
      // 获取标签的索引值
      const tagIndex = this.tags.indexOf(oldVal);
      // 获取tags中的index, 使用未修改的tag值
      if (this.tags.indexOf(newVal) !== -1) {
        this.chosenTags.splice(index, 1);
        this.tags.splice(tagIndex, 1);
      } else {
        // 替换两个数组中的新值
        this.chosenTags.splice(index, 1, newVal);
        this.tags.splice(tagIndex, 1, newVal);
      }

      // this.$refs.articleList.updateArticleTag(oldVal, newVal, this.chosenTags);
    }
  },
  mounted() {
    request({
      url: "/tags",
      method: "get"
    })
      .then(res => {
        console.log(res);
        for (let item of res) {
          for (let test in item) {
            let arr = item[test].split(",");
            for (let tag of arr) {
              if (this.tags.indexOf(tag) == -1 && tag != '') {
                this.tags.push(tag);
              }
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
main {
  @include flex($justify: space-between);
  height: calc(100% - 48px);
  padding: 0.5em 0;
}

.tag-list {
  width: 40%;
  height: 100%;
  overflow: auto;
  padding: 0 0.8em 0.5em 0;
  .tags {
    @include flex($justify: flex-start);
    list-style: none;
    margin-bottom: 2em;
    padding: 0;
    .tag {
      margin: 0 1em 1em 0;
      padding: 0.3em;
      color: rgb(187, 187, 187);
      background: rgb(252, 251, 251);
      border: 1px solid transparent;
      cursor: pointer;
      transition: 0.3s;
      &:hover{
          border: 1px solid $base;
          color: $base;
      }
    }
    .chosen {
      color: $white;
      background: $base;
    }

    .tag-edit {
      margin-right: 3px;
    }
  }
  .list {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}

.editor {
  width: 58%;
  height: 100%;
  padding: 0 0.8em 0.5em 0;
  overflow: auto;
}
</style>
