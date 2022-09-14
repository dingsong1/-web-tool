<template>
  <div>/picture</div>
  <div>
    <n-checkbox v-model:checked="state.mergeImage" label="合并图片"></n-checkbox>
  </div>
  <div class="img-box" id="imgBox">
    <span class="img-tips">拖拽图片到这里</span>
    <div v-if="state.mergeImage">
      <div v-for="item in state.imageList" :key="item">
        <img :src="item.image" :width="item.width" :height="item.height" />
      </div>
    </div>
    <n-image :src="state.image" :width="state.width" :height="state.height" v-else></n-image>
  </div>
</template>

<script lang="ts" setup>
import {onDeactivated, onMounted, reactive} from "vue";
interface State{
  image:File|string|null
  imageList:Image[]
  width:number
  height:number
  files: File[],
  mergeImage:boolean
}
interface Image{
  image:string,
  width:number,
  height:number
}
const state=reactive<State>({
  image:null,
  imageList:[],
  width:0,
  height:500,
  files:[],
  mergeImage:false
})
function stashFile(fileList: FileList){
  for (let i = 0; i < fileList.length; i++) {
    console.log(fileList[i].name)
    state.files.push(fileList[i])
  }
}
async function handleDropFile(e: DragEvent){
  e.stopPropagation()
  e.preventDefault()
  if (!e.dataTransfer)return
  const files=e.dataTransfer.files
  console.log(files,'files')
  stashFile(files)
  const reader=new FileReader()
  for (let i = 0; i < state.files.length; i++) {
    if (!files.item(i))return;
    if (state.mergeImage){
      await handleMergeImage(files[i])
    }else{
      state.image=files.item(i)
      reader.readAsDataURL(files[i])
      reader.onload=function (){
        const url=<string>this.result
        let image = new Image()
        image.src=url
        image.onload=function (){
          state.width=image.width/image.height * state.height
        }
        state.image=url
      }
    }
  }
}
async function handleMergeImage(file:File){
  return new Promise((resolve)=>{
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=function (){
      const url=<string>this.result
      let image = new Image()
      image.src=url
      image.onload=function (){
        state.imageList.push({
          image:url,
          width:image.width/image.height * state.height,
          height:500
        })
        resolve(url)
      }
    }
  })


}
function handleDragleave(e: DragEvent){
  e.stopPropagation()
  e.preventDefault()
}
function handleDragenter(e: DragEvent){
  e.stopPropagation()
  e.preventDefault()
}
function handleDragover(e: DragEvent){
  e.stopPropagation()
  e.preventDefault()
}
onMounted(()=>{
  const imgBox=document.getElementById('imgBox')
  if (!imgBox)return
  imgBox.addEventListener('drop',handleDropFile,false)
  imgBox.addEventListener('dragleave', handleDragleave)
  imgBox.addEventListener('dragenter',handleDragenter)
  imgBox.addEventListener('dragover', handleDragover)
})
onDeactivated(()=>{
  const imgBox=document.getElementById('imgBox')
  if (!imgBox)return
  imgBox.removeEventListener('drop',handleDropFile,false)
  imgBox.removeEventListener('dragleave', handleDragleave)
  imgBox.removeEventListener('dragenter',handleDragenter)
  imgBox.removeEventListener('dragover', handleDragover)
})
</script>

<style scoped>
.img-box{
  border: 1px dashed;
  width: 100%;
}
.img-tips{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
