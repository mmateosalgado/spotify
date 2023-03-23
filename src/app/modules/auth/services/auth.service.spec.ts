import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import * as mockRaw from '../../../data/user.json';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser:any = (mockRaw as any).default;
  let httpClientSpy: { post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any)
  });

  it('should be created', () => { 
    expect(service).toBeTruthy()
  });

  it('should return an object with "data" and "tokenSession"',(done:DoneFn)=>{

    //Arrange
    const user:any = mockUser.userOk
    const mockResponce = {
      data:{},
      tokenSession:'0x0x0x'
    }

    httpClientSpy.post.and.returnValue(
      of(mockResponce)
    );

    //Act
    service.sendCredentials(user.email,user.password)
    .subscribe(responceApi=>{
        const getProperties = Object.keys(responceApi)
        expect(getProperties).toContain('data')
        expect(getProperties).toContain('tokenSession')
        done()
    })
  })
});
  