import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        LoginPageComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return invalid form', () => {

    //Arrange
    const mockCredentials = {
      email:'t07913wd',
      password:'12213197826t319782653'
    }

    const emailForm:any=component.formLogin.get('email')
    const passwordForm:any=component.formLogin.get('password')

    //Act
    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)
    
    
    //Assert
    expect(component.formLogin.invalid).toEqual(true);
  });

  it('should say "iniciar sesion"',()=>{
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText;

    expect(getInnerText).toEqual('Iniciar sesión')
  });
});
