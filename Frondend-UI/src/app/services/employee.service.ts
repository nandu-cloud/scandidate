import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.baseUrl;
  empIdedit: number;
  empIdupdate:number;
  constructor(private http: HttpClient,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.empIdupdate = params.id;
    });
   }

   addEmployee(empData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var EmployeeData: {'firstName': string, 'lastName' : string,'email' : string,'phoneNumber' : number,'dateOfJoining':string,
                  'exitDate':string, 'professionalExperience': number,'employeeId':string,'role':string,'department':string,
                  'address':string, 'dateOfBirth': string,'adharNumber': string,'panNumber': string,'selfDriven': number,
                  'creativity': number,'informalOrganizationSenseOfBelonging': number,'initiative': number,'workIndependenty' : number,'teamWork': number,
                  'dealConstructivelyWithPressure': number,'volume': number,'quality': number,'consistency': number,'punctuality': number,
                  'discipline': number,'academicKnowledge':number,'productKnowledge','industryKnowledge': number,'communicationSkills': number,
                  'addedById' : string, 'organisationId': string
                } =
                { 'firstName' : empData.firstName,'lastName' : empData.lastName,'email' : empData.email,'phoneNumber': empData.phoneNumber,'dateOfJoining':empData.dateOfJoining,
                  'exitDate': empData.exitDate,'professionalExperience':empData.professionalExperience, 'employeeId':empData.employeeId,'role':empData.role,'department':empData.department,
                  'address': empData.address,'dateOfBirth':empData.dateOfBirth,'adharNumber':empData.adharNumber,'panNumber': empData.panNumber,'selfDriven':empData.selfDriven,
                  'creativity': empData.creativity,'informalOrganizationSenseOfBelonging': empData.informalOrganizationSenseOfBelonging,'initiative':empData.initiative,'workIndependenty':empData.workIndependenty,'teamWork': empData.teamWork,
                  'dealConstructivelyWithPressure': empData.dealConstructivelyWithPressure,'volume': empData.volume , 'quality': empData.quality, 'consistency': empData.consistency,'punctuality': empData.punctuality,
                  'discipline' : empData.discipline,'academicKnowledge':empData.academicKnowledge, 'productKnowledge': empData.productKnowledge, 'industryKnowledge': empData.industryKnowledge,'communicationSkills': empData.communicationSkills,
                  'organisationId': organizationId,'addedById': id
                  
                };
    return this.http.post(this.baseUrl + '/api/organisation/operational', EmployeeData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

  public getEmployeeData() : Observable<any> {
    return this.http.get(this.baseUrl + '/api/organisation/operational');
  }

  editEmployee(editEmpData) : Observable<any> {
    return this.http.get(this.baseUrl + '/api/organisation/operational/' +editEmpData );
  }

  updateEmployee(empupdateData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var EmployeeData: {'firstName': string, 'lastName' : string,'email' : string,'phoneNumber' : number,'dateOfJoining':string,
                  'exitDate':string, 'professionalExperience': number,'employeeId':string,'role':string,'department':string,
                  'address':string, 'dateOfBirth': string,'adharNumber': string,'panNumber': string,'selfDriven': number,
                  'creativity': number,'informalOrganizationSenseOfBelonging': number,'initiative': number,'workIndependenty' : number,'teamWork': number,
                  'dealConstructivelyWithPressure': number,'volume': number,'quality': number,'consistency': number,'punctuality': number,
                  'discipline': number,'academicKnowledge':number,'productKnowledge','industryKnowledge': number,'communicationSkills': number,
                  'addedById' : string, 'organisationId': string
                } =
                { 'firstName' : empupdateData.firstName,'lastName' : empupdateData.lastName,'email' : empupdateData.email,'phoneNumber': empupdateData.phoneNumber,'dateOfJoining':empupdateData.dateOfJoining,
                  'exitDate': empupdateData.exitDate,'professionalExperience':empupdateData.professionalExperience, 'employeeId':empupdateData.employeeId,'role':empupdateData.role,'department':empupdateData.department,
                  'address': empupdateData.address,'dateOfBirth':empupdateData.dateOfBirth,'adharNumber':empupdateData.adharNumber,'panNumber': empupdateData.panNumber,'selfDriven':empupdateData.selfDriven,
                  'creativity': empupdateData.creativity,'informalOrganizationSenseOfBelonging': empupdateData.informalOrganizationSenseOfBelonging,'initiative':empupdateData.initiative,'workIndependenty':empupdateData.workIndependenty,'teamWork': empupdateData.teamWork,
                  'dealConstructivelyWithPressure': empupdateData.dealConstructivelyWithPressure,'volume': empupdateData.volume , 'quality': empupdateData.quality, 'consistency': empupdateData.consistency,'punctuality': empupdateData.punctuality,
                  'discipline' : empupdateData.discipline,'academicKnowledge':empupdateData.academicKnowledge, 'productKnowledge': empupdateData.productKnowledge, 'industryKnowledge': empupdateData.industryKnowledge,'communicationSkills': empupdateData.communicationSkills,
                  'organisationId': organizationId,'addedById': id
                  
                };
    return this.http.put(this.baseUrl + '/api/organisation/operational/' +this.empIdupdate, EmployeeData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
}