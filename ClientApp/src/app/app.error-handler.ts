import * as Raven from 'raven-js';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastaService } from "../../node_modules/ngx-toasta";

export class AppErrorHandler implements ErrorHandler {

    constructor(private ngZone: NgZone,
        @Inject(ToastaService) private toastaService: ToastaService) { }

    handleError(error: any): void {
        if (!isDevMode())
            Raven.captureException(error.originalError);
        else
            throw error;

        this.ngZone.run(() => {
            this.toastaService.error({
                title: 'Error',
                msg: 'An unexpected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
    }
}