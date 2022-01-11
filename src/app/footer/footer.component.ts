import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LayersService } from 'src/layers/layers.service';

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

  onClickChangeStyle() {
    // For testing
    this.layersService.updateStyle('ucl');
  }

}
