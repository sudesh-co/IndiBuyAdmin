import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  UserForm!: FormGroup;
  input_style: string = "background-color:white !important;"
  constructor(private fb: FormBuilder, private alertService: NanaAlertService, private service: AuthenticationService, public router: Router) {

  }
  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  login(): void {
    if (this.UserForm.valid) {
      console.log(this.UserForm.value);
      this.service.login(this.UserForm.value).subscribe(x => {
        localStorage.setItem('token', x.token);
        localStorage.setItem('user', JSON.stringify(x.user));
        this.router.navigate(['/product']);
      }, err => {
        this.alertService.info("Invalid login please check your credentials")
        })     
    } else {
      this.alertService.info("please enter your credentials")
      this.UserForm.markAllAsTouched();

    }
  }
}
