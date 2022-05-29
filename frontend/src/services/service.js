import axios from "axios";
let api_endpint = 'http://localhost:5000/api/v1/';//process.env.REACT_APP_API_END_POINT;
let token =localStorage.getItem('fin_auth_key');
const apiService = (url, type,data='',isUpload=false) => {
    switch (type) {
        case 'GET':
            return axios.get(api_endpint+url,{headers: {Authorization: "Bearer " +token}}).then(function(response){
                return response.data;
            }).catch(
                function (error) {
                    if(error.response.status==401){
                        window.location.href='/'
                    }
                    return error.response.data;
                }
              )
            break;
        case 'POST':
            return axios.post(api_endpint+url,data,{headers: {Authorization: "Bearer " +token,'Content-Type': isUpload?'application/x-www-form-urlencoded':'application/json'}}).then(function(response){
                return response.data;
            }).catch(
                function (error) {
                    if(error.response.status==401){
                        window.location.href='/'
                    }
                return error.response.data;
                }
              )
            break;
    }
}

export default apiService;