import DocumentTypeList from '@/components/Documents/DocumentTypeList.vue';
import DocumentTypePage from '@/components/Documents/DocumentTypePage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/document-types',
    name: 'DocumentTypes',
    component: DocumentTypeList,
    beforeEnter: isAuthorized,
  },
  {
    path: '/document-types/new',
    name: 'CreateDocumentType',
    component: DocumentTypePage,
    beforeEnter: isAuthorized,
  },
  {
    path: '/document-types/:documentTypeId',
    name: 'EditDocumentType',
    component: DocumentTypePage,
    beforeEnter: isAuthorized,
  },
];
