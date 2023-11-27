import apiClient from '../utils/http-common';

export async function getUsers(userToken) {
    return await apiClient.get(`/users/`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Token ${userToken}`
        }
    })
        .then(response => response.data);
}