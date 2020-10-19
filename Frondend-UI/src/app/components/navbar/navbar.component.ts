import { Component, OnInit ,Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';
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

  constructor(private breakpointObserver: BreakpointObserver,private lService:LoginService,public router:Router) {}
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
    } else {
      this.insitutionadmin = false;
      this.appAdmin = false;
      this.organizationadmin = true;
      this.Logo = true;
      this.imageUrl=`${this.baseUrl}/public/user_avatar/${logo}`;
      this.adminLogo = false;
    }
    if((role == 'SCANDIDATE') && (subrole == 'ADMIN')) {
      this.profileImg = false;
    } else {
      this.profileImg = true;
    }
    
  }
  
  }
