import axios from "axios";
import { baseURL } from "../utils/constant";

export const changeActionHistoryHandler = async (changeObject) => {
    try {
        const response = await axios.post(
            baseURL + `api/actionhistory/change`, 
            changeObject
        );
        // console.log(response);
        return response.data;
    } catch (err) {
        console.error("Error in changeActionHisroryHandler: ", err);
    }
};

export const getAllActionHistoryHandler = async () => {
    try{
        const response = await axios.get(
            baseURL + "api/actionhistory/all"
        );
        // console.log(typeof(response.data));
        // console.log(response.data);
        return response.data;
    }
    catch(err){ 
        console.error("Error in getAllActionHistoryHandler: ", err); 
    }  
};

export const getFilteredActionHistoryHandler = async (filterObject) => {
    try {
        const response = await axios.get(
            baseURL + `api/actionhistory/filter?page=${filterObject.page}&limit=${filterObject.limit}&keyword=${filterObject.keyword}&sortBy=${filterObject.sortBy}&sortOrder=${filterObject.sortOrder}&type=${filterObject.type}`);
        return response.data;
    } catch (err) {
        console.error("Error in getFilteredActionHistoryHandler: ", err);
    }
};

export const getAllDataSensorHandler = async () => {
    try {
        const response = await axios.get(
            baseURL + "api/datasensor/all"
        );
        // console.log(typeof(response.data));
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error in getAllDataSensorHandler: ", err);
    }
};

export const getLastestDataSensorHandler = async() =>{
    try {
        const response = await axios.get(
            baseURL + "api/datasensor/lastest"
        );
        return response.data;
    } catch (err) {
        console.error("Error in getLastDataSensorHandler: ", err);
    }
};

export const getFilteredDataSensorHandler = async (filterObject) => {
    try {
        const response = await axios.get(
            baseURL + `api/datasensor/filter?page=${filterObject.page}&limit=${filterObject.limit}&keyword=${filterObject.keyword}&sortBy=${filterObject.sortBy}&sortOrder=${filterObject.sortOrder}&type=${filterObject.type}`);
        return response.data;
    } catch (err) {
        console.error("Error in getFilteredDataSensorHandler: ", err);
    }
};