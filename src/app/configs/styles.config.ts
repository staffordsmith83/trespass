import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';
import { Fill, Stroke, Style } from 'ol/style';

// // Styles for the different representations of the cadastral layers
// export const styles = {

//   'all': new Style({
//     stroke: new Stroke({
//       color: 'rgba(255, 0, 0, 1.0)',
//       width: 2,
//     }),
//   }),

//   'Unallocated Crown Land (Type 3 V)': new Style({
//     stroke: new Stroke({
//       color: 'rgba(122, 0, 0, 1.0)',
//       width: 2,
//     }),
//   }),


// }

export const styleFunctions = {

  'all': function styleFunction(feature: Feature<Geometry> | RenderFeature) {


        var style = new Style({
      stroke: new Stroke({
        color: "black",
        width: 1
      }),
      
    });

    return style;
  },


  'Unallocated Crown Land (Type 3 V)': function styleFunction(feature: Feature<Geometry> | RenderFeature) {

    var color;
    var width;
    if (feature.get("usage_desc") === 'Unallocated Crown Land (Type 3 V)') {
      color = "red";
      width = 1;
    } else {
      color = 'rgba(0, 0, 0, 0)',
      width = 0;
    }

    var style = new Style({
      stroke: new Stroke({
        color: color,
        width: width,
      }),
      // fill: new Fill({
      //   color: color,
      // }),
    });

    return style;
  },

  'Land Act': function styleFunction(feature: Feature<Geometry> | RenderFeature) {

    var color;
    var width;
    if (feature.get("usage_desc") === 'Land Act (Type 2)') {
      color = "red";
      width = 1;
    } else {
      color = 'rgba(0, 0, 0, 0)',
      width = 0;
    }

    var style = new Style({
      stroke: new Stroke({
        color: color,
        width: width,
      }),
      // fill: new Fill({
      //   color: color,
      // }),
    });

    return style;
  },


}