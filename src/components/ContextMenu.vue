<template>
  <div class="context-menu-wrapper" :style="{display:display?'block':'none',left:state.x+'px',top:state.y+'px'}">
    <div v-for="item in items" :key="item.value" class="item-menu" @click="handler(item.value)">
      {{item.text}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const items=ref([
  {
    text:'删除',
    value:'delete',
  },
  {
    text:'置顶',
    value:'toTop'
  }
])
const display=ref(false)
const state=reactive({
  x:0,
  y:0,
  data:null
})
function changeDisplay(x:number=0,y:number=0,data?:any){
  display.value=!display.value
  state.x=x
  state.y=y
  state.data=data
}
function handler(value:string){
  console.log(value)
  if (!state.data){
    return
  }
  if (value==='delete'){
    emit('delete',state.data)
  }
  if (value==='toTop'){
    emit('toTop',state.data)
  }
  changeDisplay()
}
const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toTop', id: string): void
}>()
defineExpose({changeDisplay})
</script>

<style scoped>
.context-menu-wrapper{
  border-radius: 5px;
  width: 50px;
  box-shadow: 0 0 8px hsl(0deg 0% 43% / 45%);
  text-align: center;
  display: none;
  position: absolute;
  z-index: 100;
  background: white;
}
.item-menu{
  cursor: pointer;
}
.item-menu:hover{
  border-radius: 5px;
  background: #66a5f5;
  color: white;
}
</style>
