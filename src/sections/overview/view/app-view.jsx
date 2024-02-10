import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import BarChart from '../bar-chart';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView({ date }) {
  const [overview, setOverview] = useState();

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
    axios.get(`/api/transaction/overview/${date.toISOString().substring(0, 10)}`, config).then(resp => setOverview(resp.data));
  }, [date])

  if(!overview)
    return (<p>loading</p>);

  const netIncome = overview.income + overview.expense;

  console.log(overview);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Income"
            total={overview.income}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Expenses"
            total={overview.expense}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Net Income"
            total={netIncome}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Transactions"
            total={overview.totalTransactions}
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <BarChart
            title="Income VS Expense"
            subheader={date.toISOString().substring(0, 7)}
            chart={overview.incomeVsExpense}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Expense By Category"
            chart={overview.expenseByCategory}
          />
        </Grid>
      </Grid>
    </Container>
  );
}


AppView.propTypes = {
  date: PropTypes.any
};
