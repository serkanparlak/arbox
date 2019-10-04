import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          // loadChildren: () => import('./admin/admin.module').then(m => m.ArboxAdminModule)
          loadChildren: './admin/admin.module#ArboxAdminModule'
        },
        {
          path: 'arb',
          // loadChildren: () => import('./arb/arb.module').then(m => m.ArbModule)
          loadChildren: './arb/arb.module#ArbModule'
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class ArboxAppRoutingModule {}
