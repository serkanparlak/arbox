import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArboxSharedModule } from 'app/shared';
import {
  ArbCommentMySuffixComponent,
  ArbCommentMySuffixDetailComponent,
  ArbCommentMySuffixUpdateComponent,
  ArbCommentMySuffixDeletePopupComponent,
  ArbCommentMySuffixDeleteDialogComponent,
  arbCommentRoute,
  arbCommentPopupRoute
} from './';

const ENTITY_STATES = [...arbCommentRoute, ...arbCommentPopupRoute];

@NgModule({
  imports: [ArboxSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ArbCommentMySuffixComponent,
    ArbCommentMySuffixDetailComponent,
    ArbCommentMySuffixUpdateComponent,
    ArbCommentMySuffixDeleteDialogComponent,
    ArbCommentMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ArbCommentMySuffixComponent,
    ArbCommentMySuffixUpdateComponent,
    ArbCommentMySuffixDeleteDialogComponent,
    ArbCommentMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArboxArbCommentMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
