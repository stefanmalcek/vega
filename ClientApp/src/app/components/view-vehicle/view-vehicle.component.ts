import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastaService } from 'ngx-toasta';
import { PhotoService } from '../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';

@Component({
  selector: 'view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private toastaService: ToastaService,
    private vehicleService: VehicleService,
    private photoService: PhotoService
  ) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(_ => this.router.navigate(['/vehicles']));
    }
  }

  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    const file = nativeElement.files[0];
    nativeElement.value = '';

    this.photoService.upload(this.vehicleId, file)
      .subscribe((progress) => {
        this.zone.run(() => this.progress = progress);

        if (progress.file) {
          this.photos.push(progress.file);
        }
      },
        err => this.toastaService.error({
          title: 'Error',
          msg: err.error,
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        })
      );
  }
}
