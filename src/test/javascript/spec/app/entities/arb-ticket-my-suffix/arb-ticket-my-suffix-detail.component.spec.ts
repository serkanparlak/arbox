/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArboxTestModule } from '../../../test.module';
import { ArbTicketMySuffixDetailComponent } from 'app/entities/arb-ticket-my-suffix/arb-ticket-my-suffix-detail.component';
import { ArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';

describe('Component Tests', () => {
  describe('ArbTicketMySuffix Management Detail Component', () => {
    let comp: ArbTicketMySuffixDetailComponent;
    let fixture: ComponentFixture<ArbTicketMySuffixDetailComponent>;
    const route = ({ data: of({ arbTicket: new ArbTicketMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ArboxTestModule],
        declarations: [ArbTicketMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArbTicketMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArbTicketMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.arbTicket).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
