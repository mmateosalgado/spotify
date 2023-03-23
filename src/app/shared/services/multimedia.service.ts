  import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable,Observer, Subject, timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback:EventEmitter<any>=new EventEmitter<any>()

  public trackInfo$:BehaviorSubject<any> = new BehaviorSubject(undefined);

  public audio!:HTMLAudioElement;

  public timeElapsed$:BehaviorSubject<string>=new BehaviorSubject("00:00");
  public timeRemaining$:BehaviorSubject<string>=new BehaviorSubject("-00:00");

  public playerStatus$:BehaviorSubject<string>=new BehaviorSubject("paused");

  public playerPercentage$: BehaviorSubject<number>=new BehaviorSubject(0);

  constructor() { 

    this.audio=new Audio()

    this.trackInfo$.subscribe(responceOk=>{
        if(responceOk){
          this.setAudio(responceOk)
        }
      }
    )

    this.listenAllEvents();
  }

  public setAudio(track: TrackModel):void{
    
    const src = track.url.substring(1);//ANTES -> //track.... | AHORA -> /track...

    //Medio pelo pero sino se rompia 
    this.audio.src = 'http://localhost:3000' + src;

    this.audio.play();
  }

  private listenAllEvents():void{
    //Eventos se encuentran HTML audio/video js
    this.audio.addEventListener('timeupdate',this.calculateTime,false)

    this.audio.addEventListener('playing',this.setPlayerStatus,false)
    this.audio.addEventListener('play',this.setPlayerStatus,false)
    this.audio.addEventListener('pause',this.setPlayerStatus,false)
    this.audio.addEventListener('ended',this.setPlayerStatus,false)
  }

  private setPlayerStatus=(state:any)=>{

      switch(state.type){
        case 'play':
          this.playerStatus$.next('play')
          break;
        case 'playing':
          this.playerStatus$.next('playing')
          break;
        case 'ended':
          this.playerStatus$.next('ended')
          break;
        default:
          this.playerStatus$.next('paused')
          break;
      }
  }

  private calculateTime=()=>{
    //console.log("Evento calc time");

    const {duration,currentTime} = this.audio;

    //console.table([duration,currentTime]);

    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime,duration);
    this.setPercentage(currentTime,duration);
  }

  private setPercentage(currentTime:number,duration:number):void{
    let percentage=(currentTime * 100)/duration;
    this.playerPercentage$.next(percentage);
  }

  private setTimeElapsed(currentTime:number):void{
    let seconds = Math.floor(currentTime % 60)//Normalizacion de segundos (5.3,5.435,5.543 --> 3,4,5)
    let minutes = Math.floor(currentTime / 60) % 60 //Obtencion de minutos a partir de la cantidad de segundos

    //Pq? 00:00 --> puede ser 01:05 ( se agrega el 0 inicial) ^ 10:15 ( no hace falta el 0 inicial )
    const displaySeconds = (seconds<10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes<10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;//minutos:segundos

    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime:number,duration:number):void{

    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60)//Normalizacion de segundos (5.3,5.435,5.543 --> 3,4,5)
    let minutes = Math.floor(timeLeft / 60) % 60 //Obtencion de minutos a partir de la cantidad de segundos

    const displaySeconds = (seconds<10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes<10) ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`;//minutos:segundos

    this.timeRemaining$.next(displayFormat);
  }

  public togglePlayer():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(percentage:number):void{
    const {duration} = this.audio;
    const percentageToSecond = ( percentage *  duration ) / 100;
    this.audio.currentTime=percentageToSecond;
  }
}
