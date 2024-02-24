import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 14,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}));

export default function Filter() {
	const [age, setAge] = React.useState('');
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const onSubmit = () =>{
		console.log('Submit');
		console.log(age);
	}
	return (
		<form method='get' style={{ display: 'flex', justifyContent: 'center'}}>
			<FormControl sx={{ m: 1, minWidth: 400 }} variant="standard">
				<InputLabel htmlFor="demo-customized-textbox">Search</InputLabel>
				<BootstrapInput id="demo-customized-textbox" />
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 200 }} variant="standard">
				<InputLabel htmlFor="demo-customized-select-native">Type</InputLabel>
				<NativeSelect
					id="demo-customized-select-native"
					value={age}
					onChange={handleChange}
					input={<BootstrapInput />}
				>
					{/* <option aria-label="None" value="" /> */}
					<option value={'All'}>All</option>
					<option value={'Temperature'}>Temperature</option>
					<option value={'Humidity'}>Humidity</option>
					<option value={'Luminosity'}>Luminosity</option>
					<option value={'Date'}>Date</option>
				</NativeSelect>
			</FormControl>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				onClick={onSubmit}
			>
				Filter
			</Button>
		</form>
	);
}