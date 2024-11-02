import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './property/pages/properties/properties.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { DetailsComponent } from './property/pages/details/details.component';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { ListComponent } from './property/pages/list/list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'properties', component: PropertiesComponent },
    { path: 'properties/:id', component: DetailsComponent },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'properties', pathMatch: 'full' },
            { path: 'properties', component: ListComponent },
        ]
    },
];
