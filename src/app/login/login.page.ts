import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserServiceService } from '../../../shared/user-service.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  loginForm: FormGroup= new FormGroup({
    phone:new FormControl(null, Validators.required),
    password: new FormControl(null,Validators.required)
  });

  constructor(private alertC: AlertController, private router: Router, private UserServiceService: UserServiceService, private authService: SocialAuthService) { }

  ngOnInit() {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      
      if(this.loggedIn==true){
        console.log('esta logeado')

        this.loginForm.setValue({
          phone:this.user.id,
          password:this.user.id
        })

        this.UserServiceService.login(JSON.stringify(this.loginForm.value)).subscribe(
          data=>{ console.log(data);
            this.router.navigate(['/home'])
          },
          error=>{console.error(error)
            
          }
        )
      }

    })
  }

  signInWithGoogle11(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log('me ejecuto')
  }
 
  signOut(): void {
    console.log(this.loginForm.value)
    this.authService.signOut();
  }

  login11(){

    if(!this.loginForm.valid){
      console.log('Invalid form')

    }
    
    this.UserServiceService.login(JSON.stringify(this.loginForm.value)).subscribe(
      data=>{ console.log(data);
        console.log('logged')
      },
      error=>{console.error(error)
        this.showAlert1();
      }
      
    )
  }

  backToRegister11(){
    console.log('me ejecuto 2')
    this.router.navigate(['/register']);

  }

  async showAlert1(){
    await this.alertC.create({
      header: "Incorrect data",
      message: "Your password or phone are incorrect.",
      buttons: [{
        text: "Continue", handler: (res) =>{
          console.log(res)
        }
      }
      ]
  }).then(res=> res.present());
  }

}

