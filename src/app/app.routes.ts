import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ProDetailsComponent } from './pages/pro-details/pro-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'properties', component: PropertiesComponent },
    { path: 'properties/:id', component: ProDetailsComponent}
];
