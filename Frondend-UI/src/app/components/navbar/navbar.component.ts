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
  providers: [LoginService]
})
export class NavbarComponent implements OnInit {
  openNav: void;
  public appAdmin :boolean ;
  baseUrl = environment.baseUrl;
  public insitutionadmin : boolean ;
  public organizationadmin : boolean ;
  public profileImg : boolean;
  public adminLogo : boolean;
  public Logo : boolean;
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
    } else {
      this.insitutionadmin = false;
      this.appAdmin = false;
      this.organizationadmin = true;
      this.Logo = true;
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
      this.adminLogo = false;
      this.getOrganization()
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
  getInstution(){
    this.appuserService.editInstitute( localStorage.getItem('instutuinId')).subscribe(respObj => {
      this.institueName =respObj.data.instituteName
      this.institutionLogo = respObj.data.instituteLogo
    })
  }
  getOrganization(){
    this.organizationService.editOrganization(localStorage.getItem('organizationId')).subscribe(respObj => {
      this.orgName = respObj.data.organizationName;
      this._sessionStorage.setSession('orgName',this.orgName);
      this.institutionLogo = respObj.data.organisationLogo
    })
  }
  }
