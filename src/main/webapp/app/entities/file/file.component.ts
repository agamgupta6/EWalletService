import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFile } from 'app/shared/model/file.model';
import { AccountService } from 'app/core';
import { FileService } from './file.service';

@Component({
    selector: 'jhi-file',
    templateUrl: './file.component.html'
})
export class FileComponent implements OnInit, OnDestroy {
    files: IFile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected fileService: FileService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.fileService.query().subscribe(
            (res: HttpResponse<IFile[]>) => {
                this.files = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFile) {
        return item.id;
    }

    registerChangeInFiles() {
        this.eventSubscriber = this.eventManager.subscribe('fileListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
