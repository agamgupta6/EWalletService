import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { File } from 'app/shared/model/file.model';
import { FileService } from './file.service';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';
import { FileUpdateComponent } from './file-update.component';
import { FileDeletePopupComponent } from './file-delete-dialog.component';
import { IFile } from 'app/shared/model/file.model';

@Injectable({ providedIn: 'root' })
export class FileResolve implements Resolve<IFile> {
    constructor(private service: FileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<File> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<File>) => response.ok),
                map((file: HttpResponse<File>) => file.body)
            );
        }
        return of(new File());
    }
}

export const fileRoute: Routes = [
    {
        path: 'file',
        component: FileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'file/:id/view',
        component: FileDetailComponent,
        resolve: {
            file: FileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'file/new',
        component: FileUpdateComponent,
        resolve: {
            file: FileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'file/:id/edit',
        component: FileUpdateComponent,
        resolve: {
            file: FileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filePopupRoute: Routes = [
    {
        path: 'file/:id/delete',
        component: FileDeletePopupComponent,
        resolve: {
            file: FileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Files'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
