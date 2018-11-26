<template>
    <ul class="star">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" @mousemove="hovered($event)" :data-index="index" class="star-item" :key="index"></span>
    </ul>
</template>

<script>
export default {
  data(){
      return{
          width:''
      }
  },
//   父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。
  props:['score'],
  //生命周期：通俗来讲就是实例或者组件从创建到消失的一个过程
  //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
  //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
  mounted() {
      //在操作DOM节点时需要等待html渲染完成后，所以需要用到monted
      this.width = parseInt(getComputedStyle(document.getElementsByClassName('star-item')[0]).width,10)
  },
  //计算属性
  computed:{
      itemClasses(){
       const result = []
       const score = Math.floor(this.score*2)/2
       const hasDecimal = score % 1 !==0
       const integer = Math.floor(score)
       for (let i = 0; i < integer; i++) {
         result.push('on')
       }
       if (hasDecimal) {
           result.push('half')
       }
       while(result.length<5){
           result.push('off')
       }
       return result
      }
  },
  methods:{
      hovered(evt){
          this.$emit('choose-star',{evt,width:this.width})
      }
  }
}
</script>

<style lang="scss" scoped>
.star {
    font-size: 1rem;
    padding: 0;
}

.star-item {
    display: inline-block;
    background-repeat: no-repeat;
    width: 2em;
    height: 2em;
    margin-right: 0.5em;
    background-size: 100%;
}

.star-item:last-of-type {
    margin-right: 0;
}

.star-item.on {
    background-image: url(../../assets/image/star-on.png);
}

.star-item.half {
    background-image: url(../../assets/image/star-half.png);
}

.star-item.off {
    background-image: url(../../assets/image/star-off.png);
}
</style>
