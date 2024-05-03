import React, { useEffect, useState }  from 'react';
import { getFilteredActionHistoryHandler } from '../api';
import Pagination from '../components/Pagination';
import '../styles/datasensor.css';

const ActionHistory = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setRowsPerPage] = useState(2);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [sortBy, setSortBy] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	
	// data render which has been loading from database
	const [dataRender, setDataSensor] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		const fetchFilteredDataSensors = async () => {
			const response = await getFilteredActionHistoryHandler({
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
			fetchFilteredDataSensors();
		}, 1000);

		return () => clearInterval(intervalId);
	}, [dataRender, totalPages, currentPage, itemsPerPage, searchTerm, sortBy, sortOrder, selectedType]);

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
						placeholder="Ex: off"
						value={searchTerm}
						onChange={handleSearchTerm}
					/>
				</div>
				
				<div className="topbar__item">
					<h2>Type</h2>
					<select onChange={handleSelectType} value={selectedType}>
						<option value="all">All</option>
						<option value="device_id">Device Id</option>
						<option value="action">Action</option>
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
					<TableHead 
						data={dataRender} 
						sortBy={sortBy} 
						sortOrder={sortOrder} 
						handleSort={handleSort} />
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

export default ActionHistory;
