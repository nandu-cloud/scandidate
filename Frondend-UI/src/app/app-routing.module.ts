import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AddOrganizationComponent } from './components/scandidate/organization-onboard/add-organization/add-organization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddInitutionComponent } from './components/scandidate/institute-onboard/add-initution/add-initution.component';
import { AddAppuserComponent } from './components/scandidate/users-onboard/add-appuser/add-appuser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrganizationListComponent } from './components/scandidate/organization-onboard/organization-list/organization-list.component';
import { InsitutionalListComponent } from './components/scandidate/institute-onboard/insitutional-list/insitutional-list.component';
import { UsersListComponent } from './components/scandidate/users-onboard/users-list/users-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddInsitutionalUserComponent } from './components/institution/users/add-insitutional-user/add-insitutional-user.component';
import { InsitutionalUserListComponent } from './components/institution/users/insitutional-user-list/insitutional-user-list.component';
import { StudentCsvUploadComponent } from './components/institution/students/student-csv-upload/student-csv-upload.component';
import { StudentListComponent } from './components/institution/students/student-list/student-list.component';
import { AddStudentComponent } from './components/institution/students/add-student/add-student.component';
import { AddCandidateComponent } from './components/organization/employees/add-candidate/add-candidate.component';
import { CandidateListComponent } from './components/organization/employees/candidate-list/candidate-list.component';
import { OrganizationUsersListComponent } from './components/organization/users/users-list/organization-users-list/organization-users-list.component';
import { AddOppuserComponent } from './components/organization/users/add-oppuser/add-oppuser/add-oppuser.component';
import { from } from 'rxjs';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { InstitutionDashboardComponent } from './components/instituteDashboard/institutionDashboard.component';
import { OrganizationDashboardComponent } from './components/organizationDashboard/organizationDashboard.component';
import { ScandidateSettingsComponent } from './components/scandidate/scandidate-settings/scandidate-settings.component';
import { BGVSearchComponent } from './components/bgv-search/bgv-search.component';
import { AllStudentsComponent } from './components/scandidate/institute-onboard/all-students/all-students.component';
import { AllEmployeesComponent } from './components/scandidate/organization-onboard/all-employees/all-employees.component';
import { BGVViewComponent } from './components/bgv-view/bgv-view.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WhyScandidateComponent } from './components/why-scandidate/why-scandidate.component';
import { ForOrganizationComponent} from './components/for-organization/for-organization.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ScandidateReportComponent } from './components/scandidate-report/scandidate-report.component';
import { AppGuard } from '../app/admin/app.guard';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: 'add-organization', component: AddOrganizationComponent ,canActivate: [AppGuard]},
  { path: 'why-scandidate', component: WhyScandidateComponent,},
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'for-organization', component: ForOrganizationComponent},
   {path: 'about-us',component:AboutUsComponent},
   {path: 'contact-us', component: ContactUsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent ,canActivate: [AppGuard]},
  { path: 'organization-list', component: OrganizationListComponent, canActivate: [AppGuard]},
  { path: 'add-institution', component: AddInitutionComponent ,canActivate: [AppGuard]},
  { path: 'add-institution/:id', component: AddInitutionComponent ,canActivate: [AppGuard]},
  { path: 'add-appuser', component: AddAppuserComponent ,canActivate: [AppGuard]},
  { path: 'add-appuser/:id', component: AddAppuserComponent,canActivate: [AppGuard] },
  { path: 'user-profile', component: UserProfileComponent ,canActivate: [AppGuard]},
  { path: 'inistution-list', component: InsitutionalListComponent ,canActivate: [AppGuard]},
  { path: 'users-list', component: UsersListComponent ,canActivate: [AppGuard]},
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AppGuard]},
  { path: 'add-insitution-users', component: AddInsitutionalUserComponent ,canActivate: [AppGuard]},
  { path: 'add-organization/:id', component: AddOrganizationComponent,canActivate: [AppGuard] },
  { path: 'add-insitution-users/:id', component: AddInsitutionalUserComponent ,canActivate: [AppGuard]},
  { path: 'insitution-users-list', component: InsitutionalUserListComponent ,canActivate: [AppGuard]},
  { path: 'student-list', component: StudentListComponent ,canActivate: [AppGuard]},
  { path: 'add-student', component: AddStudentComponent ,canActivate: [AppGuard]},
  { path: 'csvUpload', component: StudentCsvUploadComponent,canActivate: [AppGuard] },
  { path: 'add-candidate', component: AddCandidateComponent ,canActivate: [AppGuard] },
  { path: 'candidate-list', component: CandidateListComponent ,canActivate: [AppGuard]},
  { path: 'orgnization-users-list', component: OrganizationUsersListComponent ,canActivate: [AppGuard]},
  { path: 'add-oppuser', component: AddOppuserComponent ,canActivate: [AppGuard]},
  { path: 'reset-password', component: ResetPasswordComponent ,canActivate: [AppGuard]},
  { path: 'add-student/:id', component: AddStudentComponent ,canActivate: [AppGuard]},
  { path: 'institutionDashboard', component: InstitutionDashboardComponent ,canActivate: [AppGuard]},
  { path: 'organizationDashboard', component: OrganizationDashboardComponent ,canActivate: [AppGuard]},
  { path: 'add-organizationuser/:id', component: AddOppuserComponent ,canActivate: [AppGuard]},
  { path: 'add-candidate/:id', component: AddCandidateComponent ,canActivate: [AppGuard]},
  { path: 'settings', component: ScandidateSettingsComponent ,canActivate: [AppGuard]},
  { path: 'BGV', component: BGVSearchComponent ,canActivate: [AppGuard]},
  { path: 'students', component: AllStudentsComponent ,canActivate: [AppGuard]},
  { path: 'employee', component: AllEmployeesComponent ,canActivate: [AppGuard]},
  { path: 'bgv-view/:id', component: BGVViewComponent ,canActivate: [AppGuard]},
  { path: 'scandidate-report/:id',component:ScandidateReportComponent ,canActivate: [AppGuard]},
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
