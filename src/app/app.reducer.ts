import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/accions/ui.reducer';
import * as fromAuth from './auth/actions/auth.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
  //ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}

//export const appReducers: ActionReducerMap<AppState> = {
export const appReducers: ActionReducerMap<AppState, any> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  //ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer,
}
