import { Make } from '../../models/make';
import { KeyValuePair } from '../../models/key-value-pair';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Make[];
  models: KeyValuePair[];
  features: KeyValuePair[];
  vehicle: any = {};

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.vehicleService.getFeatures()
      .subscribe(features => this.features = features);
  }

  onMakeChanged() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
