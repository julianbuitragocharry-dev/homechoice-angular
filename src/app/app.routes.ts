import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './property/pages/properties/properties.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { DetailsComponent } from './property/pages/details/details.component';
import { DashboardComponent } from './dashboard/pages/dashboard/dashboard.component';
import { ListPropertiesComponent } from './property/pages/list/list.component';
import { authGuard } from './auth/guards/auth.guard';
import { CreatePropertyComponent } from './property/pages/create/create.component';
import { EditPropertyComponent } from './property/pages/edit/edit.component';
import { NullsComponent } from './property/pages/nulls/nulls.component';
import { MylistComponent } from './property/pages/mylist/mylist.component';
import { CreateUserComponent } from './user/pages/create/create.component';
import { ListUsersComponent } from './user/pages/list/list.component';
import { EditUserComponent } from './user/pages/edit/edit.component';
import { ListAgentsComponent } from './agent/pages/list/list.component';
import { EditAgentComponent } from './agent/pages/edit/edit.component';
import { CreateAgentComponent } from './agent/pages/create/create.component';
import { NotfoundComponent } from './shared/pages/notfound/notfound.component';
import { UnauthorizedComponent } from './shared/pages/unauthorized/unauthorized.component';
import { CrashComponent } from './shared/pages/crash/crash.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'properties', component: PropertiesComponent },
    { path: 'properties/:id', component: DetailsComponent },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'properties', pathMatch: 'full' },
            { path: 'properties', component: ListPropertiesComponent },
            { path: 'create-property', component: CreatePropertyComponent },
            { path: 'edit-property/:id', component: EditPropertyComponent },
            { path: 'frozen-properties', component: NullsComponent },
            { path: 'my-properties', component: MylistComponent},
            { path: 'users', component: ListUsersComponent },
            { path: 'edit-user/:id', component: EditUserComponent},
            { path: 'create-user', component: CreateUserComponent },
            { path: 'agents', component: ListAgentsComponent },
            { path: 'edit-agent/:id', component: EditAgentComponent },
            { path: 'create-agent', component: CreateAgentComponent}
        ]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: 'crash', component: CrashComponent },
    { path: '**', component: NotfoundComponent }
];
