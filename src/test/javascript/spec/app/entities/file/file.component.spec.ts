/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EWalletServiceTestModule } from '../../../test.module';
import { FileComponent } from 'app/entities/file/file.component';
import { FileService } from 'app/entities/file/file.service';
import { File } from 'app/shared/model/file.model';

describe('Component Tests', () => {
    describe('File Management Component', () => {
        let comp: FileComponent;
        let fixture: ComponentFixture<FileComponent>;
        let service: FileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EWalletServiceTestModule],
                declarations: [FileComponent],
                providers: []
            })
                .overrideTemplate(FileComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FileService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new File(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.files[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
