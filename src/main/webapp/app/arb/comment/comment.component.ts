import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommentService } from './comment.service';
import { ArbComment } from 'app/arb/models/comment.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ArbTicket } from 'app/arb/models/ticket.model';

@Component({
  selector: 'jhi-arb-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['../arb.component.scss', '../arb.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() ticket: ArbTicket;
  @Output() solveTicket = new EventEmitter<ArbTicket>();
  @ViewChild('lastComment', { static: false }) lastComment: ElementRef<HTMLDivElement>;
  comments: ArbComment[];

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.commentService.getAllCommentByTicketId(this.ticket.id).subscribe(
      (res: HttpResponse<ArbComment[]>) => {
        this.comments = res.body;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  commentCreated(comment: ArbComment) {
    if (comment.isSolution) {
      this.ticket.state = false;
      this.solveTicket.emit(this.ticket);
    }
    this.comments.push(comment);
    setTimeout(() => {
      this.lastComment.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}
