import "./App.css";
import { NavBar } from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataSensors from "./pages/DataSensors";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
		<NavBar />
		<Routes>
			<Route path="/" element={<Dashboard/>} />
			<Route path="/datasensors" element={<DataSensors/>} />
			<Route path="/actionhistory" element={<History/>} />
			<Route path="/profile" element={<Profile/>} />
		</Routes>
    </div>
	);
};

export default App;
