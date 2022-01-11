import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UpdateCadastreTilesLoaded } from './layers.actions';

export interface LayersStateModel {
  cadastreTilesLoaded: boolean;
}

@State<LayersStateModel>({
  name: 'layers',
  defaults: {
    cadastreTilesLoaded: false,
  }
})
@Injectable()

export class LayersState {

  @Selector()
  public static getState(state: LayersStateModel) {
    return state;
  }

  @Action(UpdateCadastreTilesLoaded)
  updateCadastreTilesLoaded({patchState}: StateContext<LayersStateModel>, { payload }: UpdateCadastreTilesLoaded) {
    patchState({
      cadastreTilesLoaded: payload,
  })

    
  }

  
}

