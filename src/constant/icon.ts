import {FILE_TYPE} from "./file";
import {FilePdf,FileQuestion,ImageFiles} from '@icon-park/vue-next'
export const FILE_ICON_DICT_TYPE={
    [FILE_TYPE.PDF]:FilePdf,
    [FILE_TYPE.PNG]:ImageFiles,
    [FILE_TYPE.UNKNOWN]:FileQuestion
}
