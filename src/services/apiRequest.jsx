import axios from 'axios';

const API = axios.create({ baseURL: `https://api.github.com`});

async function getAllUsers(query, dados) {
   
    return await API.get(`/search/users?q=${query}`, dados);
} 

async function getUser(user, dados) {
   
    return await API.get(`/users/${user}`, dados);
} 

async function getUserRepos(user, dados) {
   
    return await API.get(`/users/${user}/repos`, dados);
} 

async function getAllRepos(query, dados) {
   
    return await API.get(`/search/repositories?q=${query}`, dados);
}

const requests = {
    getAllUsers,
    getUser,
    getUserRepos,
    getAllRepos,
}

export default requests;