import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ChartsModule } from 'ng2-charts';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddInitutionComponent } from './add-initution/add-initution.component';
import { AddAppuserComponent } from './add-appuser/add-appuser.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { InsitutionalListComponent } from './insitutional-list/insitutional-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import {MatDialogModule , MatDialogRef} from '@angular/material/dialog';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddInsitutionalUserComponent } from './add-insitutional-user/add-insitutional-user.component';
import { InsitutionalUserListComponent } from './insitutional-user-list/insitutional-user-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentListComponent } from './student-list/student-list.component';
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
    StudentListComponent
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
    ChartsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
