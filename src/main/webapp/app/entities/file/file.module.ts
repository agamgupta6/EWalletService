import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EWalletServiceSharedModule } from 'app/shared';
import { EWalletServiceAdminModule } from 'app/admin/admin.module';
import {
    FileComponent,
    FileDetailComponent,
    FileUpdateComponent,
    FileDeletePopupComponent,
    FileDeleteDialogComponent,
    fileRoute,
    filePopupRoute
} from './';

const ENTITY_STATES = [...fileRoute, ...filePopupRoute];

@NgModule({
    imports: [EWalletServiceSharedModule, EWalletServiceAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FileComponent, FileDetailComponent, FileUpdateComponent, FileDeleteDialogComponent, FileDeletePopupComponent],
    entryComponents: [FileComponent, FileUpdateComponent, FileDeleteDialogComponent, FileDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EWalletServiceFileModule {}
