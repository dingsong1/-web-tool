<template>
  <div class="base64-conversion">
    <div class="input-box">
      <n-input
          :autosize="{
            minRows: 3,
            maxRows: 10
          }"
          v-model:value="state.value"
          type="textarea"
          placeholder="任意尺寸格式的base64图片"
      />
    </div>
    <n-divider vertical="true" />
    <div class="img-box">
      <n-image :src="state.imageData" width="600"/>
    </div>
  </div>
  <div class="actions">
    <n-button @click="handleConversion">转化</n-button>
    <n-button @click="handleCopyImage">复制图片</n-button>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {useMessage} from "naive-ui";
import {Test} from "../../utils/decorator";
const message = useMessage()
const state=reactive({
  value:'',
  imageData:''
})
console.log('loading..../base64-conversion-picture',)
function handleConversion(){
  let newImageData=state.value.replaceAll('"','')
  if (!newImageData.includes('data:image')){
    newImageData='data:image/png;base64,'+newImageData
  }
  state.imageData=newImageData
}
function handleCopyImage(){
  let canvas = document.createElement('canvas') // 创建一个画板
  let image = new Image()
  image.setAttribute("crossOrigin", 'Anonymous') //可能会有跨越问题
  image.src = state.imageData
  image.onload = () => {  // img加载完成事件
    canvas.width = image.width  //设置画板宽度
    canvas.height = image.height; //设置画板高度
    (<CanvasRenderingContext2D>canvas.getContext('2d')).drawImage(image, 0, 0); //加载img到画板
    let url = canvas.toDataURL("image/png") // 转换图片为dataURL，格式为png
    clipboardImg(url) // 调用复制方法
  }
}

async function clipboardImg(url: RequestInfo | URL){
  const data = await fetch(url);
  const blob = await data.blob();
  await navigator.clipboard.write([
    new window.ClipboardItem({
      [blob.type]: blob
    })
  ]);
  const test=new Test()
  test.fn()
  message.success('复制完成')
}
</script>

<style scoped>
.base64-conversion{
  display: flex;
}
.input-box{
  flex: 1;
}
.img-box{
  background: gray;
}
</style>
