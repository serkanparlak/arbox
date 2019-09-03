import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';
import { ArbCommentMySuffixService } from './arb-comment-my-suffix.service';

@Component({
  selector: 'jhi-arb-comment-my-suffix-delete-dialog',
  templateUrl: './arb-comment-my-suffix-delete-dialog.component.html'
})
export class ArbCommentMySuffixDeleteDialogComponent {
  arbComment: IArbCommentMySuffix;

  constructor(
    protected arbCommentService: ArbCommentMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.arbCommentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'arbCommentListModification',
        content: 'Deleted an arbComment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-arb-comment-my-suffix-delete-popup',
  template: ''
})
export class ArbCommentMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ arbComment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArbCommentMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.arbComment = arbComment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/arb-comment-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/arb-comment-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
