import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SocialAuthService } from 'angularx-social-login';
import {UserServiceService} from '../../../shared/user-service.service';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo:any;
  userInfoArray:any=[];

  constructor(public alertController: AlertController, private router:Router, private UserServiceService: UserServiceService, private authService: SocialAuthService) { }

  ngOnInit() {

    let item = JSON.parse(localStorage.getItem('key'));
    console.log(item.phone)

    this.UserServiceService.getUser(item.phone).subscribe((res)=>{
      console.log(res)

      this.userInfo=_.cloneDeep(res);
      console.log(this.userInfo)

      this.userInfoArray.push(this.userInfo.name);
      this.userInfoArray.push(this.userInfo.lastname);
      this.userInfoArray.push(this.userInfo.email);

      console.log(this.userInfoArray)

    })
  }

  logout(){
    this.UserServiceService.logout().subscribe(
      data=>{ console.log(data); this.router.navigate(['/login'])},
      error=> console.error(error)
      )
      
  }

}
