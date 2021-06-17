import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.baseUrl;
  empIdedit: number;
  empIdupdate: number;
  empIdSave : string;
  count : number =0;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.empIdupdate = params.id;
      this.empIdSave = params.id;
    });
   
  }


  addEmployee(empData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var EmployeeData: {
      'firstName': string, 'lastName': string, 'email': string, 'phoneNumber': string, 'dateOfJoining': string,
      'exitDate': string, 'professionalExperience': string, 'employeeId': string, 'role': string, 'department': string,
      'address': string, 'dateOfBirth': string, 'adharNumber': string, 'panNumber': string, 'selfDriven': number,
      'creativity': number, 'informalOrganizationSenseOfBelonging': number, 'initiative': number, 'workIndependenty': number, 'teamWork': number,
      'dealConstructivelyWithPressure': number, 'volume': number, 'quality': any, 'consistency': any, 'punctuality': number,
      'discipline': number, 'academicKnowledge': number, 'productKnowledge', 'industryKnowledge': number, 'communicationSkills': number,
      'addedById': string, 'organisationId': string, 'organizationName': string, 'awards': any, 'city': string, 'state': string,
      'pinCode': string, 'landMark': string, 'building': any, 'stakeholder': any, 'discrepancyDocuments': any,
      'compliencyDiscrepancy': any, 'warning': any, 'showCausedIssue': any, 'suspension': any, 'termination': any,
      'keySkills': string, 'empThrive': string, 'inLeadership': string,'otherInfo': string,'rehireAgain': string, 'reasonForSerperation': any,
      'originalFilename': string, 'status': boolean
    } =
    {
      'firstName': empData.firstName, 'lastName': empData.lastName, 'email': empData.email, 'phoneNumber': empData.phoneNumber, 'dateOfJoining': empData.dateOfJoining,
      'exitDate': empData.exitDate, 'professionalExperience': empData.professionalExperience, 'employeeId': empData.employeeId, 'role': empData.role, 'department': empData.department,
      'address': empData.address, 'dateOfBirth': empData.dateOfBirth == "" ? "" : empData.dateOfBirth, 'adharNumber': empData.adharNumber== "" ? "": empData.adharNumber, 'panNumber': empData.panNumber, 'selfDriven': empData.selfDriven,
      'creativity': empData.creativity, 'informalOrganizationSenseOfBelonging': empData.informalOrganizationSenseOfBelonging, 'initiative': empData.initiative, 'workIndependenty': empData.workIndependenty, 'teamWork': empData.teamWork,
      'dealConstructivelyWithPressure': empData.dealConstructivelyWithPressure, 'volume': empData.volume, 'quality': empData.quality, 'consistency': empData.consistency, 'building': empData.building, 'stakeholder': empData.stakeholder, 'punctuality': empData.punctuality, 'organizationName': empData.organizationName,
      'discipline': empData.discipline, 'academicKnowledge': empData.academicKnowledge, 'productKnowledge': empData.productKnowledge, 'industryKnowledge': empData.industryKnowledge, 'communicationSkills': empData.communicationSkills,
      'organisationId': organizationId, 'addedById': id, 'awards': empData.awards,
      'city': empData.city, 'state': empData.state, 'pinCode': empData.pinCode, 'landMark': empData.landMark,
      'discrepancyDocuments': empData.discrepancyDocuments, 'compliencyDiscrepancy': empData.compliencyDiscrepancy,
      'warning': empData.warning, 'showCausedIssue': empData.showCausedIssue, 'suspension': empData.suspension,
      'termination': empData.termination, 'keySkills': empData.keySkills, 'empThrive' : empData.empThrive, 'inLeadership': empData.inLeadership,'otherInfo': empData.otherInfo,
      'rehireAgain': empData.rehireAgain, 'reasonForSerperation': empData.reasonForSerperation,
      'originalFilename': empData.originalFilename,'status':true
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

  public getEmployeeData(): Observable<any> {
    var organizationId = window.sessionStorage.getItem('organizationId');
    return this.http.get(this.baseUrl + '/api/organisation/operational/getEmployee/' + organizationId);
  }

  editEmployee(editEmpData): Observable<any> {
    return this.http.get(this.baseUrl + '/api/organisation/operational/' + editEmpData);
  }
  saveAsEmployee(saveEmpData): Observable<any>{
    return this.http.get(this.baseUrl + '/api/organisation/operational/inprogress/getEmployee/' + saveEmpData)
  }

  updateEmployee(empupdateData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var EmployeeData: {
      'firstName': string, 'lastName': string, 'email': string, 'phoneNumber': string, 'dateOfJoining': string,
      'exitDate': string, 'professionalExperience': string, 'employeeId': string, 'role': string, 'department': string,
      'address': string, 'dateOfBirth': string, 'adharNumber': string, 'panNumber': string, 'selfDriven': number,
      'creativity': number, 'informalOrganizationSenseOfBelonging': number, 'initiative': number, 'workIndependenty': number, 'teamWork': number,
      'dealConstructivelyWithPressure': number, 'volume': number, 'quality': number, 'consistency': any, 'punctuality': number,
      'discipline': number, 'academicKnowledge': number, 'productKnowledge', 'industryKnowledge': number, 'communicationSkills': number,
      'addedById': string, 'organisationId': string, 'organizationName': string, 'awards': any,
      'city': string, 'state': string, 'keySkills': string, 'rehireAgain': string,
      'pinCode': string, 'landMark': string, 'discrepancyDocuments': any, 'empThrive': string, 'inLeadership': string,'otherInfo': string,
      'compliencyDiscrepancy': any, 'warning': any, 'showCausedIssue': any, 'suspension': any, 'termination': any, 'reasonForSerperation': any,
       'building': any, 'stakeholder': any,
       'originalFilename': string,'status': boolean
    } =
    {
      'firstName': empupdateData.firstName, 'lastName': empupdateData.lastName, 'email': empupdateData.email, 'phoneNumber': empupdateData.phoneNumber, 'dateOfJoining': empupdateData.dateOfJoining,
      'exitDate': empupdateData.exitDate, 'professionalExperience': empupdateData.professionalExperience, 'employeeId': empupdateData.employeeId, 'role': empupdateData.role, 'department': empupdateData.department,
      'address': empupdateData.address, 'dateOfBirth': empupdateData.dateOfBirth, 'adharNumber': empupdateData.adharNumber==""? "": empupdateData.adharNumber, 'panNumber': empupdateData.panNumber, 'selfDriven': empupdateData.selfDriven,
      'creativity': empupdateData.creativity, 'informalOrganizationSenseOfBelonging': empupdateData.informalOrganizationSenseOfBelonging, 'initiative': empupdateData.initiative, 'workIndependenty': empupdateData.workIndependenty, 'teamWork': empupdateData.teamWork,
      'dealConstructivelyWithPressure': empupdateData.dealConstructivelyWithPressure, 'volume': empupdateData.volume, 'quality': empupdateData.quality, 'consistency': empupdateData.consistency, 'punctuality': empupdateData.punctuality,
      'discipline': empupdateData.discipline, 'academicKnowledge': empupdateData.academicKnowledge, 'productKnowledge': empupdateData.productKnowledge, 'industryKnowledge': empupdateData.industryKnowledge, 'communicationSkills': empupdateData.communicationSkills, 'organizationName': empupdateData.organizationName,
      'organisationId': organizationId, 'addedById': id, 'awards': empupdateData.awards,
      'city': empupdateData.city, 'state': empupdateData.state, 'landMark': empupdateData.landMark, 'pinCode': empupdateData.pinCode,
      'discrepancyDocuments': empupdateData.discrepancyDocuments, 'compliencyDiscrepancy': empupdateData.compliencyDiscrepancy,
      'warning': empupdateData.warning, 'showCausedIssue': empupdateData.showCausedIssue, 'suspension': empupdateData.suspension,
      'termination': empupdateData.termination, 'rehireAgain': empupdateData.rehireAgain, 'keySkills': empupdateData.keySkills,
      'empThrive' : empupdateData.empThrive, 'inLeadership': empupdateData.inLeadership,'otherInfo': empupdateData.otherInfo,
      'reasonForSerperation': empupdateData.reasonForSerperation, 'building': empupdateData.building,
       'stakeholder': empupdateData.stakeholder,
       'originalFilename': empupdateData.originalFilename,'status': true
    };
    return this.http.put(this.baseUrl + '/api/organisation/operational/' + this.empIdupdate, EmployeeData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }

  savenowEmployee(empData): Observable<any> {
    if(this.empIdSave){
      this.empIdSave = this.empIdSave;
    } else {
      this.empIdSave = window.sessionStorage.getItem('organizationId');
    }
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('organizationId');
    var EmployeeData: {
      'firstName': string, 'lastName': string, 'email': string, 'phoneNumber': string, 'dateOfJoining': string,
      'exitDate': string, 'professionalExperience': string, 'employeeId': string, 'role': string, 'department': string,
      'address': string, 'dateOfBirth': string, 'adharNumber': string, 'panNumber': string, 'selfDriven': number,
      'creativity': number, 'informalOrganizationSenseOfBelonging': number, 'initiative': number, 'workIndependenty': number, 'teamWork': number,
      'dealConstructivelyWithPressure': number, 'volume': number, 'quality': any, 'consistency': any, 'punctuality': number,
      'discipline': number, 'academicKnowledge': number, 'productKnowledge', 'industryKnowledge': number, 'communicationSkills': number,
      'addedById': string, 'organisationId': string, 'organizationName': string, 'awards': any, 'city': string, 'state': string,
      'pinCode': string, 'landMark': string, 'building': any, 'stakeholder': any, 'discrepancyDocuments': any,
      'compliencyDiscrepancy': any, 'warning': any, 'showCausedIssue': any, 'suspension': any, 'termination': any,
      'keySkills': string, 'empThrive': string, 'inLeadership': string,'otherInfo': string,'rehireAgain': string, 'reasonForSerperation': any,
      'originalFilename': string, 'status': boolean
    } =
    {
      'firstName': empData.firstName == "" ? "" : empData.firstName, 'lastName': empData.lastName == "" ? null : empData.lastName, 'email': empData.email == "" ? null : empData.email, 
      'phoneNumber': empData.phoneNumber == "" ? "" : empData.phoneNumber, 'dateOfJoining': empData.dateOfJoining == "" ? null : empData.dateOfJoining,'exitDate': empData.exitDate == "" ? null : empData.exitDate, 
      'professionalExperience': empData.professionalExperience == "" ? null : empData.professionalExperience, 'employeeId': empData.employeeId == "" ? null : empData.employeeId, 'role': empData.role == "" ? null : empData.role,
      'department': empData.department == "" ? null : empData.department,'address': empData.address == "" ? null : empData.address, 'dateOfBirth': empData.dateOfBirth == "" ? "" : empData.dateOfBirth, 
      'adharNumber': empData.adharNumber == "" ? "" : empData.adharNumber, 'panNumber': empData.panNumber == "" ? null : empData.panNumber, 'selfDriven': empData.selfDriven == "" ? null : empData.selfDriven,
      'creativity': empData.creativity == "" ? null : empData.creativity, 'informalOrganizationSenseOfBelonging': empData.informalOrganizationSenseOfBelonging == "" ? null : empData.informalOrganizationSenseOfBelonging, 'initiative': empData.initiative == "" ? null : empData.initiative, 
      'workIndependenty': empData.workIndependenty == "" ? null : empData.workIndependenty, 'teamWork': empData.teamWork == "" ? null : empData.teamWork,
      'dealConstructivelyWithPressure': empData.dealConstructivelyWithPressure == "" ? null : empData.dealConstructivelyWithPressure, 'volume': empData.volume == "" ? null : empData.volume, 'quality': empData.quality == "" ? null : empData.quality, 'consistency': empData.consistency == "" ? null : empData.consistency, 
      'building': empData.building == "" ? null : empData.building, 'stakeholder': empData.stakeholder == "" ? null : empData.stakeholder, 'punctuality': empData.punctuality == "" ? null : empData.punctuality, 'organizationName': empData.organizationName == "" ? null : empData.organizationName,
      'discipline': empData.discipline == "" ? null : empData.discipline, 'academicKnowledge': empData.academicKnowledge == "" ? null : empData.academicKnowledge, 'productKnowledge': empData.productKnowledge == "" ? null : empData.productKnowledge, 'industryKnowledge': empData.industryKnowledge == "" ? null : empData.industryKnowledge, 'communicationSkills': empData.communicationSkills == "" ? null : empData.communicationSkills,
      'organisationId': organizationId , 'addedById': id, 'awards': empData.awards == "" ? null : empData.awards,
      'city': empData.city == "" ? null : empData.city, 'state': empData.state == "" ? null : empData.state, 'pinCode': empData.pinCode == "" ? null : empData.pinCode, 'landMark': empData.landMark == "" ? null : empData.landMark,
      'discrepancyDocuments': empData.discrepancyDocuments == "" ? null : empData.discrepancyDocuments, 'compliencyDiscrepancy': empData.compliencyDiscrepancy == "" ? null : empData.compliencyDiscrepancy,
      'warning': empData.warning == "" ? null : empData.warning, 'showCausedIssue': empData.showCausedIssue == "" ? null : empData.showCausedIssue, 'suspension': empData.suspension == "" ? null : empData.suspension,
      'termination': empData.termination == "" ? null : empData.termination, 'keySkills': empData.keySkills == "" ? null : empData.keySkills, 'empThrive' : empData.empThrive == "" ? null : empData.empThrive, 'inLeadership': empData.inLeadership == "" ? null : empData.inLeadership,'otherInfo': empData.otherInfo == "" ? null : empData.otherInfo,
      'rehireAgain': empData.rehireAgain == "" ? null : empData.rehireAgain, 'reasonForSerperation': empData.reasonForSerperation == "" ? null : empData.reasonForSerperation,
      'originalFilename': empData.originalFilename == "" ? null : empData.originalFilename,'status':false
    };
    return this.http.post(this.baseUrl + '/api/organisation/operational/inprogress/saveNow/' +this.empIdSave, EmployeeData
      , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  postIssuesFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('document', fileToUpload);
    return this.http.post(this.baseUrl + '/api/organisation/operational/uploads', formData
    );
  }
  downloadFile(employeedocumentlink): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/api/organisation/operational/downloadfile/${employeedocumentlink}`, { responseType: 'blob' });
  }

  // get line manager employees
  public getLinemanagerEmployeeData(id): Observable<any> {
    return this.http.get(this.baseUrl + '/api/organisation/lineManager/show/assignedEmployee/' + id);
  }

  public duplicateEntry(value): Observable<any> {
    var organizationId = window.sessionStorage.getItem('organizationId');
    var orgName = window.sessionStorage.getItem('orgName');
    var EmpData: {
      'firstName': string, 'lastName': string, 'email': string, 'phoneNumber': string, 'dateOfJoining': string,
      'exitDate': string, 'adharNumber': string, 'organisationId': string, 'organizationName': string
    }
    =
    {
      'firstName': value.firstName,
      'lastName': value.lastName,
      'email': value.email, 
      'phoneNumber': value.phoneNumber,
      'dateOfJoining': value.dateOfJoining,
      'exitDate': value.exitDate,
      'adharNumber': value.adharNumber,
      'organisationId': organizationId, 'organizationName': orgName
    }
   return this.http.post(this.baseUrl + '/api/organisation/operational/check/duplicateemployeerecord', EmpData
   ) 
  }
}