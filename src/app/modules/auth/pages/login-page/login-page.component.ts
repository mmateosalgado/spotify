import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  
  formLogin: FormGroup = new FormGroup({});//Elemento PADRE del Formulario

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
    const body = this.formLogin.value
    console.log('sss',body)
  }
}
