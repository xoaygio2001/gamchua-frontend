import React from "react";
import {
    getAllCode, getAllGame, getGameById,
    getTopGame, getAllTagGame, getAllTopGame18,
    createNewAccount, getLoginIntoSystem,
    getGameByKeyWord
} from '../../services/userService'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllCodeAction = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode(type)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: type,
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllTagGameAction = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTagGame()
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'ALLTAGGAME',
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}


export const getAllGameAction = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllGame(limit)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'ALLGAME',
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}



export const getTopGameAction = (limit, type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopGame(limit, type)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'TOPGAME',
                    data: res.data,
                    typeTop: type

                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getAllTopGame18Action = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTopGame18(limit)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'TOPGAME18',
                    data: res.data,

                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const createNewAccountAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewAccount(data)
            if (res && res.errCode == 0) {
                toast.success("Tạo tài khoản thành công")
            } else {
                toast.error("Tạo tài khoản thất bại")
            }

        } catch (error) {
            console.log(error);
            toast.error("Tạo tài khoản thất bại")
        }
    }
}


export const getGameByIdAction = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGameById(id)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'GAME',
                    data: res.data
                });
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getLoginIntoSystemAction = (username,password) => {
    return async (dispatch, getState) => {
        try {
            let res = await getLoginIntoSystem(username,password)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'LOGIN-SYSTEM',
                    data: res.data
                });
            
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }

            return res;

        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}

export const getGameByKeyWordAction = (keyword) => {
    return async (dispatch, getState) => {
        try {
            let res = await getGameByKeyWord(keyword)
            if (res && res.errCode == 0 && res.data) {
                dispatch({
                    type: 'GAME-BY-KEYWORD',
                    data: res.data
                });
            
            } else {
                dispatch({
                    type: `FAIL`,
                });
            }


        } catch (error) {
            console.log(error);
            dispatch({
                type: `FAIL`,
            });
        }
    }
}






