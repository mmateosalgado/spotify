import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent {
  @Input()mode:'small'|'big'='small'
  @Input()track:TrackModel={_id:0,name:'',album:'',url:'',cover:''}

  constructor(private multimediaService:MultimediaService){

  }

  sendPlay(track:TrackModel):void{
    this.multimediaService.trackInfo$.next(track)
  }
}
