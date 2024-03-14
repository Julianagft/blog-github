import axios from 'axios';

const API = axios.create({ baseURL: `https://api.github.com`});

async function getAllUsers(dados) {
   
    return await API.get(`/users`, dados);
} 

async function getUser(user, dados) {
   
    return await API.get(`/users/${user}`, dados);
} 

async function getRepositories(dados, user) {
   
    return await API.get(`/users/${login}/${repos}`, dados);
} 

const requests = {
    getAllUsers,
    getUser,
    getRepositories,
}

export default requests;