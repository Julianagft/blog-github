import axios from 'axios';

const API = axios.create({ baseURL: `https://api.github.com`});

async function getUsers(dados, user) {
   
    return await API.post(`/users/${user}`, dados);
} 

async function getRepositories(dados, user) {
   
    return await API.post(`/users/${user}/repos`, dados);
} 

 




const requests = {
    getUsers,
    
}

export default requests;