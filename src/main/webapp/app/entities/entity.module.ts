import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'arb-ticket-my-suffix',
        loadChildren: () => import('./arb-ticket-my-suffix/arb-ticket-my-suffix.module').then(m => m.ArboxArbTicketMySuffixModule)
      },
      {
        path: 'arb-comment-my-suffix',
        loadChildren: () => import('./arb-comment-my-suffix/arb-comment-my-suffix.module').then(m => m.ArboxArbCommentMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArboxEntityModule {}
