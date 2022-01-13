import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'articles',
        loadChildren: () => import('../pages/articles/articles.module').then(m => m.ArticlesPageModule)
      },
      {
        path: 'panier',
        loadChildren: () => import('../pages/panier/panier.module').then(m => m.PanierPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/articles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/articles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
