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
}