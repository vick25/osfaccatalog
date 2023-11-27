import apiClient from "../utils/http-common";

// const source = apiClient.CancelToken.source();

export async function getProjects() {
  return await apiClient.get(`/projects/`)
    .then(response => response.data);

  // return await apiClient.get(URL)
  //   .then(response => response.data, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   },
  //     { cancelToken: source.token });
}

export async function deleteProject(projectId, userToken) {
  return await apiClient.delete(`/projects/${projectId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function addProject(project, fieldInstitutions, fieldExecutants, userToken) {
  return await apiClient.post(`/projects/`, {
    id: null,
    projectTitle: project.projectTitle.value,
    projectDescription: project.projectDescription.value,
    locationName: project.locationName.value,
    thematic: project.thematic.value,
    institution: fieldInstitutions,
    executant: fieldExecutants,
    latitude: project.latitude.value,
    longitude: project.longitude.value,
    startDate: project.startDate.value,
    endDate: project.endDate.value,
    duration: project.duration.value,
    status: project.status.value === 'true',
    publish: project.publish.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  }).then(response => response.data);
}

export async function updateProject(projectID, project, userToken) {
  return await apiClient.put(`/projects/${projectID}/`, {
    projectTitle: project.projectTitle.value,
    projectDescription: project.projectDescription.value,
    locationName: project.locationName.value,
    thematic: project.thematic.value,
    // institution: fieldInstitutions,
    // executant: fieldExecutants,
    latitude: project.latitude.value,
    longitude: project.longitude.value,
    startDate: project.startDate.value,
    endDate: project.endDate.value,
    duration: project.duration.value,
    status: project.status.value === 'true',
    publish: project.publish.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}