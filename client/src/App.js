import './App.css';
import {NavBar} from "./components/NavBar";
import {Routes, Route} from "react-router-dom";
import {Dashboard, DataSensors, History, Profile} from "./components/pages/index";
// import {DataSensors} from "./components/pages/DataSensors";
// import {History} from "./components/pages/History";
// import {Profile} from "./components/pages/Profile";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={Dashboard}/>
        <Route path="/datasensor" element={DataSensors}/>
        <Route path="/history" element={History}/>
        <Route path="/profile" element={Profile}/>
      </Routes>
    </div>
  );
}

export default App;
