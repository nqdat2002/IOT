import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Filter = () => {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Age</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={age}
					label="Age"
					onChange={handleChange}
				>
					<MenuItem value={10}>Temperature</MenuItem>
					<MenuItem value={20}>Humidity</MenuItem>
					<MenuItem value={30}>Luminosity</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
};

export default Filter;