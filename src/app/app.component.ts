import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayersStateModel } from 'src/layers/layers.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trespass';
  // Watch the state for whether things are loaded yet
  @Select((state: { layers: LayersStateModel; }) => (state.layers as LayersStateModel).cadastreTilesLoaded) cadastreTilesLoaded$: Observable<boolean> | undefined;
}
