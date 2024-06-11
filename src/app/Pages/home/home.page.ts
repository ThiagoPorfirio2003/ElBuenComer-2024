import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private loginService: AuthService, private router: Router) {}

  logout(){
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
