<template>
  <div class="navigation">
    <div class="item system-color" v-for="item in state.menu" :key="item.key">
      <router-link :to="item.href" custom v-slot="{navigate }">
        <span @click="navigate">{{item.label}}</span>
      </router-link>
      <template v-if="item.children">
        <div class="children-item" v-for="children in item.children" :key="children.key">
          <router-link :to="item.href+children.href" custom v-slot="{navigate }">
            <span @click="navigate">{{children.label}}</span>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
interface State{
  menu:object[]
}
const state=reactive<State>({
  menu:[
    {
      label:'主页',
      key:'home',
      href:'/'
    },
    {
      label: '图片处理',
      key:'picture',
      href:'/picture',
      children:[
        {
          label:'base64转图片',
          key:'base64ConversionPicture',
          href:'/base64Conversion',
        }
      ]
    },
    {
      label: 'pdf处理',
      key: 'pdf',
      href: '/pdf'
    }
  ]
})

</script>

<style scoped>
.navigation{
  display: flex;
  width: 100%;
  justify-content: end;
  font-size: 18px;
}
.item{
  cursor: pointer;
  min-width: 100px;
  text-align: center;
  color: #4e8df5 !important;
  text-decoration: unset;
}
.item:hover{
  background: rgba(255,255,255,0.4);
}
</style>
