import { Stroke, Style } from 'ol/style';

// Styles for the different representations of the cadastral layers
export const styles = {

    all: new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1.0)',
        width: 2,
      }),
    }),

    ucl: new Style({
      stroke: new Stroke({
        color: 'rgba(122, 0, 0, 1.0)',
        width: 2,
      }),
    }),
  }