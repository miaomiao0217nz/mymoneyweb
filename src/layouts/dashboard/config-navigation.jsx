import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },

  {
    title: 'cashflow',
    path: '/cashflow',
    icon: icon('ic_calc'),
  },
  {
    title: 'import',
    path: '/import',
    icon: icon('ic_import'),
  }
];

export default navConfig;
