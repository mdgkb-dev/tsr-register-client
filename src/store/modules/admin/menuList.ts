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
];

export default menuList;
