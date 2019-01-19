import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import * as faker from 'faker';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { TableVirtualScrollStrategy } from './table-vs-strategy.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

/**
 * @title Table with selection
 */
@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: Observable<Array<any>>;
  selection = new SelectionModel<PeriodicElement>(true, []);

  rows: Observable<Array<any>> = of(this.createData(1000));
  gridHeight = 400;
  @ViewChild('viewport')
  viewport: any;

  ngOnInit(): void {
    this.dataSource = combineLatest([this.rows, this.viewport.renderedRangeStream]).pipe(
      map((value: any) => {
        return value[0].slice(value[1].start, value[1].end);
      })
    );
    // this.dataSource.sort = this.sort;
  }

  createData(length: number) {
    return Array.from({length: length}, (a, b) => {
      return {
        name: faker.name.firstName(),
        position: b + 1,
        symbol: faker.name.prefix(),
        weight: faker.random.number(100)
      };
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    //   this.selection.clear() :
      // this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
