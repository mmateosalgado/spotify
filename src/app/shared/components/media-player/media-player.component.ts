import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent {
  mockCover:TrackModel={
    cover:'https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg',
    album:'AM',
    name:'I Wanna Be Yours',
    url:'http://localhost/track.mp3',
    _id:1
  }
  constructor(){}
}
