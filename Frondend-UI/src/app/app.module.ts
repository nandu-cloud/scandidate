import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ChartsModule } from 'ng2-charts';
import { from } from 'rxjs';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AddOrganizationComponent } from './components/scandidate/organization-onboard/add-organization/add-organization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HttpClient ,HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddInitutionComponent } from './components/scandidate/institute-onboard/add-initution/add-initution.component';
import { AddAppuserComponent } from './components/scandidate/users-onboard/add-appuser/add-appuser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OrganizationListComponent } from './components/scandidate/organization-onboard/organization-list/organization-list.component';
import { InsitutionalListComponent } from './components/scandidate/institute-onboard/insitutional-list/insitutional-list.component';
import { UsersListComponent } from './components/scandidate/users-onboard/users-list/users-list.component';
import {MatDialogModule , MatDialogRef} from '@angular/material/dialog';
import { MAT_DATE_LOCALE, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddInsitutionalUserComponent } from './components/institution/users/add-insitutional-user/add-insitutional-user.component';
import { InsitutionalUserListComponent } from './components/institution/users/insitutional-user-list/insitutional-user-list.component';
import { StudentCsvUploadComponent } from './components/institution/students/student-csv-upload/student-csv-upload.component';
import { StudentListComponent } from './components/institution/students/student-list/student-list.component';
import { AddStudentComponent } from './components/institution/students/add-student/add-student.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TokenInterceptor } from './services/interceptor.service';
import { AddCandidateComponent } from './components/organization/employees/add-candidate/add-candidate.component';
import { CandidateListComponent } from './components/organization/employees/candidate-list/candidate-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { OrganizationUsersListComponent } from './components/organization/users/users-list/organization-users-list/organization-users-list.component';
import { AddOppuserComponent } from './components/organization/users/add-oppuser/add-oppuser/add-oppuser.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';

import {InstitutionDashboardComponent} from './components/instituteDashboard/institutionDashboard.component';
import {OrganizationDashboardComponent} from './components/organizationDashboard/organizationDashboard.component';
import { ScandidateSettingsComponent } from './components/scandidate/scandidate-settings/scandidate-settings.component';
import { BGVSearchComponent } from './components/bgv-search/bgv-search.component';
import { AllStudentsComponent } from './components/scandidate/institute-onboard/all-students/all-students.component';
import { AllEmployeesComponent } from './components/scandidate/organization-onboard/all-employees/all-employees.component';
import { BGVViewComponent } from './components/bgv-view/bgv-view.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { WorkEthicDialogComponent } from './components/work-ethic-dialog/work-ethic-dialog.component';
import { MeritQualityComponent } from './components/merit-quality/merit-quality.component';
import { RecognitionComponent } from './components/recognition/recognition.component';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { IssuesComponent } from './components/issues/issues.component';
import { WhyScandidateComponent } from './components/why-scandidate/why-scandidate.component';
import { ForOrganizationComponent } from './components/for-organization/for-organization.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ScandidateReportComponent } from './components/scandidate-report/scandidate-report.component';
import { AppGuard } from "../app/admin/app.guard";
import { StorageService } from "./services/storage.service";
import { SendBgvReportDialogComponent } from './components/send-bgv-report-dialog/send-bgv-report-dialog.component';
import { ForwardToLinemanagerDialogComponent } from './components/organization/employees/forward-to-linemanager-dialog/forward-to-linemanager-dialog.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AssignToLinemanagerDialogComponent } from './components/organization/employees/assign-to-linemanager-dialog/assign-to-linemanager-dialog.component';
import { AddHrPartnerComponent } from './components/scandidate/hr-partner-onboard/add-hr-partner/add-hr-partner.component';
import { HrPartnerListComponent } from './components/scandidate/hr-partner-onboard/hr-partner-list/hr-partner-list.component';
import { AddEmployeeComponent } from './components/hr-partner/employees/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/hr-partner/employees/employee-list/employee-list.component';
import { UserListComponent } from './components/hr-partner/users/user-list/user-list.component';
import { AddHroppuserComponent } from './components/hr-partner/users/add-hroppuser/add-hroppuser.component';
import { HrcandidateListComponent } from './components/hr-partner/candidate/hrcandidate-list/hrcandidate-list.component';
import { AddHrcandidateComponent } from './components/hr-partner/candidate/add-hrcandidate/add-hrcandidate.component';
import { HrpartnerdashboardComponent } from './components/hr-partner/hrpartnerdashboard/hrpartnerdashboard/hrpartnerdashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddOrganizationComponent,
    NavbarComponent,
    AddInitutionComponent,
    AddAppuserComponent,
    UserProfileComponent,
    OrganizationListComponent,
    InsitutionalListComponent,
    UsersListComponent,
    DashboardComponent,
    AddInsitutionalUserComponent,
    InsitutionalUserListComponent,
    StudentListComponent,
    AddStudentComponent,
    StudentCsvUploadComponent,
    AddCandidateComponent,
    CandidateListComponent,
    OrganizationUsersListComponent,
    AddOppuserComponent,
    ResetPasswordComponent,
    InstitutionDashboardComponent,
    OrganizationDashboardComponent,
    ScandidateSettingsComponent,
    BGVSearchComponent,
    AllStudentsComponent,
    BGVViewComponent,
    AllEmployeesComponent,
    LandingPageComponent,
    WorkEthicDialogComponent,
    MeritQualityComponent,
    RecognitionComponent,
    LeadershipComponent,
    IssuesComponent,
    WhyScandidateComponent,
    ForOrganizationComponent,
    AboutUsComponent,
    ScandidateReportComponent,
    SendBgvReportDialogComponent,
    ForwardToLinemanagerDialogComponent,
    ContactUsComponent,
    AssignToLinemanagerDialogComponent,
    AddHrPartnerComponent,
    HrPartnerListComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    UserListComponent,
    AddHroppuserComponent,
    HrcandidateListComponent,
    AddHrcandidateComponent,
    HrpartnerdashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ChartsModule,
    FileUploadModule
  ],
  providers: [
    { provide: AppGuard},
    { provide: StorageService},
    { provide: MatDialogRef,useValue: {}},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
