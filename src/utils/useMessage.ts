import {useMessage} from "naive-ui";

export default function (){
    const {success,loading,warning}=useMessage()
    return{
        success:(msg:string)=>{
            success(msg)
        },
        loading:(msg:string)=>{
            loading(msg)
        },
        warning:(msg:string)=>{
            warning(msg)
        },
    }
}
