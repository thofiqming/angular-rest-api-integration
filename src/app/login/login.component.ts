import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserControllerService} from "../api/services/user-controller.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public errors: any;
  public token!: { token?: string; };

  constructor(private fb: FormBuilder, private userControlService: UserControllerService) {
    this.form = this.fb.group(
      {
        email: [''],
        password: ['']
      });
  }

  ngOnInit(): void {
  }

  login() {
    this.userControlService.login({body: this.form.value})
      .subscribe(
        res => {
          this.errors = undefined;
          this.token = res;
        },
        err => {
          this.errors = err?.error?.error?.details;
          this.token = {};
        });
  }

}
