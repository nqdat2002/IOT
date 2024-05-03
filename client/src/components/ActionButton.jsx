import React from 'react';
// import '../pages/Dashboard.css';
import '../styles/dashboard.css';

class ActionButton extends React.Component {
    render(){
        const {value, icon, onClick, isActive} = this.props;
        return(
            <div className="group-btn" >
                <img src={icon} alt="" className={isActive ? "fan-spinning" : ""}/>
                <p>{value}</p>
                <label className="switch">
                    <input type="checkbox" onClick={onClick}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
};

export default ActionButton;