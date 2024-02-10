import { Helmet } from 'react-helmet-async';

import { SignupView } from 'src/sections/signup/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Signup | My Moeny </title>
      </Helmet>

      <SignupView />
    </>
  );
}
