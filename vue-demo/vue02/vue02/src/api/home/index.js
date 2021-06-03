import axios from 'axios'

const api ={
    requestList(){
        
        return new Promise((resolve,reject)=>{
            axios.get('https://www.daxunxun.com/douban')
            .then(data => resolve(data.data))
            .catch(err => reject(err))
        })
    },
    requestbanner(){
        
        return new Promise((resolve,reject)=>{
            axios.get('https://www.daxunxun.com/banner')
            .then(data => resolve(data.data))
            .catch(err => reject(err))
        })
    },
    loadmore (pageCode) {
        return new Promise((resolve, reject) => {
          axios.get('https://www.daxunxun.com/douban?start=' + pageCode * 20 + '&count=20')
            .then(data => resolve(data.data))
            .catch(err => reject(err))
        })
      }

}

export default api