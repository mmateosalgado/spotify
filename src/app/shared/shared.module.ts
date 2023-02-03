import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from './components/side-bar/side-bar.component';

import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';


@NgModule({
  declarations: [
    SideBarComponent,
    MediaPlayerComponent,
    HeaderUserComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[//Damos 'permiso' para compartir los modulos compartidos
    SideBarComponent
  ]
})
export class SharedModule { }
