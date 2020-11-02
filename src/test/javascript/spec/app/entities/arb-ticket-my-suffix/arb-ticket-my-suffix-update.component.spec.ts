/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ArboxTestModule } from '../../../test.module';
import { ArbTicketMySuffixUpdateComponent } from 'app/entities/arb-ticket-my-suffix/arb-ticket-my-suffix-update.component';
import { ArbTicketMySuffixService } from 'app/entities/arb-ticket-my-suffix/arb-ticket-my-suffix.service';
import { ArbTicketMySuffix } from 'app/shared/model/arb-ticket-my-suffix.model';

describe('Component Tests', () => {
  describe('ArbTicketMySuffix Management Update Component', () => {
    let comp: ArbTicketMySuffixUpdateComponent;
    let fixture: ComponentFixture<ArbTicketMySuffixUpdateComponent>;
    let service: ArbTicketMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ArboxTestModule],
        declarations: [ArbTicketMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArbTicketMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArbTicketMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArbTicketMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArbTicketMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArbTicketMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
