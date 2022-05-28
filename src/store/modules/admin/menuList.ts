import IAdminMenu from '@/interfaces/IAdminMenu';

const menuList: IAdminMenu[] = [
  {
    title: 'Информационный раздел',
    to: '/',
    icon: 'el-icon-info',
    children: [
      {
        title: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
      },
      {
        title: 'События',
        to: '/admin/events',
        icon: 'el-icon-tickets',
      },
      {
        title: 'Слайдер новостей',
        to: '/admin/news-slides',
        icon: 'el-icon-film',
      },
      {
        title: 'Рекламные баннеры',
        to: '/admin/banners',
        icon: 'el-icon-film',
      },
      {
        title: 'Вакансии',
        to: '/admin/vacancies',
        icon: 'el-icon-suitcase-1',
      },
    ],
  },
  {
    title: 'Справочный раздел',
    to: '/',
    icon: 'el-icon-question',
    children: [
      {
        title: 'Здания',
        to: '/admin/buildings',
      },
      {
        title: 'Отделения',
        to: '/admin/divisions',
      },
      {
        title: 'Руководители',
        to: '/admin/heads',
        icon: 'el-icon-first-aid-kit',
      },
      {
        title: 'Врачи',
        to: '/admin/doctors',
        icon: 'el-icon-first-aid-kit',
      },
    ],
  },
  {
    title: 'Документы',
    to: '/',
    icon: 'el-icon-document',
    children: [
      // {
      //   title: 'Документы',
      //   to: '/admin/documents-types',
      // },
      {
        title: 'Сертификаты',
        to: '/admin/certificates',
      },
      {
        title: 'Раздел документы',
        to: '/admin/public-document-types',
        icon: 'el-icon-document',
      },
    ],
  },
  {
    title: 'Общее',
    to: '/',
    icon: 'el-icon-collection',
    children: [
      {
        title: 'Наши партнеры',
        to: '/admin/partners',
      },
      {
        title: 'Наши проекты',
        to: '/admin/projects',
      },
    ],
  },
  {
    title: 'Образование',
    to: '/',
    icon: 'el-icon-school',
    children: [
      {
        title: 'Сведения об образовательной организации',
        to: '/admin/educational-organization',
      },
      {
        title: 'Специальности',
        to: '/admin/educational/specializations',
      },
      {
        title: 'Аспирантура',
        to: '/admin/postgraduate',
      },
      {
        title: 'Кандидатские экзамены',
        to: '/admin/candidate',
      },
      {
        title: 'Дополнительное профессиональное образование',
        to: '/admin/dpo',
      },
      {
        title: 'Программы ДПО',
        to: '/admin/dpo/courses',
      },
      {
        title: 'Заявки ДПО',
        to: '/admin/dpo/applications',
        tableName: 'dpo_applications',
      },
      {
        title: 'Программы НМО',
        to: '/admin/nmo/courses',
      },
      {
        title: 'Заявки НМО',
        to: '/admin/nmo/applications',
        tableName: 'nmo_applications',
      },
      {
        title: 'Программы аспирантуры',
        to: '/admin/postgraduate-courses',
      },
      {
        title: 'Заявки на обучение в аспирантуре',
        to: '/admin/postgraduate-applications',
        tableName: 'postgraduate_applications',
      },
      {
        title: 'Заявки на сдачу кандидатского экзамена',
        to: '/admin/candidate-applications',
      },
      {
        title: 'Шаблоны форм для заявок',
        to: '/admin/form-patterns',
      },
      {
        title: 'Ординатура',
        to: '/admin/residency',
      },
      {
        title: 'Программы ординатуры',
        to: '/admin/residency/courses',
        tableName: 'residency_applications',
      },
      {
        title: 'Заявки ординатуры',
        to: '/admin/residency-applications',
      },
    ],
  },
  {
    title: 'Для пациентов',
    to: '/',
    icon: 'el-icon-user',
    children: [
      {
        title: 'Общие правила посещения',
        to: '/admin/common-visiting-rules',
      },
      {
        title: 'Подготовка к исследованиям',
        to: '/admin/preparations',
      },
      {
        title: 'FAQ',
        to: '/admin/faqs',
      },
      {
        title: 'Медицинские профили',
        to: '/admin/medical-profiles',
      },
      {
        title: 'Организации здравоохранения',
        to: '/admin/side-organizations',
      },
    ],
  },
  {
    title: 'Социальный раздел',
    to: '/',
    icon: 'el-icon-user',
    children: [
      {
        title: 'Вопросы',
        to: '/admin/questions',
        icon: 'el-icon-question',
      },
      {
        title: 'Комментарий',
        to: '/admin/comments/all',
      },
      {
        title: 'Отмодерированные комментарии',
        to: '/admin/comments/mod-checked',
      },
      {
        title: 'Неотмодерированные комментарии',
        to: '/admin/comments/not-mod-checked',
      },
    ],
  },
  {
    title: 'Трансфузиология',
    to: '/',
    icon: 'el-icon-first-aid-kit',
    children: [
      {
        title: 'Правила для доноров',
        to: '/admin/donor-rules',
        icon: 'el-icon-plus',
      },
    ],
  },
  {
    title: 'Структура сайта',
    to: '/',
    icon: 'el-icon-data-board',
    children: [
      {
        title: 'Меню',
        to: '/admin/menus',
      },
      {
        title: 'Страницы',
        to: '/admin/pages',
      },
    ],
  },
  {
    title: 'В разработке',
    to: '/',
    icon: 'el-icon-warning',
    children: [
      {
        title: 'Шаблоны графика работы',
        to: '/admin/timetable-patterns',
        icon: 'el-icon-time',
      },
      {
        title: 'Создать слоты для записи',
        to: '/admin/appointments/constructor',
      },
      {
        title: 'Список записей',
        to: '/admin/appointments/list',
      },
      {
        title: 'Заявки на въезд',
        to: '/admin/application-for-entry',
        icon: 'el-icon-guide',
      },
      {
        title: 'Платные услуги',
        to: '/admin/paid-programs-groups',
        icon: 'el-icon-money',
      },
      {
        title: 'Клиентские доступы',
        to: '/admin/path-permissions',
        icon: 'el-icon-user',
      },
      {
        title: 'Статусы заявок',
        to: '/admin/form-statuses',
        icon: 'el-icon-user',
      },
      {
        title: 'Роли',
        to: '/admin/roles',
        icon: 'el-icon-user',
      },
      {
        title: 'Пользователи',
        to: '/admin/users',
        icon: 'el-icon-user',
      },
    ],
  },
];

export default menuList;
