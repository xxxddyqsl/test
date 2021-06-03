import axios from 'axios'

const api = {
    requestdata(id){
        return new Promise((resolve,reject)=>{
            axios.get('https://www.daxunxun.com/detail?id='+ id)
            .then(data => resolve(data.data))
            .catch(err => reject(err))
        })
        
    }
}

export default api