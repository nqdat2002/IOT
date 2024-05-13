import React from 'react';
import '../styles/dashboard.css';
import { warning_colors } from '../utils/constant';

class DataBox extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            isWarning: false
        };
    };

    componentDidUpdate(prevProps) {
		// temp value to set animation
		const warning_value = 10000;
        if (this.props.value >= warning_value && prevProps.value < warning_value) {
            this.setState({ isWarning: true });
        } else if (this.props.value < warning_value && prevProps.value >= warning_value) {
            this.setState({ isWarning: false });
        }
    };

	getGradient(warning_colors, index, value) {
		if (value >= 100) value = (value / 4000) * 100;
        return `linear-gradient(to top right, ${warning_colors[index].low} ${value}%, ${warning_colors[index].high} ${80}%)`;
    };
	
	render() {
		const {index, name, value, icon, end } = this.props;
		const gradient = this.getGradient(warning_colors, index, value);
		
		// warning state.
		const { isWarning } = this.state;
        const scaleClassName = isWarning ? "animate-flicker" : "";
		return (
			<div className={`base-item ${scaleClassName}`} style={{background: gradient}}>
				<h3>{name}</h3>
				<div className="base-item__content">
					<p>{value}{end}</p>
					<img src={icon} alt=""/>
				</div>
			</div>
		);
	}
};

export default DataBox;