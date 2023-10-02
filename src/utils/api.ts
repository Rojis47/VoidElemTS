import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', 
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

export const fetchProjects = async () => {
  try {
    const response = await instance.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const patchUpdateProject = async (id: number, updates: object) => {
  try {
    const response = await instance.patch(`/projects/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};


export const fetchFavorites = async () => {
  try {
    const response = await instance.get('/favorites');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};


export const postFavoriteProject = async (userId: number, projectId: number) => {
  try {
    const response = await instance.post('/favorites', {
      userId,
      projectId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
}


export const Requests = {
  fetchProjects,
  patchUpdateProject,
  fetchFavorites,
  postFavoriteProject,
};

