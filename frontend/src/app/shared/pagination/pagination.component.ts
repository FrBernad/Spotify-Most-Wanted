import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  setPage(page: number) {
    this.changePage.emit(page);
  }

  numRange(start: number, end: number): Array<number> {
    const values = [];
    for (let i = start; i <= end; i++) {
      values.push(i)
    }
    return values;
  }

}
