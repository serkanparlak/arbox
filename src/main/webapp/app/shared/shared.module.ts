import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArboxSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ArboxSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ArboxSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArboxSharedModule {
  static forRoot() {
    return {
      ngModule: ArboxSharedModule
    };
  }
}
