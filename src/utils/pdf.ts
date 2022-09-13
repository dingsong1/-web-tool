import * as PDF from 'pdfjs-dist'
// @ts-ignore
import * as PDFWorker from 'pdfjs-dist/build/pdf.worker.entry'
import {formItemGridItemProps} from "naive-ui";
PDF.GlobalWorkerOptions.workerSrc = PDFWorker

function mergeCanvas(elId:string){
    const el=<HTMLElement>document.getElementById(elId)
    const mergeImage=document.createElement('canvas')
    let width=0
    let height=0
    const ctx=<CanvasRenderingContext2D>mergeImage.getContext('2d')
    ctx.fillText('hhhhhhhhhhhh',0,0)
    el.childNodes.forEach((item)=>{
        const image=new Image
        const canvas=<HTMLCanvasElement>item
        console.log(canvas)
        image.src=canvas.toDataURL()
        image.onload=function (){
            ctx.drawImage(image,0,0,image.width,image.height)
            //ctx.fillText('hhhhhhhhhhhh',0,0)
            console.log(image.height)
            console.log(image.src)
            height=image.height+height
            mergeImage.style.height=height+'px'
        }
    })

    mergeImage.style.width='500px'
    el.appendChild(mergeImage)
}

export const fileConversionLocalFile=(file:File)=>{
    return URL.createObjectURL(file)
}

export const readPdfFile=(file:File,elId:string)=>{
    return new Promise((resolve)=>{
        const el=document.getElementById(elId)
        console.log('el',el)
        if (!el)return
        el.childNodes.forEach(item=>{
            el.removeChild(item)
        })
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=function (){
            const result=<string>fileReader.result
            const loadingTask=PDF.getDocument(result)
            loadingTask.promise.then((pdf)=>{
                const pageNum = pdf.numPages;
                for (let i = 1; i <= pageNum; i++) {
                    const canvas=document.createElement('canvas')
                    el.appendChild(canvas)
                    console.log(canvas)
                    const ctx=<CanvasRenderingContext2D>canvas.getContext('2d')
                    pdf.getPage(i).then((page)=>{
                        const viewport = page.getViewport({ scale: 3 })
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        const destWidth = 398;
                        canvas.style.width = destWidth + 'px';
                        canvas.style.height = destWidth * (viewport.height / viewport.width) + 'px';
                        canvas.style.border='1px solid'
                        canvas.style.margin='10px'
                        ctx.fillText(file.name,0,0)
                        page.render({
                            canvasContext: ctx,
                            viewport,
                        })
                        if (i===pageNum){
                            resolve(true)
                        }
                    })
                }

            })
        }
    })

}
