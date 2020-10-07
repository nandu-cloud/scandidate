import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  createCandidate: FormGroup;
  constructor() { 
    this.createCandidate = new FormGroup({
      _id: new FormControl(), 
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      subRole: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      status: new FormControl(true, [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      organizationId: new FormControl('', [Validators.required]),
      institutionId: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
      currentAddress: new FormControl('', [Validators.required]),
      permanentAddress: new FormControl('', [Validators.required]),
      noOfAssociatedUsers: new FormControl('', [Validators.required]),
      // aboutMe: new FormControl(),
      avatarLink: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

}
