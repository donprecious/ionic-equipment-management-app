import { LoginRequestEnu, LoginRequestModel } from './../../model/auth-model';
import { AuthService } from './../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageServiceService } from './../../service/shared/storage-service.service';
import { UserServiceService } from './../../service/users/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserServiceService,
    private storageService: StorageServiceService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }
  error = '';
  ngOnInit() {
    
  }
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  login() {
    if (this.form.invalid) {
      this.error = "some filed are required"
      return;
    }
    const model = {
       username : this.form.get('email').value,
      idNo: this.form.get('password').value
    } as LoginRequestEnu;
    
    this.authService.login(model).subscribe(a => {
      this.storageService.setItem("userId", a.data.user.id.toString())
      this.storageService.setItem("user", JSON.stringify( a.data.user))
      
            this.router.navigate(['/dashboard']);
    }, err => {
            console.log(err);
             this.error =   err.error.message
          })
  }

  
}
