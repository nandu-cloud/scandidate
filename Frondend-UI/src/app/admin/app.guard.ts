import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { StorageService} from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  isAuth:boolean=false;
  constructor(private login: LoginService,private _storage : StorageService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isAuth=this._storage.getSession('isAuthenticated') || false;
      if(this.isAuth){
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
  }
  
}
