import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EWalletServiceWalletModule } from './wallet/wallet.module';
import { EWalletServiceFileModule } from './file/file.module';
import { EWalletServiceTransactionModule } from './transaction/transaction.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EWalletServiceWalletModule,
        EWalletServiceFileModule,
        EWalletServiceTransactionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EWalletServiceEntityModule {}
