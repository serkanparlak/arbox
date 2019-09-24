import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from './comment.service';
import { ArbComment } from 'app/arb/models/comment.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'jhi-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss', '../../../arb.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() ticketId: number;
  comments: ArbComment[];
  createCommentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    commentService.getAllCommentByTicketId(this.ticketId).subscribe(
      (res: HttpResponse<ArbComment[]>) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.createCommentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  createComment() {
    if (this.createCommentForm.invalid) {
      return;
    }
    const comment = new ArbComment();
    comment.isSolution = false;
    comment.date = moment(new Date());
    comment.content = this.createCommentForm.get('content').value;
    comment.ticketId = this.ticketId;
    this.commentService.addComment(comment).subscribe(c => this.comments.push(comment));
  }
}
