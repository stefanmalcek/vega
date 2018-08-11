
import * as _ from 'underscore';
import { Vehicle } from './../../models/vehicle';
import { Make } from '../../models/make';
import { KeyValuePair } from '../../models/key-value-pair';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SaveVehicle } from '../../models/save-vehicle';
import { ToastaService } from 'ngx-toasta';

@Component({
  selector: 'vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Make[];
  models: KeyValuePair[];
  features: KeyValuePair[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastaService: ToastaService) {

    route.params.subscribe(p => {
      if (p['id'])
        this.vehicle.id = +p['id'];
    })
  }

  ngOnInit() {
    var sources: any[] = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  onMakeChanged() {
    this.populateModels();
    delete this.vehicle.modelId;
  }
  onFeatureToggle(featureId, e) {
    if (e.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id)
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastaService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        })
    else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => {
          this.toastaService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully created.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    }
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        })
    }
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
