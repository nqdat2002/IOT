import React from 'react';
import "../pages/Dashboard.css";

class BaseItem extends React.Component {
  render(){
    const { name, value, icon, end } = this.props;
    return (
      <div className="base-item">
        <h3>{name}</h3>
        <div className="base-item__content">
          <p>{value}{end}</p>
          <img src={icon} alt="" />
        </div>
      </div>
    );
  }
};

export default BaseItem;