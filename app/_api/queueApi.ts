import {api} from "@/app/_api/apiConfig";

export const addQueue = async (userId:string) => {
    try {
        const json = {userId : userId}
        const response = await api.post(`/queue/add`,json);
        console.log(response);
    }catch (error){
        console.log(error);
    }
};

export const checkQueuePosition = async (userId:string) => {
    try {
        const response = await api.get(`/queue/position?userId=${userId}`);
        return response.data;
    }catch (error){
        console.log(error);
    }
};

export const processQueue = async () => {
    try {
        const response = await api.post(`/queue/process`);
        console.log(response);
    }catch (error){
        console.log(error);
    }
};

export const getAllQueue = async () => {
    try {
        const response = await api.get(`/queue/all`);
        return response.data.map(user => JSON.parse(user)).map(user => user.userId);
    }catch (error){
        console.log(error);
    }
};