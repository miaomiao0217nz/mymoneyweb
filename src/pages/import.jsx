import { Helmet } from 'react-helmet-async';

import { ImportView } from 'src/sections/import/view';

// ----------------------------------------------------------------------

export default function ImportPage() {
  return (
    <>
      <Helmet>
        <title> Import | My Money </title>
      </Helmet>

      <ImportView />
    </>
  );
}
