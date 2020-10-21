import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserServiceService} from '../../../shared/user-service.service';
import { AlertController } from '@ionic/angular';
import { SocialAuthService } from "angularx-social-login";
import {GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  confirmUser:any = [];

  registerForm: FormGroup= new FormGroup({
    
    name: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null,[Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)

  })

  constructor(public alertController: AlertController, private router:Router, private UserServiceService: UserServiceService, private authService: SocialAuthService) { }

  ngOnInit() {

  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
      this.invalidFormAlert();
      console.log('invalid form'); return;
      

    }
    for (const field in this.registerForm.controls) { // 'field' is a string
      this.confirmUser.push(this.registerForm.controls[field].value);
      console.log(this.confirmUser)
    }

    this.UserServiceService.getUser(this.confirmUser[3]).subscribe((res)=>{
      console.log(this.confirmUser[3])
      console.log(res)

    if(res==null){

      console.log('no existe')
      this.UserServiceService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data=> {console.log(data); this.router.navigate(['/login'])},
        error=> console.log(error)
        )

    } else{
      console.log(res)
      console.log('existe')
      this.presentAlert();
      this.router.navigate(['/login'])
    }
        
        })

  }

  backToLogin(){

    this.router.navigate(['/login'])

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'E-mail already in use.',
      message: 'Looks like this email is already in use .',
      buttons: ['OK']
    });

    await alert.present();
  }

async invalidFormAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Invalid Form',
    message: 'Looks like you entered some invalid information.',
    buttons: ['OK']
  });

  await alert.present();
}
}

