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