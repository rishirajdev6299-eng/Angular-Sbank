import { Routes } from '@angular/router';
import { DashsbankComponent } from './dashsbank/dashsbank';
import { LoginsbankComponent } from './loginsbank/loginsbank';
export const routes: Routes = [

  { path: '', component: LoginsbankComponent },
  { path: 'dashboard', component: DashsbankComponent }
];
