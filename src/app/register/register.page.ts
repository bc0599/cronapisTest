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

  registerForm: FormGroup= new FormGroup({
    
    name: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null,[Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required)

  })

  constructor(private alertC: AlertController, private router:Router, private UserServiceService: UserServiceService, private authService: SocialAuthService) { }

  ngOnInit() {

  }

  signInWithGoogle(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
      
      this.registerForm.setValue({
        name:this.user.firstName,
        lastname:this.user.lastName,
        email: this.user.email,
        phone: this.user.id,
        password: this.user.id,
        cpass: this.user.id
      })

          this.UserServiceService.register(JSON.stringify(this.registerForm.value))
          .subscribe(
            data=> {console.log(data); this.router.navigate(['/login'])},
            error=> console.log(error)
  )


  })
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){

      console.log('invalid form'); return;

    }


      
        this.UserServiceService.register(JSON.stringify(this.registerForm.value))
        .subscribe(
          data=> {console.log(data); this.router.navigate(['/login'])},
          error=> console.log(error)
    )


  }

  backToLogin(){

    this.router.navigate(['/login'])

  }



}

