let watchFn:Function|null=null
let dom: Element|null=null
function handleDragleave(e: Event){
    e.stopPropagation()
    e.preventDefault()
}
function handleDragenter(e: Event){
    e.stopPropagation()
    e.preventDefault()
}
function handleDragover(e: Event){
    e.stopPropagation()
    e.preventDefault()
}
async function handleDropFile(e: DragEvent|Event){
    const dragEvent=(<DragEvent>e)
    if (!dragEvent.dataTransfer){
        return
    }
    e.stopPropagation()
    e.preventDefault()
    const files=dragEvent.dataTransfer.files
    const reader=new FileReader()
    for (let i = 0; i < files.length; i++) {
        if (!files.item(i))return;
        reader.readAsDataURL(files[i])
        reader.onload=function (){
            const url=<string>this.result
            let image = new Image()
            image.src=url
            image.onload=function (){
                if (watchFn){
                    watchFn({width:image.width,height:image.height,image:url})
                }
            }
        }
    }
}
export default function (){

    function mountedImportEvents(selector:string,callback:Function){
        dom=document.querySelector(selector)||document.documentElement
        dom.addEventListener('drop',handleDropFile,false)
        dom.addEventListener('dragleave', handleDragleave)
        dom.addEventListener('dragenter',handleDragenter)
        dom.addEventListener('dragover', handleDragover)
        watchFn=callback
        console.log('图片拖动导入事件组挂载完成')
    }
    function destroyImportEvents(){
        if (!dom)return
        dom.removeEventListener('drop',handleDropFile,false)
        dom.removeEventListener('dragleave', handleDragleave)
        dom.removeEventListener('dragenter',handleDragenter)
        dom.removeEventListener('dragover', handleDragover)
        watchFn=null
    }
    return{
        mountedImportEvents,
        destroyImportEvents
    }
}
