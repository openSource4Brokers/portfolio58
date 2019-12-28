import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberPage } from './member.page';
import { HasRoleDirective } from '../../_directives/hasRole.directive';

const routes: Routes = [
  {
    path: '',
    component: MemberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [MemberPage, HasRoleDirective]
})
export class MemberPageModule {}
