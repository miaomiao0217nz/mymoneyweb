import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { CashflowView } from 'src/sections/cashflow/view';

// ----------------------------------------------------------------------

export default function CashFlowPage({date}) {
  return (
    <>
      <Helmet>
        <title> Cashflow | My Money </title>
      </Helmet>

      <CashflowView date={date}/>
    </>
  );
}

CashFlowPage.propTypes = {
  date: PropTypes.any
};

