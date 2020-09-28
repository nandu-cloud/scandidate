import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ChartsModule } from 'ng2-charts';
import { from } from 'rxjs';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { OrganizationUserListComponent } from './components/organization/users/organization-user-list/organization-user-list.component';
import { AddOrganizationUserComponent } from './components/organization/users/add-organization-user/add-organization-user.component';
import { CandidateListComponent } from './components/organization/employees/candidate-list/candidate-list.component';

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
    OrganizationUserListComponent,
    AddOrganizationUserComponent,
    CandidateListComponent
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
    { provide: MatDialogRef,useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
