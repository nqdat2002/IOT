import "./App.css";
import NavBar from "./layout/NavBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DataSensors from "./pages/DataSensors";
import ActionHistory from "./pages/ActionHistory";
import Profile from "./pages/Profile";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className="App">
		<NavBar />
		<Routes>
			<Route path="/" element={<Dashboard/>} />
			<Route path="/datasensors" element={<DataSensors/>} />
			<Route path="/actionhistory" element={<ActionHistory/>} />
			<Route path="/profile" element={<Profile/>} />
		</Routes>
		<Footer/>
    </div>
	);
};

export default App;
