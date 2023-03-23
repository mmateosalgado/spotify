import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import * as dataRaw from '../../../data/tracks.json';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent {
  @Input() tracks: TrackModel[]=[]
  optionSort:{property:string | null, order:string}={property:null,order:'asc'}
  constructor(){}

  ngOnInit():void
  { 

  }

  changeSort(property:string):void{
    const{order}=this.optionSort

    this.optionSort = {
      property,
      order: order==='asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);
  }
}
