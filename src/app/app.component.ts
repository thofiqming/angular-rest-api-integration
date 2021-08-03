import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserControllerService} from "./api/services/user-controller.service";
import {User} from "./api/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-jwt-mongo';
  public form: FormGroup;
  public errors: any;
  public userRegisteredSuccess: User | undefined;

  constructor(private fb: FormBuilder, private userControlService: UserControllerService) {
    this.form = this.fb.group(
      {
        username: [''],
        email: [''],
        password: ['']
      });
  }

  submit() {
    console.log(this.form.value);
    let userObservable = this.userControlService.signUp({body: this.form.value});
    userObservable.subscribe(
      res => {
        this.errors = undefined;
        this.userRegisteredSuccess = res;
      },
      err => {
        this.errors = err?.error?.error?.details;
        this.userRegisteredSuccess = undefined;
      });
  }
}
