import axios from 'axios'
import { Indicator} from 'mint-ui'
const api ={
    requestList(){
        return new Promise((resolve,reject)=>{
            axios.get('https://www.daxunxun.com/douban?start=0&count=200')
            .then(data => {
                Indicator.close() //关闭loading
                resolve(data.data)
            })
            .catch(err => reject(err))
        })
    }
}

export default api