import apiClient from "../utils/http-common";

// const URL = 'http://127.0.0.1:8000/api/v1/executants/';
// const source = apiClient.CancelToken.source();

export async function getExecutants() {
  return await apiClient.get('/executants/', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data);
}

export async function addExecutant(executant, userToken) {
  // console.log(executant);
  return await apiClient.post('/executants/', {
    user: executant.user.value,
    executantEmpNo: executant.executantEmpNo.value,
    executantGrade: executant.executantGrade.value,
    profession: executant.profession.value,
    institution: executant.institution.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function updateExecutant(execID, executant, userToken) {
  return await apiClient.put(`/executants/${execID}/`, {
    user: executant.user.value,
    executantEmpNo: executant.executantEmpNo.value,
    executantGrade: executant.executantGrade.value,
    profession: executant.profession.value,
    institution: executant.institution.value
  },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => response.data);
}

export async function deleteExecutant(executantId, userToken) {
  return await apiClient.delete(`/executants/${executantId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}