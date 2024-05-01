import React, { useEffect, useState } from 'react';
import { getFilteredDataSensorHandler } from '../api';
import Pagination from '../components/Pagination';
import './DataSensors.css';

// Table Header
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSortDown} from '@fortawesome/free-solid-svg-icons';

const DataSensors = () => {
	// params query 
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setRowsPerPage] = useState(2);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	
	// data render which has been loading from database
	const [dataRender, setDataSensor] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	
	// const rawData = [
	// 	{
	// 		"id": 18,
	// 		"temperature": 20,
	// 		"humidity": 72,
	// 		"luminosity": 1872,
	// 		"dateCreated": "2024-03-10 12:40:12"
	// 	},
	// 	{
	// 		"id": 19,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1695,
	// 		"dateCreated": "2024-03-10 12:41:10"
	// 	},
	// 	{
	// 		"id": 20,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1871,
	// 		"dateCreated": "2024-03-10 12:41:15"
	// 	},
	// 	{
	// 		"id": 21,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1871,
	// 		"dateCreated": "2024-03-10 12:41:20"
	// 	},
	// 	{
	// 		"id": 22,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1863,
	// 		"dateCreated": "2024-03-10 12:41:25"
	// 	},
	// 	{
	// 		"id": 23,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1685,
	// 		"dateCreated": "2024-03-10 12:41:30"
	// 	},
	// 	{
	// 		"id": 24,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1867,
	// 		"dateCreated": "2024-03-10 12:41:37"
	// 	},
	// 	{
	// 		"id": 25,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1872,
	// 		"dateCreated": "2024-03-10 12:41:40"
	// 	},
	// 	{
	// 		"id": 26,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1867,
	// 		"dateCreated": "2024-03-10 12:41:45"
	// 	},
	// 	{
	// 		"id": 27,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1860,
	// 		"dateCreated": "2024-03-10 12:42:01"
	// 	},
	// 	{
	// 		"id": 28,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1860,
	// 		"dateCreated": "2024-03-10 12:42:01"
	// 	},
	// 	{
	// 		"id": 29,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1685,
	// 		"dateCreated": "2024-03-10 12:42:01"
	// 	},
	// 	{
	// 		"id": 30,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1869,
	// 		"dateCreated": "2024-03-10 12:42:05"
	// 	},
	// 	{
	// 		"id": 31,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1859,
	// 		"dateCreated": "2024-03-10 12:42:12"
	// 	},
	// 	{
	// 		"id": 32,
	// 		"temperature": 20,
	// 		"humidity": 71,
	// 		"luminosity": 1861,
	// 		"dateCreated": "2024-03-10 12:42:15"
	// 	},
	// ]
	
	// const filteredData = dataRender.filter(item => {
	// 	// if (selectedType === 'all') {
	// 	// 	return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	// 	// } else {
	// 	// 	return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.type === selectedType;
	// 	// }

	// 	return true;

	// });
	
	useEffect(() => {
		const fetchFilteredDataSensprs = async () => {
			const response = await getFilteredDataSensorHandler({
				page: currentPage, 
				limit: itemsPerPage, 
				keyword: searchTerm.toLocaleLowerCase(),
				sortBy: sortBy,
				sortOrder: sortOrder,
				type: selectedType
			});
			if (response === undefined) {
				return;
			}
			const responseData = response.data;
			
			setDataSensor(responseData);
			setTotalPages(response.totalPages);
			// console.log(responseData);
			// console.log(totalPages);
			// console.log(sortBy, sortOrder);
			
		}

		const intervalId = setInterval(() => {
			fetchFilteredDataSensprs();
		}, 1000);

		return () => clearInterval(intervalId);
	}, [dataRender, totalPages, currentPage, itemsPerPage, searchTerm, sortBy, sortOrder, selectedType]);


	// const indexOfLastItem = currentPage * itemsPerPage;
	// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// const currentItems = dataRender.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = pageNumber => setCurrentPage(pageNumber);

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		setCurrentPage(1);
	};

	const handleSelectType = (event) => {
		// set to default sort
		setSortBy('');
		setSortOrder('asc');
		setSelectedType(event.target.value);
		setCurrentPage(1);
	};

	const handleSearchTerm = (event) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
	};

	const handleSort = (column, order) => {
        setSortBy(column);
        setSortOrder(order);
		setCurrentPage(1);
    };

	return (
		<div className="container-datasensor">
			{/* Search & Filter */}
			<div className="container__topbar">

				<div className="topbar__item search__input">
					<h2>Search</h2>
					<input
						type="text"
						placeholder="Ex: 10"
						value={searchTerm}
						onChange={handleSearchTerm}
					/>
				</div>
				
				<div className="topbar__item">
					<h2>Type</h2>
					<select onChange={handleSelectType} value={selectedType}>
						<option value="all">All</option>
						<option value="temperature">Temperature</option>
						<option value="humidity">Humidity</option>
						<option value="luminosity">Luminosity</option>
						<option value="date">DateCreated</option>
					</select>
				</div>
				
				<div className="topbar__item">
					<h2>Rows/page</h2>
					<select onChange={handleRowsPerPageChange} value={itemsPerPage}>
						<option value="2">2</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>
			
			{/* Table Data */}
			<div className="table-container">
				<table>
					<TableHead data={dataRender} sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
					<TableBody data={dataRender} />
				</table>
			</div>

			{/* Pagination */}
			{/* <div className="pagination">
				{Array.from({ length: totalPages }, (_, i) => (
					<button key={i} onClick={() => paginate(i + 1)}>
						{i + 1}
					</button>
				))}
			</div> */}

			<Pagination curr={currentPage} total={totalPages} paginate={paginate} />

			
		</div>
	);
};

