import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { ProgressService, BrowserXhrWithProgress } from './services/progress.service';
import { PaginationComponent } from './components/shared/pagination.component';
import * as Raven from 'raven-js';
import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastaModule } from 'ngx-toasta';
import { ChartModule} from 'angular2-chartjs';

import { VehicleService } from './services/vehicle.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { BrowserXhr } from '../../node_modules/@angular/common/http/src/xhr';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';

Raven
  .config('https://af021768863041a6a797d219d3b882ed@sentry.io/1255704')
  .install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AdminComponent
    ],
  imports: [
    ChartModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    ToastaModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    //{ provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    AuthService,
    VehicleService,
    PhotoService,
    AuthGuard,
    AdminAuthGuard
    //ProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
