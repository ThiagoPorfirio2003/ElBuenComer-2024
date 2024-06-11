import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

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
    private fb: FormBuilder,) {
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      })
     }

  ngOnInit() {
  }

  login() {
    const email = this.loginForm.get('email')?.value!;
    const password = this.loginForm.get('password')?.value!;
    this.authService
      .login(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((er) => {
        const error = er.message;
      })
      .finally(() => {
      });
  }

  loginDirect(email: string, password: string) {
    this.loginForm.setValue({ email, password });
  }

  redirectToPage() {
    this.router.navigate(['/alta-cliente']);
  }
}
