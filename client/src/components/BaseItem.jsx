import React from 'react';
import "../pages/Dashboard.css";

class BaseItem extends React.Component {
	getGradient(warning_colors, index, value) {
		if (value >= 100) value = (value / 4000) * 100;
        return `linear-gradient(to top right, ${warning_colors[index].low} ${value}%, ${warning_colors[index].high} 100%)`;
    }
	render() {
		const {index, name, value, icon, end } = this.props;
		const warning_colors = [
			{
				low: '#ff4d4d',
				high: '#e3e9f0',
			},
			{
				low: '#66ccff',
				high: '#e3e9f0',
			},
			{
				low: '#ffff80',
				high: '#e3e9f0',
			}
		];
		const gradient = this.getGradient(warning_colors, index, value);
		return (
			<div className="base-item" style={{background: gradient}}>
				<h3>{name}</h3>
				<div className="base-item__content">
					<p>{value}{end}</p>
					<img src={icon} alt=""/>
				</div>
			</div>
		);
	}
};

export default BaseItem;