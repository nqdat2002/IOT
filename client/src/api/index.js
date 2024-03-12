import axios from "axios";
const baseURL = "http://localhost:5000/";

export const changeActionHistoryHandler = async (action, device_topic) => {
    try {
        const response = await axios.post(
            baseURL + `api/actionhistory/${device_topic}`, 
            { action, device_topic }
        );
        console.log(response);
    } catch (err) {
        console.error("Error in changeActionHisroryHandler: ", err);
    }
};

export const getAllDataSensorHandler = async () => {
    try {
        const response = await axios.get(
            baseURL + "api/datasensor/alldatasensor"
        );
        // console.log(typeof(response.data));
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error in getAllDataSensorHandler: ", err);
    }
};