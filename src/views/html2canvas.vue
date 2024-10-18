<template>
  <div class="container">
    <div class="btn" @click="capture">使用 html2canvas 进行屏幕截屏</div>
    <section v-for="(item, index) in pageList" :key="index">
      <p class="text">{{ index }} - {{ item.text }}</p>
      <img class="image" :src="item.src" />
    </section>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import html2canvas from 'html2canvas'

// 使用 html2canvas 进行屏幕截屏
// html2canvas(element, options)
const capture = () => {
  const ele = document.querySelector('.container')
  html2canvas(document.body, {
    scale: window.devicePixelRatio * 2, // 使用设备的像素比 * 2
  }).then(canvas => {
    ele.appendChild(canvas)
  })
}

const number = 2
const pageList = ref([])
const paragraph = {
  text: 'html2canvas 是一个 HTML 渲染器。该脚本允许你直接在用户浏览器截取页面或部分网页的“屏幕截屏”，屏幕截图是基于 DOM，因此生成的图片并不一定 100% 一致，因为它没有制作实际的屏幕截图，而是根据页面上可用的信息构建屏幕截图',
  src: new URL('@/assets/images/001.jpg', import.meta.url).href,
}

onBeforeMount(() => {
  pageList.value.length = 0
  while (pageList.value.length < number) {
    pageList.value.push(paragraph)
  }
})
</script>
<style lang="less" scoped>
.container {
  .btn {
    display: inline-block;
    padding: 8px 12px;
    margin-bottom: 12px;
    color: #fff;
    border-radius: 2px;
    border: 1px solid #2d8cf0;
    background-color: #2d8cf0;
    cursor: pointer;
  }
  .text {
    line-height: 1.5em;
    margin-bottom: 16px;
    word-break: break-all;
  }
  .image {
    width: 100%;
    height: 100px;
    margin-bottom: 12px;
  }
}
</style>
