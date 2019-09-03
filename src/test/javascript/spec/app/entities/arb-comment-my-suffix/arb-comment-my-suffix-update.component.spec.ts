/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ArboxTestModule } from '../../../test.module';
import { ArbCommentMySuffixUpdateComponent } from 'app/entities/arb-comment-my-suffix/arb-comment-my-suffix-update.component';
import { ArbCommentMySuffixService } from 'app/entities/arb-comment-my-suffix/arb-comment-my-suffix.service';
import { ArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';

describe('Component Tests', () => {
  describe('ArbCommentMySuffix Management Update Component', () => {
    let comp: ArbCommentMySuffixUpdateComponent;
    let fixture: ComponentFixture<ArbCommentMySuffixUpdateComponent>;
    let service: ArbCommentMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ArboxTestModule],
        declarations: [ArbCommentMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArbCommentMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArbCommentMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArbCommentMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArbCommentMySuffix(123);
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
        const entity = new ArbCommentMySuffix();
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
