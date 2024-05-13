import { getLastestDataSensorHandler } from "../api";

// time delay
export const timeOut = 5000;

// base url api
export const baseURL = "http://localhost:5000/";

// object in table show in page

export const dataSensorObject = {
  id: "id",
  temperature: "temperature",
  humidity: "humidity",
  luminosity: "luminosity",
  dateCreated: "dateCreated",
};

export const actionhistoryObject = {
  id: "id",
  device: "device",
  action: "action",
  dateCreated: "dateCreated",
};

const Data15 = await getLastestDataSensorHandler();

const rawDataSensor2 = [
  {
    "id": 1050,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1068,
    "dateCreated": "2024-04-18 12:33:43"
  },
  {
    "id": 1051,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1060,
    "dateCreated": "2024-04-18 12:33:48"
  },
  {
    "id": 1052,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 978,
    "dateCreated": "2024-04-18 12:33:53"
  },
  {
    "id": 1053,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 981,
    "dateCreated": "2024-04-18 12:33:58"
  },
  {
    "id": 1054,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 977,
    "dateCreated": "2024-04-18 12:34:03"
  },
  {
    "id": 1055,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1088,
    "dateCreated": "2024-04-18 12:34:08"
  },
  {
    "id": 1056,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1082,
    "dateCreated": "2024-04-18 12:34:13"
  },
  {
    "id": 1057,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1142,
    "dateCreated": "2024-04-18 12:34:18"
  },
  {
    "id": 1058,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1143,
    "dateCreated": "2024-04-18 12:34:23"
  },
  {
    "id": 1059,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1134,
    "dateCreated": "2024-04-18 12:34:28"
  },
  {
    "id": 1060,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1143,
    "dateCreated": "2024-04-18 12:34:33"
  },
  {
    "id": 1061,
    "temperature": 29,
    "humidity": 73,
    "luminosity": 1149,
    "dateCreated": "2024-04-18 12:34:38"
  },
  {
    "id": 1062,
    "temperature": 26,
    "humidity": 82,
    "luminosity": 570,
    "dateCreated": "2024-05-02 18:49:44"
  },
  {
    "id": 1063,
    "temperature": 26,
    "humidity": 82,
    "luminosity": 559,
    "dateCreated": "2024-05-02 18:49:49"
  },
  {
    "id": 1064,
    "temperature": 26,
    "humidity": 82,
    "luminosity": 591,
    "dateCreated": "2024-05-02 18:49:54"
  },
];

export const rawDataSensor = Data15.data === null ? rawDataSensor2 : Data15.data;

export const rawActionHistory = [

];

export const warning_colors = [
  {
    low: '#ff0000',
    high: '#ffe6e6',
  },
  {
    low: '#0066ff',
    high: '#cce0ff',
  },
  {
    low: '#ffff66',
    high: '#ffffe6',
  },
  {
    low: '#00cc00',
    high: '#e3e9f0',
  }
];


export const lineChart_colors = {
  temperature: '#ff0000',
  humidity: '#0066ff',
  luminosity: '#ffff66',
  dusting: '#00cc00'
};
