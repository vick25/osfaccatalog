import apiClient from "../utils/http-common";
import countries from './countries.json';

export async function getInstitutions() {
  return await apiClient.get(`/institutions/`)
    .then(response => response.data);
}

export async function deleteInstitution(institutionId, userToken) {
  console.log(userToken);
  return await apiClient.delete(`/institutions/${institutionId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function addInstitution(institution, userToken) {
  return await apiClient.post(`/institutions/`, {
    id: null,
    institutionName: institution.institutionName.value,
    sigle: institution.sigle.value,
    contactPerson: institution.contactPerson.value,
    country: institution.country.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function updateInstitution(institutionID, institution, userToken) {
  return await apiClient.put(`/institutions/${institutionID}/`, {
    institutionName: institution.institutionName.value,
    sigle: institution.sigle.value,
    contactPerson: institution.contactPerson.value,
    country: institution.country.value
  },
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(response => response.data);
}

export function getCountries() {
  return countries.countries;
}