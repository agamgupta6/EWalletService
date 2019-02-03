import { NgModule } from '@angular/core';

import { EWalletServiceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EWalletServiceSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EWalletServiceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EWalletServiceSharedCommonModule {}
