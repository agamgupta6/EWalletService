import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from './wallet.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-wallet-update',
    templateUrl: './wallet-update.component.html'
})
export class WalletUpdateComponent implements OnInit {
    wallet: IWallet;
    isSaving: boolean;

    users: IUser[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected walletService: WalletService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wallet }) => {
            this.wallet = wallet;
            this.date = this.wallet.date != null ? this.wallet.date.format(DATE_TIME_FORMAT) : null;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.wallet.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.wallet.id !== undefined) {
            this.subscribeToSaveResponse(this.walletService.update(this.wallet));
        } else {
            this.subscribeToSaveResponse(this.walletService.create(this.wallet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWallet>>) {
        result.subscribe((res: HttpResponse<IWallet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
