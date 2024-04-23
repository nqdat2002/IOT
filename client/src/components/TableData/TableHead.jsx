import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort} from '@fortawesome/free-solid-svg-icons';

const upper = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};


const TableHead = ({ dataHeader, handleSort }) => {
    const firstItem = dataHeader.length > 0 ? dataHeader[0] : {};
    
    return (
        <thead>
            <tr>
                {Object.keys(firstItem).map((key) => (
                    <th key={key}>
                        {upper(key)}
                        <FontAwesomeIcon
                            icon={faSort}
                            style={{ marginLeft: '15px', cursor: 'pointer' }}
                            // onClick={() => handleSort(key)}
                        />
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;


