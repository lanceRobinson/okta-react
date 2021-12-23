import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, location, category, amount) {
    return { id, date, name, location, category, amount };
}
const d = new Date

const rows = [
    createData(
        0,
        d.toDateString(),
        'Amazon',
        'Atlanta, GA',
        'Online Purchase',
        -312.44,
    ),
    createData(
        1,
        d.toDateString(),
        'Home Depot',
        'Atlanta, GA',
        'Lifestyle',
        -866.99,
    ),
    createData(
        2,
        d.toDateString(),
        'Cheesecake Factory',
        'Atlanta, GA',
        'Dining',
        -100.81
    ),
    createData(
        3,
        d.toDateString(),
        'Best Buy',
        'Atlanta, GA',
        'Lifestyle',
        -654.39,
    ),
    createData(
        4,
        d.toDateString(),
        'Deposit',
        'Online',
        'Deposit',
        2000,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Recent Spending</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}