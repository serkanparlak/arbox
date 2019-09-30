import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationError, ActivatedRouteSnapshot, NavigationStart } from '@angular/router';

import { AuthServerProvider, JhiLanguageHelper, LoginService } from 'app/core';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  current_url: string;
  adminIsActive = true; // admin or blank // blank : arb interface
  constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router, private loginService: LoginService) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'arboxApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // custom template or admin template check
      if (event instanceof NavigationStart) {
        this.current_url = event.url;
        if (this.current_url.split('/')[1] === 'arb') {
          this.adminIsActive = false;
        }
      }

      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }

      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }

  get isAuthenticate(): boolean {
    // const token = this.auth.getToken();
    return this.loginService.accountService.isAuthenticated();
  }
}
