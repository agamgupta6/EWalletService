/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EWalletServiceTestModule } from '../../../test.module';
import { WalletComponent } from 'app/entities/wallet/wallet.component';
import { WalletService } from 'app/entities/wallet/wallet.service';
import { Wallet } from 'app/shared/model/wallet.model';

describe('Component Tests', () => {
    describe('Wallet Management Component', () => {
        let comp: WalletComponent;
        let fixture: ComponentFixture<WalletComponent>;
        let service: WalletService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EWalletServiceTestModule],
                declarations: [WalletComponent],
                providers: []
            })
                .overrideTemplate(WalletComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WalletComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WalletService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Wallet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.wallets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
