import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, last } from 'rxjs/operators';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }

    upload(vehicleId, photo) {
        var formData = new FormData();
        formData.append('file', photo);

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData);
        //    reportProgress: true}); 
        //}).pipe(
        //     map(event => this.getEventMessage(event as HttpEvent<any>, photo)),
        //     tap(message => this.showProgress(message)),
        //     last(), // return last (completed) message to caller
        // );
    }

    getPhotos(vehicleId) {
        return this.http.get<any[]>(`/api/vehicles/${vehicleId}/photos`);
    }

    private getEventMessage(event: HttpEvent<any>, file: File) {
        switch (event.type) {
            case HttpEventType.Sent:
                return `Uploading file "${file.name}" of size ${file.size}.`;

            case HttpEventType.UploadProgress:
                // Compute and show the % done:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `File "${file.name}" is ${percentDone}% uploaded.`;

            case HttpEventType.Response:
                return `File "${file.name}" was completely uploaded!`;

            default:
                return `File "${file.name}" surprising upload event: ${event.type}.`;
        }
    }

    private showProgress(arg0: any): any {
        console.log(arg0);
    }
}