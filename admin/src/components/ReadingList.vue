<template>
 <div style="height:100%">
       <head-nav></head-nav>
        <Aside></Aside>
         <transition name="slide-fade">
            <div class="dialog-container" v-show="isDiaShow" @click="hideDialog($event)">
                <section class="dialog">
                    <h5>输入书籍</h5>
                    <star :score="score" id="score" @choose-star="chooseScore"></star>
                    <input type="text" id="name" placeholder="输入书籍名称...">
                    <input type="text" id="author" placeholder="输入作者...">
                    <section class="btn-container">
                        <button id="confirm" class="not-del" @click="confirmChange" >确认</button>
                        <button id="cancel" class="delete">取消</button>
                    </section>
                </section>
            </div>
        </transition>
    <div class="reading-list-container main">
        <h2>阅读列表 /
            <span>READING LIST</span>
        </h2>
        <hr>
        <main>
            <section class="btn-container">
                <button id="add" class="not-del" @click="addBook">添加书籍</button>
            </section>
            <table class="rd-list">
                <tr>
                    <th>书名</th>
                    <th>作者</th>
                    <th>评分</th>
                    <th>编辑/删除</th>
                </tr>
                <tr v-for="({ name, author, score },index) in books" :key="index" class="tr">
                    <td class="col-1">{{ name }}</td>
                    <td class="col-2">{{ author }}</td>
                    <td class="col-3">
                        <star :score="score"></star>
                    </td>
                    <td class="col-4">
                        <section class="btn-container">
                            <button id="edit" class="not-del" @click="editBook(index)" >编辑</button>
                            <button id="delete" class="delete"  @click="deleteBook(index)">删除</button>
                        </section>
                    </td>
                </tr>
            </table>
        </main>
    </div>
    </div>
</template>

<script>
import Aside from "@/components/common/Aside";
import HeadNav from "@/components/common/HeadNav";
import Star from "@/components/common/Star";
import request from "@/utils/request";
export default {
  data() {
    return {
      books: [],
      isDiaShow: false,
      isEditing: false,
      editingId: "",
      editingIndex: "",
      score: 0
    };
  },
  components: {
    Aside,
    HeadNav,
    Star
  },
  // 调用ajax获取页面初始化所需的数据
  created() {
    request({
      url: "/books",
      method: "get",
      data: {}
    })
      .then(res => {
        this.books = res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //打开添加图书弹框
    addBook() {
      this.isDiaShow = true;
      this.isEditing = false;
      this.score = 0;
      document.getElementById("name").value = "";
      document.getElementById("author").value = "";
    },
    //打开编辑图书弹框
    editBook(index) {
      this.isDiaShow = true;
      this.isEditing = true;
      this.score = this.books[index].score;
      //获取图书名称
      document.getElementById("name").value = this.books[index].name;
      //获取作者
      document.getElementById("author").value = this.books[index].author;
      this.editingId = this.books[index].id;
      this.editingIndex = index;
    },
    //删除图书
    deleteBook(index){
        request({
            url:`/books/${this.books[index].id}`,
            method:'delete',
            data:{}
        }).then(res=>{
            this.books.splice(index,1)
        }).catch(err=>{
            console.log(err)
        })
    },
    //星星打分
    chooseScore({ evt, width }) {
      const offsetX = evt.offsetX;
      // toFixed返回的是字符串...
      let score = (
        parseInt(evt.target.dataset.index, 10) + parseFloat(offsetX / width)
      ).toFixed(2);
      if (score > 4.9) {
        score = 5;
      }
      this.score = score;
    },
    //点击空白处弹框消失
    hideDialog(evt) {
      if (
        evt.target.className === "dialog-container" ||
        evt.target.id === "cancel"
      ) {
        this.isDiaShow = false;
      }
    },
    confirmChange() {
        // 添加图书
        if (!this.isEditing) {
            //打开添加图书弹框时执行，反而打开编辑时不会执行，避免重复添加
            const name = document.getElementById('name').value
            const author = document.getElementById('author').value
            const score = this.score
            if (name && author) {
                //当书名和作者都填写时执行
                request({
                    url:'/books',
                    method:'post',
                    data:{
                        name,
                        author,
                        score
                    }
                }).then(res=>{
                    const id = res.insertId
                    const book = {
                        id,
                        name,
                        author,
                        score
                    }
                    this.books.push(book)
                    this.isDiaShow = false
                }).catch(err=>{
                    console.log(err)
                })
            }
        }else{
                console.log(111)
                //编辑图书
                 const name = document.getElementById('name').value
                const author = document.getElementById('author').value
                const score = this.score
                const id = this.editingId
                if (name && author) {
                    request({
                        url:`/books/${id}`,
                        method:'put',
                        data:{
                            name,
                            author,
                            score
                        }
                    }).then(res=>{
                        this.books.splice(this.editingIndex,1,{id, name, author, score})
                        this.isDiaShow = false
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }
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
}
.tr:hover{
    transition: 0.3s;
    border-left: 5px solid $base;
   background: rgba(255, 255, 255, 0.699);
}
.rd-list {
  width: 100%;
  border-collapse: collapse;
  th {
    height: 3em;
    font-size: 1.6rem;
    border-bottom: 1px solid $word;
  }
  td {
    text-align: center;
    height: 4em;
    border-bottom: 1px solid $special;
  }
  
  .col-1,
  .col-2,
  .col-4 {
    width: 20%;
    font-size: 13px;
  }

  .col-2,
  .col-3 {
    border-left: 1px solid $special;
    border-right: 1px solid $special;
  }
}
.col-1,
  .col-2,
  .col-3,
  .col-4 {
      animation: up 0.7s ease both 1;
  }@keyframes up {
      0%{
          opacity: 0;
          padding-top: 2em;
      }
      100%{
          opacity: 1;
          padding-top: 0em;
      }
  }
.dialog-container {
  @include flex;
  position: absolute;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 1024px;
  min-height: 900px;
  overflow: auto;
  background: rgba(0, 0, 0, 0.3);
  .dialog {
    @include flex($flow: column wrap, $justify: flex-start);
    width: 400px;
    height: 300px;
    background: $white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
    h5 {
      margin: 40px;
    }
    .star {
      margin-top: 0;
      .star-item {
        width: 1.5em;
        height: 1.5em;
      }
    }
    input {
      margin-bottom: 15px;
      width: 200px;
      height: 2.5em;
      border-radius: 2px;
      border: 1px solid $special;
      outline-color: $base;
    }
    .btn-container {
      width: 200px;
      @include flex($justify: space-between);
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>