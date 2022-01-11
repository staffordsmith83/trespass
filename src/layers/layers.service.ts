import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
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
import { Store } from '@ngxs/store';
import { UpdateCadastreTilesLoaded } from './layers.actions';
import { Feature } from 'ol';
import Polygon from 'ol/geom/Polygon';
import { landTypes } from 'src/app/configs/landTypes.config';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';
import { styleFunctions } from 'src/app/configs/styles.config';


@Injectable({
  providedIn: 'root'
})
export class LayersService implements OnInit {

  selectedLandType: string = 'all';

  cadastreMvtLayerName = 'trespass:CadastrePolygonLGATE_217_1';
  projection_epsg_no = '900913';  // The old way of specifying 3857, spells Google!

  cadastreSource = new VectorTileSource({
    tileGrid: createXYZ({ maxZoom: 19 }),
    format: new MVT(),
    url: 'http://13.238.73.166:8080/geoserver/gwc/service/tms/1.0.0/' + this.cadastreMvtLayerName +
      '@EPSG%3A' + this.projection_epsg_no + '@pbf/{z}/{x}/{-y}.pbf'
  })


  cadastreMvt = new VectorTileLayer({
    style: styleFunctions.all,
    source: this.cadastreSource
  })

  constructor(private store: Store) {

  }

  ngOnInit() {

    // var cadastreProperties = this.cadastreSource.getProperties();
    // console.log(cadastreProperties);
    // debugger;

  }

  updateStyle(selectedLandType: keyof typeof styleFunctions) {

    this.cadastreMvt.setStyle(styleFunctions[selectedLandType]);

  }


  // CANNOT PASS IN VARIABLE TO STYLE FUNCTION BECAUSE THE SCOPE IS DIFFERENT
  // i.e. Style Functions do not have access to 'this'
  // See https://gis.stackexchange.com/questions/245815/can-i-create-dynamic-style-functions-in-openlayers-with-class-breaks-obtained-at 
  // styleFunction(feature: Feature<Geometry> | RenderFeature) {
  //   console.log(this.selectedLandType);

  //   var color;
  //   if (feature.get("usage_desc") === this.selectedLandType) {
  //     color = "red";
  //   } else {
  //     color = "black";
  //   }

  //   var style = new Style({
  //     stroke: new Stroke({
  //       color: color,
  //       width: 5
  //     })
  //   });

  //   return style;
  // }



}
