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


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {


  cadastreMvtLayer = 'trespass:CadastrePolygonLGATE_217_1';
  projection_epsg_no = '900913';  // The old way of specifying 3857, spells Google!

  map: Map | undefined;
  cadastreLoaded: boolean | undefined;

  // cadastreSource = new VectorSource({
  //   format: new GeoJSON(),
  //   url: function (extent) {
  //     return (
  //       'http://13.238.73.166:8080/geoserver/trespass/ows?service=WFS&' +
  //       'version=1.0.0&request=GetFeature&typeName=trespass%3ACadastrePolygonLGATE_217_1&' +
  //       'maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:3857&' +
  //       'bbox=' +
  //       extent.join(',') +
  //       ',EPSG:3857'
  //     );
  //   },
  //   strategy: bboxStrategy,
  // });

  // cadastre = new VectorLayer({
  //   source: this.cadastreSource,
  //   style: new Style({
  //     stroke: new Stroke({
  //       color: 'rgba(255, 0, 0, 1.0)',
  //       width: 2,
  //     }),
  //   }),
  // });

  cadastreSource = new VectorTileSource({
    tileGrid: createXYZ({ maxZoom: 19 }),
    format: new MVT(),
    url: 'http://13.238.73.166:8080/geoserver/gwc/service/tms/1.0.0/' + this.cadastreMvtLayer +
      '@EPSG%3A' + this.projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf'
  })

  cadastreMvt = new VectorTileLayer({
    style: new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 2,
      }),
    }),
    source: this.cadastreSource
  })


  ngAfterViewInit(): void {

    // Watch for the cadastre layer to load, to set our progress spinner.
    this.cadastreSource.on('tileloadend', () => {
      this.cadastreLoaded = true;
    });

    this.cadastreSource.on('tileloadstart', () => {
      this.cadastreLoaded = false;
    });

    this.cadastreSource.on('tileloaderror', () => {
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

        // this.cadastre,

        this.cadastreMvt,

      ],
      target: 'ol-map'
    });
  }
}
