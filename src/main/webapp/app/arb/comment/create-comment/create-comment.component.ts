import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'app/arb/comment/comment.service';
import { ArbComment } from 'app/arb/models/comment.model';
import * as moment from 'moment';
import { ArbTicket } from 'app/arb/models/ticket.model';

@Component({
  selector: 'jhi-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss', '../../arb.component.scss']
})
export class CreateCommentComponent implements OnInit {
  iSolveBtnActive = true;
  @Input() ticketId: number;
  @Input() doIhaveAuthorityToResolve: any;
  @Output() commentCreated = new EventEmitter<ArbComment>();
  createCommentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentService: CommentService) {}

  ngOnInit() {
    this.createCommentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  createComment(isSolution = false) {
    if (!isSolution && this.createCommentForm.invalid) {
      return;
    }
    const comment = new ArbComment();
    comment.isSolution = isSolution;
    comment.date = moment(new Date());
    comment.content = this.createCommentForm.get('content').value;
    comment.ticketId = this.ticketId;

    this.commentService.addComment(comment).subscribe(c => {
      this.createCommentForm.reset();
      this.commentCreated.emit(c);
    });
  }

  onSolveComment() {
    this.createComment(true);
  }
}
