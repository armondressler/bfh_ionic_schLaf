import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'protocol',
    loadChildren: () => import('./protocol/protocol.module').then( m => m.ProtocolPageModule)
  },
  {
    path: 'window',
    loadChildren: () => import('./window/window.module').then( m => m.WindowPageModule)
  },   {
    path: 'records',
    loadChildren: () => import('./records/records.module').then( m => m.RecordsPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  }
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}