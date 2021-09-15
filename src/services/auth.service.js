import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth/';

class AuthService {
    async login(username, password) {
        const response = await axios.post(API_URL + "signin", {
            username, 
            password
        });

        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(username, password) {
        return axios.post(API_URL + "signup", {
            username, 
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}


export default new AuthService();