// const Pagination = ({ currentPage, totalPages, paginate }) => {
// 	const displayPageNumbers = 3;

// 	let startPage = Math.max(1, currentPage - Math.floor(displayPageNumbers / 2));
// 	let endPage = Math.min(totalPages, startPage + displayPageNumbers - 1);

// 	if (totalPages <= displayPageNumbers) {
// 		startPage = 1;
// 		endPage = totalPages;
// 	} else if (currentPage <= Math.floor(displayPageNumbers / 2)) {
// 		endPage = displayPageNumbers;
// 	} else if (currentPage + Math.floor(displayPageNumbers / 2) >= totalPages) {
// 		startPage = totalPages - displayPageNumbers + 1;
// 	}

// 	const pageNumbers = [];
// 	for (let i = startPage; i <= endPage; i++) {
// 		pageNumbers.push(i);
// 	}

// 	return (
// 		<div className="pagination">
// 			<button onClick={() => paginate(1)}>{"<<"}</button>
// 			<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
// 			{pageNumbers.map(number => (
// 				<button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
// 					{number}
// 				</button>
// 			))}
// 			<button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
// 			<button onClick={() => paginate(totalPages)}>{">>"}</button>
// 		</div>
// 	);
// };

const upper = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const TableHead = ({ data, sortBy, sortOrder, handleSort}) => {
    const firstItem = data.length > 0 ? data[0] : {};
	
	const handleClickSort = (key) => {
        if (sortBy === key) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            handleSort(key, newSortOrder); 
        } else {
            handleSort(key, 'asc'); 
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(firstItem).map((key) => (
                    <th key={key} onClick={() => handleClickSort(key)} style={{ cursor: 'pointer' }}>
					{upper(key)}
					{/* <FontAwesomeIcon
						icon={faSortDown}
						style={{
							marginLeft: '5px',
							cursor: 'pointer',
							visibility: sortBy === key ? 'visible' : 'hidden',
							transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
							position: 'relative',
							top: '3px', 
							left: '5px'
						}}
					/> */}
				</th>
                ))}
            </tr>
        </thead>
    );
};

const TableBody = ({ data }) => {
	return (
		<tbody>
			{data.map((item, index) => (
				<tr key={index}>
				{
					Object.keys(item).map(
						(key) => (
							<td key={key}>{item[key]}</td>)
					)
				}
				</tr>
			))}
		</tbody>
	);
};

export default DataSensors;