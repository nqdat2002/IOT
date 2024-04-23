import React from 'react'
import TableBody from './TableBody'
import TableHead from './TableHead';

const Table = ({data}) => {
  return (
    <table>
        <TableHead dataHeader={data}/>
        <TableBody data={data}/>
    </table>
  );
};

export default Table;