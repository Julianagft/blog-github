import axios from 'axios';

const API = axios.create({ baseURL: `https://api.github.com`});

async function getAllUsers(dados) {
   
    return await API.get(`/users`, dados);
} 

async function getUser(user, dados) {
   
    return await API.get(`/users/${user}`, dados);
} 

async function getAllRepos(user, dados) {
   
    return await API.get(`/users/${user}/repos`, dados);
} 

async function getRepositorie(user, name, dados) {
   
    return await API.get(`/repos/${user}/${name}`, dados);
}

async function getRepoLanguages(user, name, dados) {
   
    return await API.get(`/repos/${user}/${name}/languages`, dados);
}



const requests = {
    getAllUsers,
    getUser,
    getAllRepos,
    getRepositorie,
    getRepoLanguages,
}

export default requests;