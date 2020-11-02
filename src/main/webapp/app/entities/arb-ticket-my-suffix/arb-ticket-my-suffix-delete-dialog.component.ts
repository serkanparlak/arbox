import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';
import { ArbTicketMySuffixService } from './arb-ticket-my-suffix.service';

@Component({
  selector: 'jhi-arb-ticket-my-suffix-delete-dialog',
  templateUrl: './arb-ticket-my-suffix-delete-dialog.component.html'
})
export class ArbTicketMySuffixDeleteDialogComponent {
  arbTicket: IArbTicketMySuffix;

  constructor(
    protected arbTicketService: ArbTicketMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.arbTicketService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'arbTicketListModification',
        content: 'Deleted an arbTicket'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-arb-ticket-my-suffix-delete-popup',
  template: ''
})
export class ArbTicketMySuffixDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ arbTicket }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArbTicketMySuffixDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.arbTicket = arbTicket;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/arb-ticket-my-suffix', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/arb-ticket-my-suffix', { outlets: { popup: null } }]);
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
