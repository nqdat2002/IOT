import React from 'react';

class GroupButton extends React.Component {
    render(){
        // const { name, value, icon, end } = this.props;
        return(
        <div className="group-btn">
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round">
                </span>
            </label>
        </div>
    );
    }
};

export default GroupButton;