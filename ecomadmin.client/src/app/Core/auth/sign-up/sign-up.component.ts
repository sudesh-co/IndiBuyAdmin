import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { NanaAlertService } from '../../../Shared/nana-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  UserForm!: FormGroup;
  input_style: string = "background-color:white !important;"
  pwdMatch: boolean = true;
  constructor(private fb: FormBuilder, private service: AuthenticationService, private alertService: NanaAlertService, private router: Router) {

  }
  ngOnInit() {
    this.buildForm();
  }
  buildForm(): void {
    this.UserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    })

  }
  checkPwdMatch(): boolean {
    const pwd = this.UserForm?.get('password')?.value;
    const cnfpwd = this.UserForm?.get('confirmpassword')?.value;
    if (pwd == cnfpwd) {
      return true;
    } else {
      return false;
    }

  }
  onSubmit(): void {
    
    if (this.UserForm.valid && this.checkPwdMatch() == true) {
      this.service.RegisterNewUser(this.UserForm.value).subscribe(x => {
        if (x) {
          this.alertService.success("you have sucessfully register please loged in now")
          setTimeout(() => {
            this.router.navigate(["/auth"])
          })
        } else {
          this.alertService.error("you have not registered yet")

        }
      })
    } else {
      this.UserForm.markAllAsTouched();
    }
  }
}
