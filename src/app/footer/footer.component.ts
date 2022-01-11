import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LayersService } from 'src/layers/layers.service';
// import { styles } from '../configs/styles.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private layersService: LayersService,
    private store: Store) { }

  ngOnInit(): void {
  }

  onClickChangeStyle(layerName: string) {
    // For testing
    this.layersService.updateStyle(layerName);
  }

}
