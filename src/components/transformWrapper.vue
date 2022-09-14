<template>
  <div class="wrapper">
    <div class="point point-top-left" @mousedown.stop="(e)=>handleMouseDown(e,Direction.TopLeft)"></div>
    <div class="point point-top-center" @mousedown.stop="(e)=>handleMouseDown(e,Direction.TopCenter)"></div>
    <div class="point point-top-right" @mousedown.stop="(e)=>handleMouseDown(e,Direction.TopRight)"></div>
    <div class="point point-center-left" @mousedown.stop="(e)=>handleMouseDown(e,Direction.CenterLeft)"></div>
    <div class="slot-class"><slot ></slot></div>
    <div class="point point-center-right" @mousedown.stop="(e)=>handleMouseDown(e,Direction.CenterRight)"></div>
    <div class="point point-bottom-left" @mousedown.stop="(e)=>handleMouseDown(e,Direction.BottomLeft)"></div>
    <div class="point point-bottom-center" @mousedown.stop="(e)=>handleMouseDown(e,Direction.BottomCenter)"></div>
    <div class="point point-bottom-right" @mousedown.stop="(e)=>handleMouseDown(e,Direction.BottomRight)"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
enum Direction{
  TopLeft,
  TopCenter,
  TopRight,
  CenterLeft,
  CenterRight,
  BottomLeft,
  BottomCenter,
  BottomRight
}
function handleMouseDown(e: MouseEvent,direction:Direction){
  e.stopPropagation()
}
onMounted(()=>{
})
</script>

<style scoped>
.point{
  width: 6px;
  height: 6px;
  background: #66a5f5;
}
.point-top-left{
  position: absolute;
  left: -3px;
  top: -3px;
  cursor: nwse-resize;
}
.point-top-center{
  position: absolute;
  top:-3px;
  left: calc(50% - 3px);
  cursor: n-resize;
}
.point-top-right{
  position: absolute;
  top:-3px;
  right: -3px;
  cursor: nesw-resize;
}
.point-center-left{
  position: absolute;
  top:calc(50% - 3px);
  left: -3px;
  cursor: e-resize;
}
.point-center-right{
  position: absolute;
  top:calc(50% - 3px);
  right: -3px;
  cursor: e-resize;
}
.point-bottom-left{
  position: absolute;
  bottom:-3px;
  left: -3px;
  cursor: nesw-resize;
}
.point-bottom-center{
  position: absolute;
  bottom:-3px;
  left: calc(50% - 3px);
  cursor: n-resize;
}
.point-bottom-right{
  position: absolute;
  bottom:-3px;
  right: -3px;
  cursor: nwse-resize;
}
.wrapper{
  border: 1px solid #66a5f5;
  position: relative;
  display: inline-block;
}
.background-color{
  background: #66a5f5;
}
.slot-class{
  user-select: none;
}
</style>
