import apiClient from '../utils/http-common';

export async function getThematics() {
  // const source = apiClient.CancelToken.source();
  return await apiClient.get("/thematics/")
    .then(response => response.data);
}

export async function deleteThematic(thematicId, userToken) {
  console.log(userToken);
  return await apiClient.delete(`thematics/${thematicId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function addThematic(thematic, userToken) {
  return await apiClient.post("/thematics/", {
    id: null,
    thematicTitle: thematic.thematicTitle.value,
    sigle: thematic.sigle.value,
    description: thematic.description.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function updateThematic(catID, thematic, userToken) {
  return await apiClient.put(`/thematics/${catID}/`, {
    thematicTitle: thematic.thematicTitle.value,
    sigle: thematic.sigle.value,
    description: thematic.description.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}