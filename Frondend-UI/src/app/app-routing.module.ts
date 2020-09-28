import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AddOrganizationComponent} from './components/scandidate/organization-onboard/add-organization/add-organization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddInitutionComponent } from './components/scandidate/institute-onboard/add-initution/add-initution.component';
import { AddAppuserComponent } from './components/scandidate/users-onboard/add-appuser/add-appuser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrganizationListComponent } from './components/scandidate/organization-onboard/organization-list/organization-list.component';
import { InsitutionalListComponent } from  './components/scandidate/institute-onboard/insitutional-list/insitutional-list.component';
import { UsersListComponent } from './components/scandidate/users-onboard/users-list/users-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddInsitutionalUserComponent } from './components/institution/users/add-insitutional-user/add-insitutional-user.component';
import { InsitutionalUserListComponent } from './components/institution/users/insitutional-user-list/insitutional-user-list.component';
import { StudentCsvUploadComponent } from './components/institution/students/student-csv-upload/student-csv-upload.component';
import { from } from 'rxjs';
import { StudentListComponent } from './components/institution/students/student-list/student-list.component';
import { AddStudentComponent } from './components/institution/students/add-student/add-student.component';
import { AddOrganizationUserComponent } from './components/organization/users/add-organization-user/add-organization-user.component';
import { OrganizationUserListComponent } from './components/organization/users/organization-user-list/organization-user-list.component';
import { AddCandidateComponent } from './components/organization/employees/add-candidate/add-candidate.component';
import { CandidateListComponent } from './components/organization/employees/candidate-list/candidate-list.component';
const routes: Routes = [  {path: 'login' , component: LoginComponent},
{ path: '',  redirectTo: '/login', pathMatch: 'full' },
{path: 'add-organization' , component:AddOrganizationComponent  },
{path: 'navbar' , component:NavbarComponent },
{path: 'add-institution', component:AddInitutionComponent},
{path: 'add-institution/:id', component:AddInitutionComponent},
{path: 'add-appuser', component:AddAppuserComponent},
{path: 'add-appuser/:id', component:AddAppuserComponent},
{path: 'user-profile', component:UserProfileComponent},
{path: 'organization-list', component:OrganizationListComponent},
{path: 'inistution-list', component:InsitutionalListComponent},
{path: 'users-list', component:UsersListComponent},
{path: 'dashboard', component:DashboardComponent},
{path: 'add-insitution-users', component:AddInsitutionalUserComponent},
{path: 'add-organization/:id', component:AddOrganizationComponent},
{path: 'insitution-users-list', component:InsitutionalUserListComponent},
{path: 'student-list', component: StudentListComponent},
{path: 'add-student', component: AddStudentComponent},
{path: 'csvUpload',component: StudentCsvUploadComponent},
{path: 'add-organization-user', component: AddOrganizationUserComponent},
{path: 'organization-user-list', component: OrganizationUserListComponent},
{path: 'add-candidate', component: AddCandidateComponent},
{path: 'candidate-list', component: CandidateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
