import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommentComponent } from 'app/arb/comment/comment.component';
import { TicketComponent } from 'app/arb/ticket/ticket.component';
import { arb_routes } from 'app/arb/arb.route';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { LeftMenuComponent } from './layouts/left-menu/left-menu.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@NgModule({
  imports: [RouterModule.forChild(arb_routes), FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  declarations: [
    CommentComponent,
    TicketComponent,
    LoginComponent,
    RegisterComponent,
    CreateTicketComponent,
    TicketDetailComponent,
    CreateCommentComponent,
    LeftMenuComponent,
    NavbarComponent
  ],
  exports: [LeftMenuComponent, NavbarComponent],
  providers: []
})
export class ArbModule {}