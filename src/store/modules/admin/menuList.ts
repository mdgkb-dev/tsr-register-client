import IAdminMenu from '@/interfaces/IAdminMenu';

const menuList: IAdminMenu[] = [
  {
    title: 'Пациенты',
    to: '/admin/patients',
    icon: 'el-icon-info',
  },
  {
    title: 'Представители',
    to: '/admin/representatives',
    icon: 'el-icon-info',
  },
  {
    title: 'Врачебные комиссии/заявки',
    to: '/admin/commissions',
    icon: 'el-icon-info',
  },
  // {
  //   title: 'Заявки',
  //   to: '/admin/drugs-applications',
  //   icon: 'el-icon-info',
  // },
  // {
  //   title: 'Договоры',
  //   to: '/admin/fund-contract',
  //   icon: 'el-icon-info',
  // },
  {
    title: 'Склад',
    to: '/admin/drugs-store',
    icon: 'el-icon-info',
  },
];

export default menuList;
