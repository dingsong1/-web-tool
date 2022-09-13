<template>
  <div>
    pdf
    <div>
      <file-import-wrapper @fileHandle="handleFile"/>
      <div id="pdf-conversion-wrapper"></div>
      <iframe :src="state.blobUrl" height="100%" width="100%" frameborder></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import {FILE_ICON_DICT_TYPE as icons} from "../../constant/icon";
import {FILE_TYPE as fileType} from "../../constant/file";
import FileImportWrapper from "../../components/FileImportWrapper.vue";
import {fileConversionLocalFile, readPdfFile} from "../../utils/pdf";
const state=reactive({
  blobUrl:'',
  type:''
})
async function handleFile(file:File){
  console.log('handleFile',file)
  state.type=file.type
  state.blobUrl=fileConversionLocalFile(file)
}
</script>

<style scoped>

</style>
