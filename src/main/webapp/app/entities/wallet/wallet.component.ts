import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { AccountService } from 'app/core';
import { WalletService } from './wallet.service';

@Component({
    selector: 'jhi-wallet',
    templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit, OnDestroy {
    wallets: IWallet[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected walletService: WalletService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.walletService.query().subscribe(
            (res: HttpResponse<IWallet[]>) => {
                this.wallets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWallets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWallet) {
        return item.id;
    }

    registerChangeInWallets() {
        this.eventSubscriber = this.eventManager.subscribe('walletListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
