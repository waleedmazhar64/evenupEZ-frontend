import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    UsersComponent,
    GroupsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale' }),
    FormsModule
  ]
})
export class AdminModule { }
