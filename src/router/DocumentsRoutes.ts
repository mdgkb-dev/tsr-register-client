import DocumentTypeList from '@/components/Documents/DocumentTypeList.vue';
import DocumentTypePage from '@/components/Documents/DocumentTypePage.vue';

export default [
  {
    path: '/document-types',
    name: 'DocumentTypes',
    component: DocumentTypeList,
  },
  {
    path: '/document-types/new',
    name: 'CreateDocumentType',
    component: DocumentTypePage,
  },
  {
    path: '/document-types/:documentTypeId',
    name: 'EditDocumentType',
    component: DocumentTypePage,
  },
];
