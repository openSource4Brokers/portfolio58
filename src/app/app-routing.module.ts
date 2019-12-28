import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { CustomerDetailResolver } from './_resolvers/customer-detail.resolver';
import { VsoftCustomerService } from './_services/vsoftcustomer.service';

// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  {
    path: 'device',
    loadChildren: './pages/device-info/device-info.module#DeviceInfoPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/member/register/register.module#RegisterPageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/member/login/login.module#LoginPageModule'
  },
  {
    path: 'insurers',
    children: [
      {
        path: '',
        loadChildren: './pages/insurers/insurers.module#InsurersPageModule'
      },
      {
        path: ':insurerId',
        loadChildren:
          './pages/insurers/insurer-detail/insurer-detail.module#InsurerDetailPageModule'
      }
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'member',
        loadChildren: './pages/member/member.module#MemberPageModule',
        resolve: { user: MemberEditResolver }
        // canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'customers/:id',
        loadChildren:
          './pages/contractslist/contractslist.module#ContractsListPageModule',
        resolve: { customer: CustomerDetailResolver }
      },
      {
        path: 'customerslocalcopy',
        loadChildren:
          './pages/contractslist/contractslist.module#ContractsListPageModule'
      },
      { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [MemberEditResolver, VsoftCustomerService, CustomerDetailResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {}
