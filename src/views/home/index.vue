<template>
  <div class="canvas-wrapper">
    <div class="canvas-background"></div>
    <div id="canvasContent">
      <div v-for="(item,index) in state.contentList"
           :key="item.forKey"
           class="content-item"
           :style="{
             left:item.positionX+'px',
             top:item.positionY+'px',
             width:item.width+'px',
             height:item.height+'px',
             zIndex:index
           }"
      >
        <transform-wrapper>
          <template v-if="DataType.Text===item.dataType">
            <span @mousedown="(e)=>handleMouseDown(e,item)" @contextmenu.prevent="(e)=>handleClick(e,item)">{{item.data}}</span>
          </template>
          <template v-else-if="DataType.Image===item.dataType">
            <img draggable="false" @contextmenu.prevent="(e)=>handleClick(e,item)"
                 @mousedown="(e)=>handleMouseDown(e,item)"
                 :src="item.data"
                 :style="{
                 left:item.positionX,
                 top:item.positionY,
              }"
            />
          </template>
        </transform-wrapper>
      </div>
      <context-menu ref="menu" @delete="handleDeleteItem" @toTop="handleToTop" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import useDragToImport from "../../hooks/useDragToImport";
import {onDeactivated, onMounted, reactive,ref} from "vue";
import TransformWrapper from "../../components/transformWrapper.vue";
import {nanoid} from "nanoid";
import ContextMenu from "../../components/ContextMenu.vue";
const canvasWidth = 800
const canvasHeight = 600
const {mountedImportEvents,destroyImportEvents}=useDragToImport()
enum DataType{
  Text,
  Image
}
type Content = {
  forKey:string
  data:string
  dataType:DataType
  width:number
  height:number
  positionX:number
  positionY:number
}
interface State{
  contentList:Content[]
}
const state=reactive<State>({
  contentList:[]
})
const menu=ref<any>()
function handleToTop(id:string){
  const index=state.contentList.findIndex(item=>item.forKey===id)
  const temp=state.contentList[index]
  state.contentList[0]=state.contentList[state.contentList.length-1]
  state.contentList[state.contentList.length - 1]=temp
}
function handleDeleteItem(id:string){
  const index=state.contentList.findIndex(item=>item.forKey===id)
  if (index!==-1){
    state.contentList.splice(index,1)
  }
}
function addContentList(data:any,options?:any){
  state.contentList.push({
    data:data.image,
    dataType:DataType.Image,
    width:data.width,
    height:data.height,
    positionX:0,
    positionY:0,
    forKey:nanoid(),
    ...options
  })
}
function handleClick(e:PointerEvent,item:Content){
  console.log(e,'e')
  menu.value.changeDisplay(e.offsetX+20,e.offsetY+20,item.forKey)
}
function handleMouseDown(e: MouseEvent, item: Content) {
  e.stopPropagation()
  let {positionY,positionX} = item
  let boxWidth = 0
  let boxHeight = 0
  if (e.target instanceof HTMLElement) {
    if (e.target.parentElement) {
      boxHeight = e?.target?.parentElement?.clientHeight
      boxWidth = e?.target?.parentElement?.clientWidth
    }
  }

  const startY = e.clientY
  const startX = e.clientX
  // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
  const startTop = Number(positionY)
  const startLeft = Number(positionX)

  const move = (moveEvent: MouseEvent) => {
    const currX = moveEvent.clientX
    const currY = moveEvent.clientY
    positionY = currY - startY + startTop
    positionX = currX - startX + startLeft
    if (positionY < 0) {
      positionY = 0
    } else if (positionY + boxHeight > canvasHeight) {
      positionY = canvasHeight - boxHeight
    }
    if (positionX < 0) {
      positionX = 0
    } else if (positionX + boxWidth > canvasWidth) {
      positionX = canvasWidth - boxWidth
    }
    item.positionX=positionX
    item.positionY=positionY
  }

  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
onMounted(()=>{
  mountedImportEvents('#canvasContent',(data:any)=>{
    addContentList(data,{positionX:20,positionY:20})
  })
})
onDeactivated(()=>{
  destroyImportEvents()
})
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 6;
}
.canvas-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #ccc 5%, transparent 0),
  linear-gradient(#ccc 5%, transparent 0);
  background-size: 15px 15px;
  background-repeat: repeat;
  z-index: 1;
}

#canvasContent{
  width: 800px;
  height: 600px;
  background: white;
  position: absolute;
  z-index: 2;
  box-shadow: 0 0 8px hsl(0deg 0% 43% / 45%);
  left: 40px;
  top: 40px;
}
.content-item{
  position: absolute;
}
</style>
