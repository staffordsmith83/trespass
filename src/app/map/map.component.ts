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


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  map: Map | undefined;
  cadastreLoaded: boolean | undefined;

  cadastreSource = new VectorSource({
    format: new GeoJSON(),
    url: function (extent) {
      return (
        'http://13.238.73.166:8080/geoserver/trespass/ows?service=WFS&' +
        'version=1.0.0&request=GetFeature&typeName=trespass%3ACadastrePolygonLGATE_217_1&' +
        'maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857&' +
        'bbox=' +
        extent.join(',') +
        ',EPSG:3857'
      );
    },
    strategy: bboxStrategy,
  });



  cadastre = new VectorLayer({
    source: this.cadastreSource,
    style: new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 2,
      }),
    }),
  });


  ngAfterViewInit(): void {

    // Watch for the cadastre layer to load, to set our progress spinner.
    this.cadastreSource.on('featuresloadend', () => {
      this.cadastreLoaded = true;
    });

    this.cadastreSource.on('featuresloadstart', () => {
      this.cadastreLoaded = false;
    });

    this.cadastreSource.on('featuresloaderror', () => {
      this.cadastreLoaded = false;
    });


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

        this.cadastre,

      ],
      target: 'ol-map'
    });
  }
}
