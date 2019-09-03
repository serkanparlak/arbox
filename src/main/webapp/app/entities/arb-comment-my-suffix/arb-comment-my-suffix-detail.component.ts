import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArbCommentMySuffix } from 'app/shared/model/arb-comment-my-suffix.model';

@Component({
  selector: 'jhi-arb-comment-my-suffix-detail',
  templateUrl: './arb-comment-my-suffix-detail.component.html'
})
export class ArbCommentMySuffixDetailComponent implements OnInit {
  arbComment: IArbCommentMySuffix;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ arbComment }) => {
      this.arbComment = arbComment;
    });
  }

  previousState() {
    window.history.back();
  }
}
