import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExEmployeeService {
  baseUrl = environment.baseUrl;
  empIdedit: number;
  empIdupdate: number;
  empIdSave : string;
  userIdupdate;
  index;
  count : number =0;
  constructor(private http: HttpClient,
     private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.userIdupdate = params.id;
    });
      }

      // get employee
   public getEmployeeData(): Observable<any> {
        var organizationId = window.sessionStorage.getItem('hrorganisationId');
        return this.http.get(this.baseUrl + '/api/organisation/operational/getEmployee/' + organizationId);
      }  

    savenowEmployee(empData): Observable<any> {
    if(this.empIdSave){
      this.empIdSave = this.empIdSave;
    } else {
      this.empIdSave = window.sessionStorage.getItem('hrorganisationId');
    }
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('hrorganisationId');
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

  addExEmployee(empData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('hrorganisationId');
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
  // addExEmployee(empData): Observable<any> {
  //   var id = window.sessionStorage.getItem('ID');
  //   var hrorganisationId = window.sessionStorage.getItem('hrorganisationId');
  //   var EmployeeData: {
  //     'firstName': string, 'lastName': string, 'email': string, 'phoneNumber': string, 'dateOfJoining': string,
  //     'exitDate': string, 'professionalExperience': string, 'employeeId': string, 'role': string, 'department': string,
  //     'address': string, 'dateOfBirth': string, 'adharNumber': string, 'panNumber': string, 'selfDriven': number,
  //     'creativity': number, 'informalOrganizationSenseOfBelonging': number, 'initiative': number, 'workIndependenty': number, 'teamWork': number,
  //     'dealConstructivelyWithPressure': number, 'volume': number, 'quality': any, 'consistency': any, 'punctuality': number,
  //     'discipline': number, 'academicKnowledge': number, 'productKnowledge', 'industryKnowledge': number, 'communicationSkills': number,
  //     'addedById': string, 'organisationId': string, 'organizationName': string, 'awards': any, 'city': string, 'state': string,
  //     'pinCode': string, 'landMark': string, 'building': any, 'stakeholder': any, 'discrepancyDocuments': any,
  //     'compliencyDiscrepancy': any, 'warning': any, 'showCausedIssue': any, 'suspension': any, 'termination': any,
  //     'keySkills': string, 'empThrive': string, 'inLeadership': string,'otherInfo': string,'rehireAgain': string, 'reasonForSerperation': any,
  //     'originalFilename': string, 'status': boolean
  //   } =
  //   {
  //     'firstName': empData.firstName, 'lastName': empData.lastName, 'email': empData.email, 'phoneNumber': empData.phoneNumber, 'dateOfJoining': empData.dateOfJoining,
  //     'exitDate': empData.exitDate, 'professionalExperience': empData.professionalExperience, 'employeeId': empData.employeeId, 'role': empData.role, 'department': empData.department,
  //     'address': empData.address, 'dateOfBirth': empData.dateOfBirth == "" ? "" : empData.dateOfBirth, 'adharNumber': empData.adharNumber== "" ? "": empData.adharNumber, 'panNumber': empData.panNumber, 'selfDriven': empData.selfDriven,
  //     'creativity': empData.creativity, 'informalOrganizationSenseOfBelonging': empData.informalOrganizationSenseOfBelonging, 'initiative': empData.initiative, 'workIndependenty': empData.workIndependenty, 'teamWork': empData.teamWork,
  //     'dealConstructivelyWithPressure': empData.dealConstructivelyWithPressure, 'volume': empData.volume, 'quality': empData.quality, 'consistency': empData.consistency, 'building': empData.building, 'stakeholder': empData.stakeholder, 'punctuality': empData.punctuality, 'organizationName': empData.organizationName,
  //     'discipline': empData.discipline, 'academicKnowledge': empData.academicKnowledge, 'productKnowledge': empData.productKnowledge, 'industryKnowledge': empData.industryKnowledge, 'communicationSkills': empData.communicationSkills,
  //     'organisationId': hrorganisationId, 'addedById': id, 'awards': empData.awards,
  //     'city': empData.city, 'state': empData.state, 'pinCode': empData.pinCode, 'landMark': empData.landMark,
  //     'discrepancyDocuments': empData.discrepancyDocuments, 'compliencyDiscrepancy': empData.compliencyDiscrepancy,
  //     'warning': empData.warning, 'showCausedIssue': empData.showCausedIssue, 'suspension': empData.suspension,
  //     'termination': empData.termination, 'keySkills': empData.keySkills, 'empThrive' : empData.empThrive, 'inLeadership': empData.inLeadership,'otherInfo': empData.otherInfo,
  //     'rehireAgain': empData.rehireAgain, 'reasonForSerperation': empData.reasonForSerperation,
  //     'originalFilename': empData.originalFilename,'status':true
  //   };
  //   return this.http.post(this.baseUrl + '/api/hrpartner/employee/', EmployeeData
  //     , {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*'
  //       })
  //     }
  //   );
  // }

  //Create user
  
  updateEmployee(empupdateData): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('hrorganisationId');
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

  createbgvreport (id) {
    var organizationId = window.sessionStorage.getItem('hrorganisationId');
    return this.http.get(`${this.baseUrl}/api/scandidate/bgvsearch/scandidatereport/bgvreportemail/${id}/${organizationId}`);
  }

  createUser(createUser): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var hrorganisationId = window.sessionStorage.getItem('hrorganisationId');
    var create: { 'firstName': string,
         'lastName': string,
         'role': string,
         'subRole': string,
         'email': string,
         'dateOfBirth': Date,
         'phoneNumber': number,
         'hrorganisationId':string,
         'workstation': string,
         'status': boolean,
         'onboardedById' : string
        } =
     { 'firstName': createUser.firstName,
        'lastName': createUser.lastName,
        'role': 'AGENCY',
        'subRole': createUser.subRole,
        'email': createUser.email,
        'dateOfBirth': createUser.dateOfBirth,
        'phoneNumber': createUser.phoneNumber,
        'hrorganisationId': hrorganisationId,
        'workstation': createUser.workstation,
        'onboardedById' : id,
        'status':true,
     };

    return this.http.post(this.baseUrl + '/api/hrpartner/addUser', create,
     {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    );
}

  // user get list
  public getOrganizationUserList() : Observable<any> {
    var hrorgId = window.sessionStorage.getItem('hrorganisationId');
    return this.http.get(this.baseUrl + '/api/hrpartner/addUser/' + hrorgId);
  }

  //user edit by ID

  editOrganizationUser(editOrgUser) : Observable<any> {
    return this.http.get(this.baseUrl + '/api/hrpartner/addUser/oppsUser/' +editOrgUser );
  }

  // update user
  updateUser(updateUser): Observable<any> {
    var id = window.sessionStorage.getItem('ID');
    var hrorganisationId = window.sessionStorage.getItem('hrorganisationId');
    var update: { 'firstName': string, 'lastName': string, 'role': string, 'subRole': string, 'email': string, 'dateOfBirth': Date, 'phoneNumber': number,'hrorganisationId':string, 'workstation': string, 'status': boolean, 'onboardedById' : string} =
     { 'firstName': updateUser.firstName,
        'lastName': updateUser.lastName,
        'role': 'AGENCY',
        'subRole': updateUser.subRole,
        'email': updateUser.email,
        'dateOfBirth': updateUser.dateOfBirth,
        'phoneNumber': updateUser.phoneNumber,
        'hrorganisationId': hrorganisationId,
        'workstation': updateUser.workstation,
        'onboardedById' : id,
        'status':updateUser.status,
     };
  
    return this.http.put(this.baseUrl + '/api/hrpartner/addUser/oppsUser/' +this.userIdupdate, update,
     {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    );
  }


  // add candidate
  addcandidate(empData): Observable<any> {
    console.log(empData)
    var id = window.sessionStorage.getItem('ID');
    var organizationId = window.sessionStorage.getItem('hrorganisationId');
    // {'firstName': string}
    let bioobjj={
          'firstName': empData.firstName,
          'lastName': empData.lastName,
          'email': empData.email,
          'phoneNumber': empData.phoneNumber,
          'dateOfBirth': empData.dateOfBirth == "" ? "" : empData.dateOfBirth,
          'adharNumber': empData.adharNumber== "" ? "": empData.adharNumber,
          'panNumber': empData.panNumber,'city': empData.city, 'state': empData.state,
          'pinCode': empData.pinCode,
          'address': empData.address, 'landMark': empData.landMark,
          'hrorganisationId': organizationId, 'addedById': id 
    }

    let cavArr=[]

    empData.candidate.forEach(element => {
      cavArr.push({
        "organizationName": element.organizationName,
        "organiationLocation": element.organiationLocation,
          "feedbackProviderName": element.feedbackProviderName,
          "feedbackProviderDesignation": element.feedbackProviderDesignation,
          "feedbackProviderRelationship": element.feedbackProviderRelationship,
          "feedbackProviderEmail": element.feedbackProviderEmail,
          "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
          // "nameofFeedbackProvider": element.nameofFeedbackProvider,
          //  'designationOfFeedbackProvider': element.designationOfFeedbackProvider,
          'exitDate': element.exitDate, 'dateOfJoining': element.dateOfJoining,
               'professionalExperience': element.professionalExperience,
            'employeeId': element.employeeId, 'role': element.role, 'department': element.department,
              'selfDriven': element.selfDriven,
            'creativity': element.creativity, 'informalOrganizationSenseOfBelonging': element.informalOrganizationSenseOfBelonging,
             'initiative': element.initiative, 'workIndependenty': element.workIndependenty, 'teamWork': element.teamWork,
            'dealConstructivelyWithPressure': element.dealConstructivelyWithPressure, 'volume': element.volume,
             'quality': element.quality, 'consistency': element.consistency, 'punctuality': element.punctuality,
            'discipline': element.discipline, 'academicKnowledge': element.academicKnowledge, 'productKnowledge': element.productKnowledge,
             'industryKnowledge': element.industryKnowledge, 'communicationSkills': element.communicationSkills,
             'awards': element.awards, 
             'building': element.building, 'stakeholder': element.stakeholder, 'discrepancyDocuments': element.discrepancyDocuments,
            'compliencyDiscrepancy': element.compliencyDiscrepancy, 'warning': element.warning, 'showCausedIssue': element.warning,
             'suspension': element.suspension, 'termination': element.termination,
            'keySkills': element.keySkills, 'empThrive': element.empThrive, 'inLeadership': element.inLeadership,
            'otherInfo': element.otherInfo,'rehireAgain': element.rehireAgain, 'reasonForSerperation': element.reasonForSerperation,
            'originalFilename': element.originalFilename, 'status': element.status
      })
    });

    let inst = []
    empData.canidateInstitute.forEach(element => {
      inst.push({
        "feedbackProviderName": element.feedbackProviderName,
        "feedbackProviderDesignation": element.feedbackProviderDesignation,
        "feedbackProviderRelationship": element.feedbackProviderRelationship,
        "feedbackProviderEmail": element.feedbackProviderEmail,
        "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
        "intitutionName": element.intitutionName,
        "nameOfCourse": element.nameOfCourse,
        "yearOfJoining": element.yearOfJoining,
        "yearOfPassout": element.yearOfPassout,
        "studentType": element.yearOfPassout,
        "roll": element.roll
      })
    });
   
    let bckverification:{
       'dateOfVerification': string,
       'verifiedFor': string
        'personalIdentity': boolean,
         'criminal': boolean,
         'verificationAddress': boolean,
         'drugsAndSubstanceAbuse': boolean,
         'salarySlipCTCdocument': boolean
    } = {
      'dateOfVerification': empData.dateOfVerification,
      'verifiedFor': empData.verifiedFor,
        'personalIdentity': empData.personalIdentity,
        'criminal': empData.criminal,
        'verificationAddress': empData.verificationAddress,
        'drugsAndSubstanceAbuse': empData.drugsAndSubstanceAbuse,
        'salarySlipCTCdocument': empData.salarySlipCTCdocument,
    }
let o={bio:bioobjj,
       candidate:cavArr,
       verification: bckverification,
       canidateInstitute: inst
      }
console.log(o)


      return this.http.post(this.baseUrl + '/api/candidate/', o,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
  
  // get candidate list
  public getCandidateList() : Observable<any> {
    var hrorganisationId = window.sessionStorage.getItem('hrorganisationId');
    return this.http.get(this.baseUrl + '/api/candidate/' + hrorganisationId);
  }
 // get by id candidate
  editEmployee(editEmpData): Observable<any> {
    return this.http.get(this.baseUrl + '/api/candidate/candidatedata/' + editEmpData);
  }
  // Update candidate
  updateCandidate(candupdateData): Observable<any> {
    let bioobjj={
      'firstName': candupdateData.firstName,
      'lastName': candupdateData.lastName,
      'email': candupdateData.email,
      'phoneNumber': candupdateData.phoneNumber,
      'dateOfBirth': candupdateData.dateOfBirth == "" ? "" : candupdateData.dateOfBirth,
      'adharNumber': candupdateData.adharNumber== "" ? "": candupdateData.adharNumber,
      'panNumber': candupdateData.panNumber,'city': candupdateData.city, 'state': candupdateData.state,
      'pinCode': candupdateData.pinCode,
      'address': candupdateData.address, 'landMark': candupdateData.landMark
      }

      let cavArr=[]

      candupdateData.candidate.forEach(element => {
        cavArr.push({
          "_id": element._id,
          "organizationName": element.organizationName,
          "organiationLocation": element.organiationLocation,
          "feedbackProviderName": element.feedbackProviderName,
          "feedbackProviderDesignation": element.feedbackProviderDesignation,
          "feedbackProviderRelationship": element.feedbackProviderRelationship,
          "feedbackProviderEmail": element.feedbackProviderEmail,
          "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
          // "nameofFeedbackProvider": element.nameofFeedbackProvider,
          // 'designationOfFeedbackProvider': element.designationOfFeedbackProvider,
          'exitDate': element.exitDate, 'dateOfJoining': element.dateOfJoining,
          'professionalExperience': element.professionalExperience,
          'employeeId': element.employeeId, 'role': element.role, 'department': element.department,
          'selfDriven': element.selfDriven,
          'creativity': element.creativity, 'informalOrganizationSenseOfBelonging': element.informalOrganizationSenseOfBelonging,
              'initiative': element.initiative, 'workIndependenty': element.workIndependenty, 'teamWork': element.teamWork,
              'dealConstructivelyWithPressure': element.dealConstructivelyWithPressure, 'volume': element.volume,
              'quality': element.quality, 'consistency': element.consistency, 'punctuality': element.punctuality,
              'discipline': element.discipline, 'academicKnowledge': element.academicKnowledge, 'productKnowledge': element.productKnowledge,
              'industryKnowledge': element.industryKnowledge, 'communicationSkills': element.communicationSkills,
              'awards': element.awards, 
              'building': element.building, 'stakeholder': element.stakeholder, 'discrepancyDocuments': element.discrepancyDocuments,
              'compliencyDiscrepancy': element.compliencyDiscrepancy, 'warning': element.warning, 'showCausedIssue': element.warning,
              'suspension': element.suspension, 'termination': element.termination,
              'keySkills': element.keySkills, 'empThrive': element.empThrive, 'inLeadership': element.inLeadership,
              'otherInfo': element.otherInfo,'rehireAgain': element.rehireAgain, 'reasonForSerperation': element.reasonForSerperation,
              'originalFilename': element.originalFilename, 'status': element.status
        })
      });

      let inst = []
      candupdateData.canidateInstitute.forEach(element => {
        inst.push({
          '_id': element._id,
          "feedbackProviderName": element.feedbackProviderName,
        "feedbackProviderDesignation": element.feedbackProviderDesignation,
        "feedbackProviderRelationship": element.feedbackProviderRelationship,
        "feedbackProviderEmail": element.feedbackProviderEmail,
        "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
          'intitutionName': element.intitutionName,
          'nameOfCourse': element.nameOfCourse,
          'yearOfJoining': element.yearOfJoining,
          'yearOfPassout': element.yearOfPassout,
          'studentType': element.yearOfPassout,
          'roll': element.roll
        })
      });

      let bckverification: {
        'dateOfVerification': string,
        'personalIdentity': boolean,
         'criminal': boolean,
         'verificationAddress': boolean,
         'drugsAndSubstanceAbuse': boolean,
         'salarySlipCTCdocument': boolean,
         'verifiedFor': string
      } = {
        'dateOfVerification': candupdateData.dateOfVerification,
        'verifiedFor': candupdateData.verifiedFor,
          'personalIdentity': candupdateData.personalIdentity,
          'criminal': candupdateData.criminal,
          'verificationAddress': candupdateData.verificationAddress,
          'drugsAndSubstanceAbuse': candupdateData.drugsAndSubstanceAbuse,
          'salarySlipCTCdocument': candupdateData.salarySlipCTCdocument,
      }
      let update={bio:bioobjj,
        candidate:cavArr,
        verification: bckverification,
        canidateInstitute: inst
        }
    console.log(update)
    return this.http.put(this.baseUrl + '/api/candidate/candidateUpdate', update,
       {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
      }
    );
  }
    // get all organization
    public getAllOrganization() : Observable<any> {
      return this.http.get(this.baseUrl + '/api/scandidate/organisation/listOfOrganization/');
    }
    // get all Institution
    public getAllInstitution() : Observable<any>{
      return this.http.get(this.baseUrl + '/api/scandidate/institute/');
    }

    //download report
    downloadReport(report, index): Observable<any> {
      let bioobjj={
        'firstName': report.firstName,
        'lastName': report.lastName,
        'email': report.email,
        'phoneNumber': report.phoneNumber,
        'dateOfBirth': report.dateOfBirth == "" ? "" : report.dateOfBirth,
        'adharNumber': report.adharNumber== "" ? "": report.adharNumber,
        'panNumber': report.panNumber,'city': report.city, 'state': report.state,
        'pinCode': report.pinCode,
        'address': report.address, 'landMark': report.landMark
        }
  
        let cavArr=[]
  
        report.candidate.forEach(element => {
          cavArr.push({
            "_id": element._id,
            "organizationName": element.organizationName,
            "organiationLocation": element.organiationLocation,
            "feedbackProviderName": element.feedbackProviderName,
            "feedbackProviderDesignation": element.feedbackProviderDesignation,
            "feedbackProviderRelationship": element.feedbackProviderRelationship,
            "feedbackProviderEmail": element.feedbackProviderEmail,
            "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
            // "nameofFeedbackProvider": element.nameofFeedbackProvider,
            // 'designationOfFeedbackProvider': element.designationOfFeedbackProvider,
            'exitDate': element.exitDate, 'dateOfJoining': element.dateOfJoining,
            'professionalExperience': element.professionalExperience,
            'employeeId': element.employeeId, 'role': element.role, 'department': element.department,
            'selfDriven': element.selfDriven,
            'creativity': element.creativity, 'informalOrganizationSenseOfBelonging': element.informalOrganizationSenseOfBelonging,
                'initiative': element.initiative, 'workIndependenty': element.workIndependenty, 'teamWork': element.teamWork,
                'dealConstructivelyWithPressure': element.dealConstructivelyWithPressure, 'volume': element.volume,
                'quality': element.quality, 'consistency': element.consistency, 'punctuality': element.punctuality,
                'discipline': element.discipline, 'academicKnowledge': element.academicKnowledge, 'productKnowledge': element.productKnowledge,
                'industryKnowledge': element.industryKnowledge, 'communicationSkills': element.communicationSkills,
                'awards': element.awards, 
                'building': element.building, 'stakeholder': element.stakeholder, 'discrepancyDocuments': element.discrepancyDocuments,
                'compliencyDiscrepancy': element.compliencyDiscrepancy, 'warning': element.warning, 'showCausedIssue': element.warning,
                'suspension': element.suspension, 'termination': element.termination,
                'keySkills': element.keySkills, 'empThrive': element.empThrive, 'inLeadership': element.inLeadership,
                'otherInfo': element.otherInfo,'rehireAgain': element.rehireAgain, 'reasonForSerperation': element.reasonForSerperation,
                'originalFilename': element.originalFilename, 'status': element.status
          })
        });
  
        let inst = []
        report.canidateInstitute.forEach(element => {
          inst.push({
            '_id': element._id,
            "feedbackProviderName": element.feedbackProviderName,
          "feedbackProviderDesignation": element.feedbackProviderDesignation,
          "feedbackProviderRelationship": element.feedbackProviderRelationship,
          "feedbackProviderEmail": element.feedbackProviderEmail,
          "feedbackProviderPhoneNumber": element.feedbackProviderPhoneNumber,
            'intitutionName': element.intitutionName,
            'nameOfCourse': element.nameOfCourse,
            'yearOfJoining': element.yearOfJoining,
            'yearOfPassout': element.yearOfPassout,
            'studentType': element.yearOfPassout,
            'roll': element.roll
          })
        });
  
        let bckverification = {
          'dateOfVerification': report.dateOfVerification,
            'personalIdentity': report.personalIdentity,
            'criminal': report.criminal,
            'verificationAddress': report.verificationAddress,
            'drugsAndSubstanceAbuse': report.drugsAndSubstanceAbuse,
            'salarySlipCTCdocument': report.salarySlipCTCdocument,
        }
        let download ={bio:bioobjj,
          candidate:cavArr,
          verification: bckverification,
          canidateInstitute: inst
          }
      return this.http.post(this.baseUrl + '/api/candidate/downloadReport/'+ index, download,{responseType: 'blob'}
      // {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   })
      // }
      );
    }

    //search organization
    searchOrgName(orgName): Observable<any>{
     var search: {
         "organizationName": string
     } = {
      "organizationName": orgName
     };
     console.log(search)
     return this.http.post(this.baseUrl + '/api/candidate/searchOrganization', search
    );
    }

    //search Institution
    searchInstName(instName): Observable<any>{
     var search: {
         "intitutionName": string
     } = {
      "intitutionName": instName
     };
     return this.http.post(this.baseUrl + '/api/candidate/searchInstitution', search,
     {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    );
    }

    public getCandLinemanagerData(): Observable<any> {
      var organizationId = window.sessionStorage.getItem('hrorganisationId');
      return this.http.get(this.baseUrl + '/api/organisation/admin/show/lineManager/' + organizationId);
    }
}
