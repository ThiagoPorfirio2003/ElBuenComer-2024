import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { employe } from '../interfaces/user';
import { enumProfile } from '../enums/profile';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{

  constructor(public authService : AuthService) 
  {

  }

}
