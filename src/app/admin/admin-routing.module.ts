import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../services/auth.guard';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
   { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
   { path: 'users', component: UsersComponent, canActivate: [authGuard]},
   { path: 'groups', component: GroupsComponent, canActivate: [authGuard]},
   { path: 'settings', component: SettingsComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
