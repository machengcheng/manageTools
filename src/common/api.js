import env from './env'
import axios from 'axios';
//let BASE_URL = env.getHost();
// let BASE_URL = 'http://127.0.0.1:81';
// let BASE_URL = 'http://172.16.1.167:8012';
let BASE_URL = '';

export const oRemove = (url , params) => {
    return new Promise((resolve,reject) => {
        axios.delete(url,params)
            .then(res => {
                resolve(res.data)
            },err => {
                reject(err)
            }).catch(err => {
            reject(err)
        })
    })
}

export default {

    getMyFocusList: params => { return axios.get(`${BASE_URL}/sql/getMyFocusList`, { params: params }); },

    _remove(url , params){
        return oRemove(url , params);

    }

}
