import axios from "axios";
const baseURL = "http://localhost:5000/";

export const changeActionHistoryHandler = async (changeObject) => {
    try {
        const response = await axios.post(
            baseURL + `api/actionhistory/change`, 
            changeObject
        );
        console.log(response);
        return response.data;
    } catch (err) {
        console.error("Error in changeActionHisroryHandler: ", err);
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

export const getFilteredDataSensorHandler = async (filterObject) => {
    try {
        const response = await axios.get(
            baseURL + "api/datasensor/filter",
            filterObject
        );
        return response.data;
    } catch (err) {
        console.error("Error in getFilteredDataSensorHandler: ", err);
    }
}