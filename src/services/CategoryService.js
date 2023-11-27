import apiClient from "../utils/http-common";

// const source = apiClient.CancelToken.source();

export async function getCategories() {
  return await apiClient.get("/categories/")
    .then(response => response.data);
  // return () => {
  //   console.log('clean up');
  //   source.cancel();
  // }
}

export async function deleteCategory(categoryId, userToken) {
  return await apiClient.delete(`/categories/${categoryId}/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function addCategory(category, userToken) {
  return await apiClient.post('/categories/', {
    id: null,
    categoryTitle: category.categoryTitle.value,
    description: category.description.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}

export async function updateCategory(catID, category, userToken) {
  return await apiClient.put(`/categories/${catID}/`, {
    categoryTitle: category.categoryTitle.value,
    description: category.description.value
  }, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Token ${userToken}`
    }
  })
    .then(response => response.data);
}