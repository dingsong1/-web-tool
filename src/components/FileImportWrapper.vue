<template>
  <div  id="fileImport">
    <span class="file-tips">{{state.tips}}({{state.fileType}})</span>
  </div>
</template>

<script setup lang="ts">
import {useMessage} from "naive-ui";
import {onDeactivated, onMounted, reactive,defineEmits} from "vue";


const emit=defineEmits<{
  (e:'fileHandle',file:File):void
}>()
interface State{
  files:FileList|null,
  tips:string,
  fileType:string
}
const state=reactive<State>({
  files:null,
  tips:'将要处理的文件投放此处',
  fileType:''
})
const message=useMessage()
function handleDropFile(e: DragEvent){
  e.stopPropagation()
  e.preventDefault()
  if (!e.dataTransfer)return
  const files=e.dataTransfer.files
  state.files=files
  let tips='正在处理文件:'
  for (let i = 0; i < files.length; i++) {
    const file=files[i]
    if (file.type===''){
      message.warning(`文件:${file.name}类型不可用`)
      continue
    }
    if (!files.item(i))return;
    tips+=`${file.name}\n`
    emit('fileHandle',files[i])
  }
  state.tips=tips
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
  const imgBox=document.getElementById('fileImport')
  if (!imgBox)return
  imgBox.addEventListener('drop',handleDropFile,false)
  imgBox.addEventListener('dragleave', handleDragleave)
  imgBox.addEventListener('dragenter',handleDragenter)
  imgBox.addEventListener('dragover', handleDragover)
})
onDeactivated(()=>{
  const imgBox=document.getElementById('fileImport')
  if (!imgBox)return
  imgBox.removeEventListener('drop',handleDropFile,false)
  imgBox.removeEventListener('dragleave', handleDragleave)
  imgBox.removeEventListener('dragenter',handleDragenter)
  imgBox.removeEventListener('dragover', handleDragover)
})
</script>

<style scoped>
#fileImport{
  border: 1px dashed;
  padding: 40px;
  text-align: center;
}
</style>
