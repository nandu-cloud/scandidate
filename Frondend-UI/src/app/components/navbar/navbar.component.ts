import { Component, OnInit ,Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';
import { instituteService } from 'src/app/services/institute.service';
import { addOrganizationService } from 'src/app/services/organization.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService, instituteService, addOrganizationService, StorageService]
})
export class NavbarComponent implements OnInit {
  openNav: void;
  public appAdmin :boolean ;
  baseUrl = environment.baseUrl;
  public insitutionadmin : boolean ;
  public organizationadmin : boolean ;
  public hrpartneradmin : boolean;
  public profileImg : boolean;
  public adminLogo : boolean;
  public Logo : boolean;
  public hrlogo : boolean;
  imageUrl: any = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private lService:LoginService,public router:Router,
    private appuserService:instituteService, private organizationService:addOrganizationService,public _sessionStorage: StorageService) {}
  ngOnInit(){
    let role = window.sessionStorage.getItem('role');
    let subrole = window.sessionStorage.getItem('subRole');
    let logo = window.sessionStorage.getItem('logo');
    if( role == 'SCANDIDATE'){
      this.appAdmin = true;
      this.insitutionadmin = false;
      this.organizationadmin = false;
      this.adminLogo = true;
      this.Logo = false;
    } else if( role == 'INSTITUTION') {
      this.insitutionadmin = true;
      this.appAdmin = false;
      this.organizationadmin = false;
      this.adminLogo = false;
      this.Logo = true;
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
      console.log(this.imageUrl);
      this.getInstution()
    } else if(role == 'ORGANIZATION'){
      this.insitutionadmin = false;
      this.appAdmin = false;
      this.organizationadmin = true;
      this.Logo = true;
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
      this.adminLogo = false;
      this.getOrganization()
    } else {
      // else if(role == 'HRPATNER'){
        this.hrpartneradmin = true;
        this.appAdmin = false;
        this.insitutionadmin = false;
        this.organizationadmin = false;
        this.hrlogo = true;
        this.adminLogo = false;
        this.Logo = false;
      // }
    }
    if((role == 'SCANDIDATE') && (subrole == 'ADMIN')) {
      this.profileImg = false;
    } else {
      this.profileImg = true;
    }
    
  }

  institueName:any;
  institutionLogo: any;
  orgName:any;
  instName:any;
  getInstution(){
    this.appuserService.editInstitute( localStorage.getItem('instutuinId')).subscribe(respObj => {
      this.institueName =respObj.data.instituteName
      this.institutionLogo = `${this.baseUrl}/public/institute_logo/${respObj.data.instituteLogo}`
      this.instName = respObj.data.instituteName;
      this._sessionStorage.setSession('instName',this.instName);
       })
  }
  getOrganization(){
    this.organizationService.editOrganization(localStorage.getItem('organizationId')).subscribe(respObj => {
      this.orgName = respObj.data.organizationName;
      this._sessionStorage.setSession('orgName',this.orgName);
      // this.institutionLogo = respObj.data.organisationLogo
      this.institueName = respObj.data.organizationName
      this.institutionLogo = `${this.baseUrl}/public/organization_logo/${respObj.data.organisationLogo}`
    })
  }
  logout(){
    sessionStorage.clear();
  }
  }
