import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageCanActivateGuard } from '../guards/search-page-can-activate.guard';
import { SearchVehicleComponent } from './search-vehicle/search-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: SearchVehicleComponent
  }, {
    path: 'search',
    component: SearchVehicleComponent,
    canActivate: [SearchPageCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SearchPageCanActivateGuard]
})
export class SearchRoutingModule { }
