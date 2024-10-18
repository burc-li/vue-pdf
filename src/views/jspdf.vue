<template>
  <div class="container">
    <div class="btn" @click="downLoadPdfA4Single">下载一页PDF（A4纸）</div>
    <div class="btn" @click="downLoadPdfA4Multiple">下载多页PDF（A4纸）</div>
    <div class="btn" @click="downLoadPdfAutoSingle">下载一页PDF（自适应纸）</div>
    <div class="btn" @click="downLoadPdfAutoMultiple">下载多页PDF（自适应纸）</div>
    <section v-for="(item, index) in pageList" :key="index">
      <p class="text">{{ index }} - {{ item.text }}</p>
      <img class="image" :src="item.src" />
    </section>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// html2canvas + jsPDF 下载PDF
// 下载一页PDF（A4纸）
const downLoadPdfA4Single = () => {
  html2canvas(document.body).then(canvas => {
    // 返回图片dataURL，参数：图片格式和清晰度(0-1)
    const pageData = canvas.toDataURL('image/jpeg', 1.0)

    // 方向纵向，尺寸ponits，纸张格式 a4 即 [595.28, 841.89]
    const A4Width = 595.28
    const A4Height = 841.89 // A4纸宽
    const pageHeight = A4Height >= A4Width * canvas.height / canvas.width ? A4Height :  A4Width * canvas.height / canvas.width
    const pdf = new jsPDF('portrait', 'pt', [A4Width, pageHeight])
    
    // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
    pdf.addImage(
      pageData,
      'JPEG',
      0,
      0,
      A4Width,
      A4Width * canvas.height / canvas.width,
    )
    pdf.save('下载一页PDF（A4纸）.pdf')
  })
}

// 下载一页PDF（自适应纸）
const downLoadPdfAutoSingle = () => {
  html2canvas(document.body, {
    scale: window.devicePixelRatio * 2, // 使用设备的像素比 * 2
  }).then(canvas => {
    // 返回图片dataURL，参数：图片格式和清晰度(0-1)
    const pageData = canvas.toDataURL('image/jpeg', 1.0)

    const pageWidth = canvas.width
    const pageHeight =  canvas.height
    const orientation = canvas.height >= canvas.width ? 'portrait' : 'landscape'  // portrait 表示纵向，landscape表示横向
    const pdf = new jsPDF(orientation, 'pt', [pageWidth, pageHeight])
    
    // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
    pdf.addImage(
      pageData,
      'JPEG',
      0,
      0,
      pageWidth,
      pageHeight
    )
    pdf.save('下载一页PDF（自适应纸）.pdf')
  })
}

// html2canvas + jsPDF 下载PDF
// 下载多页PDF（A4纸）
const downLoadPdfA4Multiple = () => {
  const ele = document.body
  html2canvas(ele, {
    scale: window.devicePixelRatio * 2, // 使用设备的像素比 * 2
  }).then(canvas => {
    let position = 0 //页面偏移
    const A4Width = 595.28 // A4纸宽度
    const A4Height = 841.89 // A4纸高度

    // 一页PDF可显示的canvas高度
    const pageHeight = (canvas.width * A4Height) / A4Width
    // 未分配到PDF的canvas高度
    let unallottedHeight = canvas.height

    // canvas对应的PDF宽高
    const imgWidth = A4Width
    const imgHeight = (A4Width * canvas.height) / canvas.width

    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF('', 'pt', [A4Width, A4Height])

    // 当canvas高度 未超过 一页PDF可显示的canvas高度，无需分页
    if (unallottedHeight <= pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      pdf.save('下载多页PDF（A4纸）.pdf')
      return
    }

    while (unallottedHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      unallottedHeight -= pageHeight
      position -= A4Height
      if (unallottedHeight > 0) {
        pdf.addPage()
      }
    }
    pdf.save('下载多页PDF（A4纸）.pdf')
  })
}

// 下载多页PDF（自适应纸）
const downLoadPdfAutoMultiple = () => {
  const ele = document.body
  html2canvas(ele, {
    scale: window.devicePixelRatio * 2, // 使用设备的像素比 * 2
  }).then(canvas => {
    let position = 0 //页面偏移
    const autoWidth = canvas.width // 一页纸宽度
    const autoHeight = canvas.width * 1.3 // 一页纸高度

    // 一页PDF可显示的canvas高度
    const pageHeight = (canvas.width * autoHeight) / autoWidth
    // 未分配到PDF的canvas高度
    let unallottedHeight = canvas.height

    // canvas对应的PDF宽高
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new jsPDF('', 'pt', [autoWidth, autoHeight])

    // 当canvas高度 未超过 一页PDF可显示的canvas高度，无需分页
    if (unallottedHeight <= pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      pdf.save('下载多页PDF（自适应纸）.pdf')
      return
    }

    while (unallottedHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      unallottedHeight -= pageHeight
      position -= autoHeight
      if (unallottedHeight > 0) {
        pdf.addPage()
      }
    }
    pdf.save('html2canvas+jsPDF下载PDF.pdf')
  })
}

const number = 20
const pageList = ref([])
const paragraph = {
  text: 'html2canvas 是一个 HTML 渲染器。该脚本允许你直接在用户浏览器截取页面或部分网页的“屏幕截屏”，屏幕截图是基于 DOM，因此生成的图片并不一定 100% 一致，因为它没有制作实际的屏幕截图，而是根据页面上可用的信息构建屏幕截图，因此生成的图片并不一定 100% 一致，因为它没有制作实际的屏幕截图，而是根据页面上可用的信息构建屏幕截图',
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
    margin-right: 12px;
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
    width: 400px;
    height: 200px;
    margin-bottom: 12px;
  }
}
</style>
