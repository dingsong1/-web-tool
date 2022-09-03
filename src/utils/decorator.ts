import {progressDark} from "naive-ui";

function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
        try {
            fn()
        } catch (e) {
            console.log('userInfo 存在问题')
        }
    }
}

function log(constructor: any) {
    console.log(constructor)
}
export class Test{
    @catchError
    fn(){
        throw new Error('测试')
    }
}
