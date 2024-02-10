import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage({date}) {
  return (
    <>
      <Helmet>
        <title> Dashboard | My Money </title>
      </Helmet>

      <AppView  date={date}/>
    </>
  );
}


AppPage.propTypes = {
  date: PropTypes.any,
};
