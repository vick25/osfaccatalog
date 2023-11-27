import apiClient from "../utils/http-common";

export async function getDatas() {
  return await apiClient.get('/datas/')
    .then(response => response.data);
}

export async function addData(data, userToken) {
  console.log(data, userToken);
  return await apiClient.post('/datas/', data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function updateData(datatID, data, userToken) {
  return await apiClient.put(`/${datatID}/`, {
    thematicTitle: data.thematicTitle.value,
    sigle: data.sigle.value,
    description: data.description.value
  },
    {
      headers: {
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => response.data);
}

export async function deleteData(dataId, userToken) {
  console.log(userToken);
  return await apiClient.delete(`/${dataId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}