import { Component, OnInit ,Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { from, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginService]
})
export class NavbarComponent implements OnInit {
  openNav: void;
  public appAdmin :boolean ;
  public insitutionadmin : boolean ;
  public organizationadmin : boolean ;
  public profileImg : boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private lService:LoginService,public router:Router) {}
  ngOnInit(){
    let role = window.sessionStorage.getItem('role');
    let subrole = window.sessionStorage.getItem('subRole');
    if( role == 'SCANDIDATE'){
      this.appAdmin = true;
      this.insitutionadmin = false;
      this.organizationadmin = false;
    } else if( role == 'INSTITUTION') {
      this.insitutionadmin = true;
      this.appAdmin = false;
      this.organizationadmin = false;
    } else {
      this.insitutionadmin = false;
      this.appAdmin = false;
      this.organizationadmin = true;
    }
    if((role == 'SCANDIDATE') && (subrole == 'ADMIN')) {
      this.profileImg = false;
    } else {
      this.profileImg = true;
    }
    
  }
  }
