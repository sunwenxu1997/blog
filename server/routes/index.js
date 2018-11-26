import Router from 'koa-router'
import { base_API } from "../config"
//引入我们的登录注册控制器
import UserController from '../Controller/UserController'
//引入文章相关的控制器
import ArticleController from '../Controller/ArticleController'
//引入图书
import BookController from '../Controller/BookController'
//引入标签
import TagController from '../Controller/TagsController'
//引入文章操作
import IntroController from '../Controller/introductionsController'
//引入关于我
import BriefsController from '../Controller/BriefsController';
//引入验证token合法性的方法
import checkToken from '../utils/checkToken'

const router = new Router()
router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器!!!!!'
})
//所有的路由都写在这里就可以了
//前端所有的请求发过来的时候都是http://localhost:3000/api/.....
router.prefix(`${base_API}`)

//登录
router.post('/login',UserController.login)
//退出
//只要是登录后才能看到的内容都需要验证一下token的合法性.
router.get('/logout',checkToken,UserController.logout)
//获取所有的文章
router.get('/articles',ArticleController.getArticles)
//添加一篇新的文章
router.post('/articles/add',checkToken,ArticleController.addArticle)
//查询一下最新发布的那片文章的详细信息
router.get('/articles/:id',ArticleController.getOneArticle)
//更新一片新文章
router.post('/articles/update/:id',checkToken,ArticleController.updateArticle)
//删除一篇文章
router.delete('/articles/:id',checkToken,ArticleController.deleteArticle)
//发布文章
router.put('/articles/publish/:id',checkToken,ArticleController.publishArticle)


//获取所有书籍
router.get('/books',BookController.getBookList)
//添加图书
router.post('/books',checkToken,BookController.addBook)
//编辑图书
router.put('/books/:id',checkToken,BookController.editBook)
//删除图书
router.delete('/books/:id',checkToken,BookController.deleteBook)

//操作文章介绍信息
router.get('/introductions',IntroController.getIntroductions)

//个人信息
router.get('/briefs',BriefsController.getBrief)
router.put('/briefs/:id',BriefsController.updateBrief)

//获取标签
// router.put('/tags/:id',TagController.updateTag)
router.get('/tags',TagController.getTag)
export default router