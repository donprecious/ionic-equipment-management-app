import { FormBuilder, Validators } from '@angular/forms';
import { StorageServiceService } from './../../service/shared/storage-service.service';
import { AuthService } from './../../service/auth.service';
import { RegisterRequestModel } from './../../model/auth/register-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService,
    private storageService: StorageServiceService,
  private fb: FormBuilder
  ) { }
  error = ''
  ngOnInit() {
  
  }
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    
  })
  register() {
    if (this.form.invalid) {
      this.error = 'error with inputs,'
      return;
    }
    const reqisterModel = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      firstName: this.form.get('firstname').value,
      lastName: this.form.get('lastname').value,
    } as RegisterRequestModel;
          this.authService.register(reqisterModel).subscribe(a => {
            console.log("result", a)
            // localStorage.setItem("userId", a.data.id);
            this.storageService.setItem("userId", a.data.id);
            this.router.navigate(['/dashboard']);
          }, err => {
            console.log(err);
             this.error =   err.error.message
          });
  }
 
}
