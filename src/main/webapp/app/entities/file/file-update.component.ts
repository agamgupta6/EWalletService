import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFile } from 'app/shared/model/file.model';
import { FileService } from './file.service';
import { IUser, UserService } from 'app/core';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction';

@Component({
    selector: 'jhi-file-update',
    templateUrl: './file-update.component.html'
})
export class FileUpdateComponent implements OnInit {
    file: IFile;
    isSaving: boolean;

    users: IUser[];

    transactions: ITransaction[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected fileService: FileService,
        protected userService: UserService,
        protected transactionService: TransactionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ file }) => {
            this.file = file;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.transactionService.query().subscribe(
            (res: HttpResponse<ITransaction[]>) => {
                this.transactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.file.id !== undefined) {
            this.subscribeToSaveResponse(this.fileService.update(this.file));
        } else {
            this.subscribeToSaveResponse(this.fileService.create(this.file));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFile>>) {
        result.subscribe((res: HttpResponse<IFile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackTransactionById(index: number, item: ITransaction) {
        return item.id;
    }
}
