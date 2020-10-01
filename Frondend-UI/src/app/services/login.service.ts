import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  checkUserLogin(loginData): Observable<any> {
    var login: { 'email': string, 'password': string } = { 'email': loginData.email, 'password': loginData.password };
    return this.http.post(this.baseUrl + '/api/auth', login
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
 
  resetPassword(loginData): Observable<any> {
    let userId=window.sessionStorage.getItem('ID');
    var resetData: { 'newPassword': string, 'confirmPassword': string } = { 'newPassword': loginData.newPassword, 'confirmPassword': loginData.confirmPassword };
    return this.http.put(this.baseUrl + '/api/auth/passwordreset/'+userId, resetData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  emailVerification(emailData): Observable<any> {
    var email: { 'email': string,  } = { 'email': emailData.email };
    return this.http.put(this.baseUrl + '/api/auth/sendemailotp', email
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  otpVerification(emailVerify,otpData): Observable<any> {
    var otp: { 'otp': number, 'email':string } = { 'otp': otpData ,'email': emailVerify.email};
    return this.http.put(this.baseUrl + '/api/auth/verifyotp', otp
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  resetLoginPassword(email,otp,pwdData): Observable<any> {
    var resetData: { 'newPassword': string, 'confirmPassword': string , 'email': string , 'otp':number } = { 'newPassword': pwdData.newPassword, 'confirmPassword': pwdData.confirmPassword ,'email':email.email , 'otp':otp};
    return this.http.put(this.baseUrl + '/api/auth/loginpasswordreset', resetData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
}
