import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'client-home',
    loadChildren: () => import('./pages/home/client-home/client-home.module').then( m => m.ClientHomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  /*
  {
    path: 'register-employe',
    loadChildren: () => import('./pages/register/register-employe/register-employe.module').then( m => m.RegisterEmployePageModule)
  },
  */
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./pages/register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'owner',
    loadChildren: () => import('./pages/alta/owner/owner.module').then( m => m.OwnerPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./pages/alta/producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'listado-clientes',
    loadChildren: () => import('./pages/listado-clientes/listado-clientes.module').then( m => m.ListadoClientesPageModule)
  },
  {
    path: 'register-client',
    loadChildren: () => import('./pages/register-client/register-client.module').then( m => m.RegisterClientPageModule)
  },
  {
    path: 'waiter-home',
    loadChildren: () => import('./pages/home/waiter-home/waiter-home.module').then( m => m.WaiterHomePageModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./pages/table/table.module').then( m => m.TablePageModule)
  },
  {
    path: 'maitre-home',
    loadChildren: () => import('./pages/home/maitre-home/maitre-home.module').then( m => m.MaitreHomePageModule)
  },  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'dining-menu',
    loadChildren: () => import('./pages/dining-menu/dining-menu.module').then( m => m.DiningMenuPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
