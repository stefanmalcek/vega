import { Vehicle } from './../models/vehicle';
import { Make } from '../models/make';
import { KeyValuePair } from '../models/key-value-pair';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<Make[]>('/api/makes');
  }

  getFeatures() {
    return this.http.get<KeyValuePair[]>('/api/features');
  }

  create(vehicle) {
    return this.http.post('api/vehicles', vehicle);
  }

  update(vehicle) {
    return this.http.put('api/vehicles/' + vehicle.id, vehicle);
  }

  getVehicle(id) {
    return this.http.get('api/vehicles/' + id);
  }

  delete(id) {
    return this.http.delete('api/vehicles/' + id);
  }

  getVehicles() {
    return this.http.get<Vehicle[]>('api/vehicles');
  }
}