import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ValidationPageComponent } from './validation-page/validation-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'confirm', component: ValidationPageComponent },
  { path: 'edit', component: HomePageComponent },
];
