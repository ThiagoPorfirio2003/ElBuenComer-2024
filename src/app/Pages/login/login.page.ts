import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { userAccessData } from 'src/app/Interfaces/user';
import { UtilsService } from 'src/app/services/utils.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { message } from 'src/app/Interfaces/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(  
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService,
    private ionLoaderService: IonLoaderService,
    private ionToastService: IonToastService,
    private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      })
     }

  ngOnInit() {
  }

  async login() {
    await this.ionLoaderService.simpleLoader();
    const user: userAccessData = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!
    };
    try {
      await this.authService.logIn(user);
      this.router.navigate(['/home']);
    } catch (er) {
      if (er instanceof Error && 'code' in er) {
        const errorMessage : message = this.utils.translateAuthError('FFO')
        this.ionToastService.showToastError(errorMessage.content);
      }
      
    } finally {
      await this.ionLoaderService.dismissLoader();
    }
  }

  loginDirect(email: string, password: string) {
    this.loginForm.setValue({ email, password });
  }

  redirectToPage() {
    this.router.navigate(['/alta-cliente']);
  }
}
