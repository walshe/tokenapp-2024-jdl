import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'myApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'a',
    data: { pageTitle: 'myApp.a.home.title' },
    loadChildren: () => import('./a/a.routes'),
  },
  {
    path: 'b',
    data: { pageTitle: 'myApp.b.home.title' },
    loadChildren: () => import('./b/b.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
