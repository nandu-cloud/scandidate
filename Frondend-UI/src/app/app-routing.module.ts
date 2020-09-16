import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddOrganizationComponent} from './add-organization/add-organization.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddInitutionComponent } from './add-initution/add-initution.component';
import { AddAppuserComponent } from './add-appuser/add-appuser.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { InsitutionalListComponent } from  './insitutional-list/insitutional-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInsitutionalUserComponent } from './add-insitutional-user/add-insitutional-user.component';
import { InsitutionalUserListComponent } from './insitutional-user-list/insitutional-user-list.component';
import { from } from 'rxjs';
const routes: Routes = [  {path: 'login' , component: LoginComponent},
{ path: '',  redirectTo: '/login', pathMatch: 'full' },
{path: 'add-organization' , component:AddOrganizationComponent  },
{path: 'navbar' , component:NavbarComponent },
{path: 'add-institution', component:AddInitutionComponent},
{path: 'add-appuser', component:AddAppuserComponent},
{path: 'user-profile', component:UserProfileComponent},
{path: 'organization-list', component:OrganizationListComponent},
{path: 'inistution-list', component:InsitutionalListComponent},
{path: 'users-list', component:UsersListComponent},
{path: 'dashboard', component:DashboardComponent},
{path: 'add-insitution-users', component:AddInsitutionalUserComponent},
{path: 'insitution-users-list', component:InsitutionalUserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
