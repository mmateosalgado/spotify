import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL=environment.api//Enlaze con API

  constructor(private http:HttpClient) { }//Cliente

  public sendCredentials(email:string,password:string):Observable<any>{//Metodo login
    const body={
      email,
      password
    }
    
    return this.http.post(`${this.URL}/auth/login`,body);//Pasamos password y username como parametros
  }
}
 