import React from 'react';
import { useState } from 'react';
import './DataSensors.css';

const DataSensors = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setRowsPerPage] = useState(2);

	const dataRender = [
		{
			"id": 18,
			"temperature": 20,
			"humidity": 72,
			"luminosity": 1872,
			"dateCreated": "2024-03-10 12:40:12"
		},
		{
			"id": 19,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1695,
			"dateCreated": "2024-03-10 12:41:10"
		},
		{
			"id": 20,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1871,
			"dateCreated": "2024-03-10 12:41:15"
		},
		{
			"id": 21,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1871,
			"dateCreated": "2024-03-10 12:41:20"
		},
		{
			"id": 22,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1863,
			"dateCreated": "2024-03-10 12:41:25"
		},
		{
			"id": 23,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1685,
			"dateCreated": "2024-03-10 12:41:30"
		},
		{
			"id": 24,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1867,
			"dateCreated": "2024-03-10 12:41:37"
		},
		{
			"id": 25,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1872,
			"dateCreated": "2024-03-10 12:41:40"
		},
		{
			"id": 26,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1867,
			"dateCreated": "2024-03-10 12:41:45"
		},
		{
			"id": 27,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1860,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 28,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1860,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 29,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1685,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 30,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1869,
			"dateCreated": "2024-03-10 12:42:05"
		},
		{
			"id": 31,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1859,
			"dateCreated": "2024-03-10 12:42:12"
		},
		{
			"id": 32,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1861,
			"dateCreated": "2024-03-10 12:42:15"
		},
	];

	const filteredData = dataRender.filter(item => {
		// if (selectedType === 'all') {
		// 	return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		// } else {
		// 	return item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.type === selectedType;
		// }

		return true;

	});

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(parseInt(event.target.value));
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
						placeholder="..."
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				
				<div className="topbar__item">
					<h2>Type</h2>
					<select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
						<option value="all">All</option>
						<option value="temperature">Temperature</option>
						<option value="humidity">Humidity</option>
						<option value="luminosity">Luminosity</option>
						<option value="dateCreated">DateCreated</option>
					</select>
				</div>
				
				<div className="topbar__item">
					<h2>Rows/page</h2>
					<select onChange={handleRowsPerPageChange} value={itemsPerPage}>
						<option value="2">2</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
				</div>
			</div>
			
			{/* Table Data */}
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Temperature</th>
							<th>Humidity</th>
							<th>Luminosity</th>
							<th>Date Created</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map(item => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.temperature}</td>
								<td>{item.humidity}</td>
								<td>{item.luminosity}</td>
								<td>{item.dateCreated}</td>
							</tr>
						))}
					</tbody>
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

			<Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
		</div>
	);
};

const Pagination = ({ currentPage, totalPages, paginate }) => {
	const displayPageNumbers = 3;

	let startPage = Math.max(1, currentPage - Math.floor(displayPageNumbers / 2));
	let endPage = Math.min(totalPages, startPage + displayPageNumbers - 1);

	if (totalPages <= displayPageNumbers) {
		startPage = 1;
		endPage = totalPages;
	} else if (currentPage <= Math.floor(displayPageNumbers / 2)) {
		endPage = displayPageNumbers;
	} else if (currentPage + Math.floor(displayPageNumbers / 2) >= totalPages) {
		startPage = totalPages - displayPageNumbers + 1;
	}

	const pageNumbers = [];
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination">
			<button onClick={() => paginate(1)}>First Page</button>
			<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
			{pageNumbers.map(number => (
				<button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
					{number}
				</button>
			))}
			<button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>Next page</button>
			<button onClick={() => paginate(totalPages)}>Last Page</button>
		</div>
	);
};

export default DataSensors;