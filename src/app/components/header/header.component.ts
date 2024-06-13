import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
{
  @Input({required: true}) title! : string;

  constructor(private loginService:AuthService, private router: Router ) 
  { 
    
  }
  logout(){
    this.loginService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
