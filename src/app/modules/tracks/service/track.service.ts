import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable,of } from 'rxjs';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';

import { environment } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  //-----------------------------Tipo de dato que Observa---------
  dataTracksTrending$:Observable<        TrackModel[]    > = of([])
  dataTracksRandom$:Observable<        any    > = of([])

  private readonly URL = environment.api;

  constructor(private httpClient :HttpClient) {
  
   }
   
   //Filtro complejo ejemplo

   private skipById(listTracks:TrackModel[],id:number):Promise<TrackModel[]>{
    return new Promise((resolve,reject)=>{
      const tempList=listTracks.filter(a=>a._id!==id)//Guardamos todo menos la song de id = al parametro
      resolve (tempList)
    })
   }




   getAllTracks$():Observable<any>{//termina en $ porque retorna un Observable
      return this.httpClient.get(`${this.URL}/tracks`,{//podemos subscribirnos, pq retorna un Observable, pero nos subscrivimos donde llamamos a este metodo!
        headers: new HttpHeaders({authorization:'Bearer TOKEN'})
      
      }).pipe(//Filtro para que la respuesta sea un TracksModule array
        map(({data}:any)=>{//Usamos map 
            return data;
        })
      )
    }


    getAllRandom$():Observable<any>{
      return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        tap(data=>console.log('kkkkk',data)),
        mergeMap(({data}:any)=>this.skipById(data,2),/*{Retorna lista revertida + filtro skipId
            return data.reverse()
          }
        ),
       /* map((dataReverted)=>{
          return dataReverted.filter((track:TrackModel)=>track._id!==1)
        }
        )*/
        //Filtro ejemplo basico
        ),
        tap(data=>console.log("okokokok",data)),
        catchError((err)=>{
          const{status,statusText}=err
          console.log(status,statusText)
          return of([])
        })
      )
    }
}
