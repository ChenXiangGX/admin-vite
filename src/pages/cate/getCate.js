
import {getCate as getCateAction } from '@/api/cate'
import {ref} from 'vue'

export const tableData = ref([])

export function getCate(){
    
    getCateAction().then(res=>{
            console.log(res)
            tableData.value = res.data;
    })
}

