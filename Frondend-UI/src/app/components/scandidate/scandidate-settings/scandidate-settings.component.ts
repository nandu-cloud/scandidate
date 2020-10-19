import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppuserService } from 'src/app/services/appuser.service';

@Component({
  selector: 'app-scandidate-settings',
  templateUrl: './scandidate-settings.component.html',
  styleUrls: ['./scandidate-settings.component.css']
})
export class ScandidateSettingsComponent implements OnInit {
  userIdedit: number;
  updateUserData: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appuserService: AppuserService,
  ) { }

  ngOnInit(): void {
  }

  edit(id:number){
    this.userIdedit = id;
    this.updateUserData = this.formBuilder.group({
      _id:['', [Validators.required]],
    })
  }
}
