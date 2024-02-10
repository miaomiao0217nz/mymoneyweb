import React from 'react';
import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';

export default function Transactions({ transactions }) {

    const rows = transactions.map((r, i) => ({ id: i, ...r }));

    const columns = [
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'details', headerName: 'Details', width: 250 },
        { field: 'particulars', headerName: 'Particulars', width: 250 },
        { field: 'code', headerName: 'Code', width: 150 },
        { field: 'reference', headerName: 'Reference', width: 150 },
        { field: 'amount', headerName: 'Amount', width: 150, align: "right" },
        { field: 'tags', headerName: 'Tag', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
    ];

    return <DataGrid style={{ width: "100%" }} rowsPro
        rows={rows} columns={columns}
        initialState={{
            pagination: { paginationModel: { pageSize: 13 } },
        }}
    />
}


Transactions.propTypes = {
    transactions: PropTypes.array,
};
