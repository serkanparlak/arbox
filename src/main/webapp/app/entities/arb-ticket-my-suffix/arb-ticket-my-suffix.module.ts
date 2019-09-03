import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ArboxSharedModule } from 'app/shared';
import {
  ArbTicketMySuffixComponent,
  ArbTicketMySuffixDetailComponent,
  ArbTicketMySuffixUpdateComponent,
  ArbTicketMySuffixDeletePopupComponent,
  ArbTicketMySuffixDeleteDialogComponent,
  arbTicketRoute,
  arbTicketPopupRoute
} from './';

const ENTITY_STATES = [...arbTicketRoute, ...arbTicketPopupRoute];

@NgModule({
  imports: [ArboxSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ArbTicketMySuffixComponent,
    ArbTicketMySuffixDetailComponent,
    ArbTicketMySuffixUpdateComponent,
    ArbTicketMySuffixDeleteDialogComponent,
    ArbTicketMySuffixDeletePopupComponent
  ],
  entryComponents: [
    ArbTicketMySuffixComponent,
    ArbTicketMySuffixUpdateComponent,
    ArbTicketMySuffixDeleteDialogComponent,
    ArbTicketMySuffixDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArboxArbTicketMySuffixModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
