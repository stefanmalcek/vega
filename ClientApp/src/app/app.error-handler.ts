import * as Raven from 'raven-js';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastaService } from "ngx-toasta";

export class AppErrorHandler implements ErrorHandler {

    constructor(private ngZone: NgZone,
        @Inject(ToastaService) private toastaService: ToastaService) { }

    handleError(error: any): void {
        this.ngZone.run(() => {
            this.toastaService.error({
                title: 'Error',
                msg: 'An unexpected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });

        console.log(error);

        if (!isDevMode())
            Raven.captureException(error.originalError);
        else
            throw error;
    }
}