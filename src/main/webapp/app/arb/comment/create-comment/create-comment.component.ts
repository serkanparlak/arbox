import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'app/arb/comment/comment.service';
import { ArbComment } from 'app/arb/models/comment.model';
import * as moment from 'moment';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'jhi-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss', '../../arb.component.scss'],
  animations: [
    trigger('solveBtnAnimate', [
      state(
        'show',
        style({
          transform: 'translateX(0) scale(1)'
        })
      ),
      state(
        'cancel',
        style({
          display: 'none'
        })
      ),
      state(
        'confirm',
        style({
          display: 'none'
        })
      ),
      transition('show => confirm', [
        animate(
          300,
          style({
            transform: 'translateX(100px) scale(0)',
            opacity: 0
          })
        )
      ]),
      transition('cancel => show', [
        style({ display: 'block', opacity: 0, transform: 'scale(0)' }),
        animate(200, style({ opacity: 1, transform: 'scale(1.5)' })),
        animate(100)
      ]),
      transition('show => cancel', [animate(300, style({ opacity: 0, transform: 'translateX(-100px) scale(0)' }))])
    ]),

    trigger('mainBtnGroup', [
      state('show', style({ display: 'block', opacity: 1 })),
      state('hide', style({ display: 'none', opacity: 0 })),
      transition('void => show', [style({ opacity: 0 }), animate(300, style({}))]),
      transition('show => hide', [style({ position: 'absolute' }), animate(300, style({ opacity: 0 }))]),
      transition('hide => show', [style({ display: 'block', position: 'relative' }), animate(300, style({ opacity: 1 }))])
    ])
  ]
})
export class CreateCommentComponent implements OnInit {
  solveBtnState = 'cancel';
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
    this.solveBtnState = 'confirm';
    this.createComment(true);
  }

  onSolveFirst() {
    this.iSolveBtnActive = !this.iSolveBtnActive;
    this.solveBtnState = 'show';
  }

  onSolveCancel() {
    this.solveBtnState = 'cancel';
    setTimeout(() => {
      this.iSolveBtnActive = !this.iSolveBtnActive;
    }, 300);
  }
}
