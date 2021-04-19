import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  createContact(contact): Observable<any> {
    var contactUs: {
      'firstName': string,
      'lastName': string,
      'email': string,
      'phoneNumber': number,
      'designation': string,
      'organization': string,
      'enquiry': string
    } =
    {
      'firstName': contact.firstName,
      'lastName': contact.lastName,
      'email': contact.email,
      'phoneNumber': contact.phoneNumber,
      'designation': contact.designation,
      'organization': contact.organization,
      'enquiry': contact.enquiry
    };
    return this.http.post(this.baseUrl + '/api/enquiry/employee/savecontact', contactUs,
     {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
     }
    )
  }
}
