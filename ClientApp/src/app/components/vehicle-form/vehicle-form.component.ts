import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastaService } from 'ngx-toasta';
import { forkJoin } from 'rxjs';
import { KeyValuePair } from '../../models/key-value-pair';
import { Make } from '../../models/make';
import { SaveVehicle } from '../../models/save-vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';

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
    route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastaService: ToastaService
  ) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit() {
    const sources: any[] = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(sources).subscribe((result: any[]) => {
      this.makes = result[0];
      this.features = result[1];

      if (this.vehicle.id) {
        this.setVehicle(result[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(['/home']);
      }
    });
  }

  onMakeChanged() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId: number, e: any) {
    if (e.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    const result$ = (this.vehicle.id)
      ? this.vehicleService.update(this.vehicle)
      : this.vehicleService.create(this.vehicle);

    result$.subscribe(vehicle => {
      this.toastaService.success({
        title: 'Success',
        msg: 'Data was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/vehicles/', vehicle.id]);
    });
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(_ => this.router.navigate(['/home']));
    }
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(f => f.id);
  }

  private populateModels() {
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
