import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { ErrorService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private loginService: LoginService, private toast: ToastService, private errorService: ErrorService,
    private router : Router) { }

  ngOnInit() {
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(res => {
        localStorage.setItem('token', res.data.token)
        this.router.navigate([''])
        this.toast.presentToastWithOptions('Giriş Başarılı', 'success')
      }, err => {
        this.errorService.presentToastWithOptions(err)
      })
    }
  }

}
