import { Vehicle } from './../models/vehicle';
import { Make } from '../models/make';
import { KeyValuePair } from '../models/key-value-pair';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = 'api/vehicles';

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<Make[]>('/api/makes');
  }

  getFeatures() {
    return this.http.get<KeyValuePair[]>('/api/features');
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle);
  }

  update(vehicle) {
    return this.http.put(this.vehiclesEndpoint + vehicle.id, vehicle);
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + id);
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + id);
  }

  getVehicles(filter) {
    return this.http.get<Vehicle[]>(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }
}