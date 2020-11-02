/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArboxTestModule } from '../../../test.module';
import { ArbCommentMySuffixDetailComponent } from 'app/entities/arb-comment-my-suffix/arb-comment-my-suffix-detail.component';
import { ArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';

describe('Component Tests', () => {
  describe('ArbCommentMySuffix Management Detail Component', () => {
    let comp: ArbCommentMySuffixDetailComponent;
    let fixture: ComponentFixture<ArbCommentMySuffixDetailComponent>;
    const route = ({ data: of({ arbComment: new ArbCommentMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ArboxTestModule],
        declarations: [ArbCommentMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArbCommentMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArbCommentMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.arbComment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
