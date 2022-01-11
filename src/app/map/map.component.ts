import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';

import XYZ from 'ol/source/XYZ';
import { Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import Stamen from 'ol/source/Stamen';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import { createXYZ } from 'ol/tilegrid';
import { LayersService } from '../../layers/layers.service';
import { Select, Store } from '@ngxs/store';
import { LayersStateModel } from 'src/layers/layers.state';
import { Observable } from 'rxjs';
import { UpdateCadastreTilesLoaded } from 'src/layers/layers.actions';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  map: Map | undefined;
  // Watch the state for whether things are loaded yet
  @Select((state: { layers: LayersStateModel; }) => (state.layers as LayersStateModel).cadastreTilesLoaded) cadastreTilesLoaded$: Observable<boolean> | undefined;

  constructor(private layersService: LayersService,
    private store: Store) { }


  ngOnInit() {

    // THIS NEEDS TO BE AN OBSERVABLE
    // Watch for the cadastre layer to load, to set our progress spinner.
    this.layersService.cadastreSource.on('tileloadend', () => {
      this.store.dispatch(new UpdateCadastreTilesLoaded(true));
    });

    this.layersService.cadastreSource.on('tileloadstart', () => {
      this.store.dispatch(new UpdateCadastreTilesLoaded(false));
    });

    this.layersService.cadastreSource.on('tileloaderror', () => {
      this.store.dispatch(new UpdateCadastreTilesLoaded(false));
      console.log('Error loading Cadastre Layer tiles')
    });
  }

  ngAfterViewInit(): void {


    this.map = new Map({
      view: new View({
        projection: 'EPSG:3857',
        center: [12805010.65, -4011955.47],
        zoom: 14
        ,
      }),
      layers: [

        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),

        // this.cadastre,

        this.layersService.cadastreMvt,

      ],
      target: 'ol-map'
    });


  }
}
