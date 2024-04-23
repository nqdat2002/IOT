import React from 'react'

const TableBody = ({ data }) => {
	return (
		<tbody>
			{data.map((item, index) => (
				<tr key={index}>
					{Object.keys(item).map((key) => (
						<td key={key}>{item[key]}</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default TableBody;