<template>
  <div>/picture</div>
  <div class="img-box" id="imgBox">
    <span class="img-tips">拖拽图片到这里</span>
    <n-image :src="state.image"></n-image>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";

function handleDragover(e){
  console.log(e,'e')
}
interface State{
  image:File|string|null
}
const state=reactive<State>({
  image:null
})
onMounted(()=>{
  const imgBox=document.getElementById('imgBox')
  if (!imgBox)return
  console.log(imgBox,'imgBox')
  imgBox.addEventListener('drop',(e)=>{
    e.stopPropagation()
    e.preventDefault()
    if (!e.dataTransfer)return
    const files=e.dataTransfer.files
    const reader=new FileReader()
    for (let i = 0; i < files.length; i++) {
      console.log(files.item(i),'file')
      if (!files.item(i))return;
      state.image=files.item(i)
      reader.readAsDataURL(files[i])
      reader.onload=function (){
        state.image=<string>this.result
      }
    }
  },false)
  imgBox.addEventListener('dragleave', (e) => {
    e.stopPropagation()
    e.preventDefault()
  })
  imgBox.addEventListener('dragenter', (e) => {
    e.stopPropagation()
    e.preventDefault()
  })
  imgBox.addEventListener('dragover', (e) => {
    e.stopPropagation()
    e.preventDefault()
  })
})
</script>

<style scoped>
.img-box{
  border: 1px dashed;
  width: 100%;
  height: 200px;
}
.img-tips{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
