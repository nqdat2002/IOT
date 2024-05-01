import React from 'react';

const Pagination = ({ curr, total, paginate }) => {
	const dpage = 3;

	let st = Math.max(1, curr - Math.floor(dpage / 2));
	let en = Math.min(total, st + dpage - 1);

	if (total <= dpage) {
		st = 1;
		en = total;
	} else if (curr <= Math.floor(dpage / 2)) {
		en = dpage;
	} else if (curr + Math.floor(dpage / 2) >= total) {
		st = total - dpage + 1;
	}

	const pageNumbers = [];
	for (let i = st; i <= en; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination">
			<button onClick={() => paginate(1)}>{"<<"}</button>
			<button onClick={() => paginate(curr - 1)} disabled={curr === 1}>{"<"}</button>
			{pageNumbers.map(number => (
				<button key={number} onClick={() => paginate(number)} className={curr === number ? 'active' : ''}>
					{number}
				</button>
			))}
			<button onClick={() => paginate(curr + 1)} disabled={curr === total}>{">"}</button>
			<button onClick={() => paginate(total)}>{">>"}</button>
		</div>
	);
};

export default Pagination;