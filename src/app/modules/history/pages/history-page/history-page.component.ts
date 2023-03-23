import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  listResult$:Observable<any>=of([])
  constructor(private searchService:SearchService){}

  receiveData(event:string):void{
    this.listResult$=this.searchService.searchTracks$(event)
  }

}
