import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import DocumentTypeList from '@/components/Documents/DocumentTypeList.vue';
import DocumentTypePage from '@/components/Documents/DocumentTypePage.vue';
import { isAuthorized } from '@/router/index';

export default [
  {
    path: '/document-types',
    name: 'DocumentTypes',
    component: DocumentTypeList,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/document-types/new',
    name: 'CreateDocumentType',
    component: DocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
  {
    path: '/document-types/:documentTypeId',
    name: 'EditDocumentType',
    component: DocumentTypePage,
    beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
      isAuthorized(next);
    },
  },
];
