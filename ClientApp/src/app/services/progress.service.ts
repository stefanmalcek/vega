import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BrowserXhr } from '../../../node_modules/@angular/common/http/src/xhr';

@Injectable()
export class ProgressService {
    private uploadProgress: Subject<any>;

    startTracking() {
        this.uploadProgress = new Subject<any>();
        return this.uploadProgress;
    }

    notify(progress) {
        this.uploadProgress.next(progress);
    }

    endTracking() {
        this.uploadProgress.complete();
    }
}


@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

    constructor(private service: ProgressService) { super(); }

    build(): XMLHttpRequest {
        var xhr: XMLHttpRequest = super.build();

        // xhr.onprogress = (event) => {
        //     this.service.dowloadProgress.next(this.createProgress(event));
        // }

        xhr.upload.onprogress = (event) => {
            this.service.notify(this.createProgress(event));
        }

        xhr.upload.onload = () => {
            this.service.endTracking();
        }

        return xhr;
    }

    private createProgress(event) {
        return {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
        };
    }
}