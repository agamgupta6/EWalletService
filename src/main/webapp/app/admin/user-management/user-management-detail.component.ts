import { UserMgmtDataDialogComponent } from './user-management-data-dialog.component';
import { UserMgmtDeleteDialogComponent } from 'app/admin';
import { JhiAlertService } from 'ng-jhipster';
import { IFile } from './../../shared/model/file.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FileService } from './../../entities/file/file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User, UserService } from 'app/core';

@Component({
    selector: 'jhi-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;
    files: IFile[];
    fileData: any = [];
    closeResult: string;
    error: any;
    success: any;
    constructor(
        private route: ActivatedRoute,
        private fileService: FileService,
        protected jhiAlertService: JhiAlertService,
        private modalService: NgbModal,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.loadAllFiles();
    }

    loadAllFiles() {
        this.fileService.query().subscribe(
            (res: HttpResponse<IFile[]>) => {
                this.files = res.body;
                this.files = this.files.filter(file => {
                    return file.user.login === this.user.login;
                });
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    getFileData(repoId: string, filename: string) {
        this.fileService.fileData(repoId).subscribe(
            (res: HttpResponse<any>) => {
                this.fileData.push(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getAllFileData() {
        this.fileData = [];
        this.files.forEach(file => {
            this.getFileData(file.repositoryId, file.demo);
        });
    }

    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    showImage(data: any) {
        const modalRef = this.modalService.open(UserMgmtDataDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.data = data;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    setActive(user, isActivated) {
        user.activated = isActivated;

        this.userService.update(user).subscribe(response => {
            if (response.status === 200) {
                this.error = null;
                this.success = 'OK';
            } else {
                this.success = null;
                this.error = 'ERROR';
            }
        });
    }
}
