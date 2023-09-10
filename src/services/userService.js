import axios from '../Axios';

const getAllGame = (limit) => {
    return axios.get(`/api/get-all-game?limit=${limit}`);
}

const getTopGame = (limit, type) => {
    return axios.get(`/api/get-top-game?limit=${limit}&type=${type}`);
}



const getGameById = (id) => {
    return axios.get(`/api/get-game-by-id?id=${id}`);
}

const getAllCode = (type) => {
    return axios.get(`/api/get-allcode?type=${type}`);
}

const getAllTagGame = () => {
    return axios.get(`/api/get-all-taggame`);
}

const createNewGame = (data) => {
    return axios.post('/api/create-new-game', data);
}

const createNewAccount = (data) => {
    return axios.post('/api/create-new-account', data);
}

const getAllTopGame18 = (limit) => {
    return axios.get(`/api/get-all-topgame-18?limit=${limit}`);
}

const getLoginIntoSystem = (username, password) => {
    return axios.get(`/api/login-into-system?username=${username}&password=${password}`);
}

const getGameByKeyWord = (keyword) => {
    return axios.get(`/api/find-game-by-keyword?keyword=${keyword}`);
}







export {
    getAllGame, getAllCode, createNewGame,
    getGameById, getTopGame, getAllTagGame,
    getAllTopGame18, createNewAccount, getLoginIntoSystem,
    getGameByKeyWord
}
