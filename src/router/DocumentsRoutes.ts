import { isAuthorized } from '@/router/index';
import DocumentsList from '@/components/Documents/DocumentsList.vue';
import DocumentPage from '@/components/Documents/DocumentPage.vue';

export default [
  {
    path: '/documents',
    name: 'Documents',
    component: DocumentsList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/documents/new',
    name: 'CreateDocument',
    component: DocumentPage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/documents/:documentId',
    name: 'EditDocument',
    component: DocumentPage,
    beforeEnter: isAuthorized,
  },
];
