import axios from 'axios';
import authHeader from './auth-header';
import fileHeader from './file-header'

const API_URL = 'http://localhost:3001/api/';

class UserService {
    getHomePage() {
        return axios.get(API_URL + 'all');
    };

    getMainPage() {
        return axios.get(API_URL + 'user', { 
            headers: authHeader()
        });
    };

    getAllImages() {
        return axios.get(API_URL + 'image/all', {
            headers: authHeader()
        })
    }

    uploadImage(image, description) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        return axios.post(API_URL + 'image', formData, {
            headers: fileHeader()
        });
    }

    postLike(userId, imageId) {
        const data = {userId, imageId};
        return axios.post(API_URL + 'like', data, {
            headers: authHeader()
        });
    }

    async getLike(userId, imageId) {
        const data = {userId, imageId}
        return await axios.get(API_URL + 'like', {
            params: {
                data
            },
            headers: authHeader()
        });
    }
}

export default new UserService();