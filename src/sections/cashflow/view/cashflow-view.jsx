import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import Transactions from '../Transactions';


// ----------------------------------------------------------------------

export default function CashflowView({date}) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    axios.get(`/api/transaction/${date.toISOString().substring(0, 10)}`, config)
      .then(resp => setTransactions(resp.data));
  }, [date]);

  return (
    <Container maxWidth="xl">
      <Transactions transactions={transactions} />
    </Container>
  );
};

CashflowView.propTypes = {
  date: PropTypes.any
};

