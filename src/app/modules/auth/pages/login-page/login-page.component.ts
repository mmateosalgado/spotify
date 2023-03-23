import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  
  errorSession:boolean=false;
  formLogin: FormGroup = new FormGroup({});//Elemento PADRE del Formulario

  constructor(private asAuthService:AuthService,private cookie:CookieService,private router:Router){//Inyeccion servicio COokie

  }

  ngOnInit(): void{
    this.formLogin = new FormGroup(//PROPIEDADES DEL LOGIN
      {
        email: new FormControl('',[
          //PROPIEDADES-VALIDACIONES del FormControl/Input email
          Validators.required,
          Validators.email
        ]),
        password:new FormControl('',[
          //PROPIEDADES-VALIDACIONES del FormControl/Input password
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }


  sendLogin():void{
    const {email,password} = this.formLogin.value
    this.asAuthService.sendCredentials(email,password)//Mandamos al servicio la Data
    //200<400
      .subscribe(responceOk=>{//Para que cualquier Observable funcione , debemos suscribirnos, Cuando el user ingrese la info correcta , la 
        console.log("Session iniciada correcta",responceOk)
        const {tokenSession,data}=responceOk;
        this.cookie.set('token',tokenSession,4,'/')
        this.router.navigate(['/','tracks'])
      },
      err=>{//error 400>=
        console.log("Ocurrio error, mail y contraseña incorrecta",err)
        this.errorSession=true;
      }
    )
  }
}
