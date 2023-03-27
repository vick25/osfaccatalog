import axios from 'axios';

export class UserService {
    static getAllThematics() {
        return axios.get(`http://localhost:8000/api/v1/thematics`);
    }
}