import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit,OnDestroy{

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  
  listObservers$:Array<Subscription> = [];
  state: string = 'paused'
  constructor(public multimediaService:MultimediaService){}//Inyeccion del servicio

  ngOnInit():void{//Primero en ejecutarse
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status=>this.state=status)

    this.listObservers$=[observer1$];
  }

  ngOnDestroy(): void {//Ultimo en ejecutarse en la vida del componente
    this.listObservers$.forEach(u=>u.unsubscribe)
  }

  public handlePosition (event:MouseEvent):void{
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100)/width;

    this.multimediaService.seekAudio(percentageFromX);
  }
}
