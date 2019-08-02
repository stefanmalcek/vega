import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, last } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }

    upload(vehicleId: number, photo: any) {
        const formData = new FormData();
        formData.append('file', photo);

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map(event => this.getEventMessage(event as HttpEvent<any>, photo)));
    }

    getPhotos(vehicleId: number) {
        return this.http.get<any[]>(`/api/vehicles/${vehicleId}/photos`);
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
            case HttpEventType.Sent:
                console.log(`Uploading file "${file.name}" of size ${file.size}.`);
                return { percentage: 0 };
            case HttpEventType.UploadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File "${file.name}" is ${percentDone}% uploaded.`);
                return { percentage: percentDone };
            case HttpEventType.Response:
                console.log(`File "${file.name}" was completely uploaded!`);
                return { percentage: 100, file: event.body };
            default:
                console.log(`File "${file.name}" surprising upload event: ${event.type}.`);
                return { percentage: 100 };
        }
    }
}
