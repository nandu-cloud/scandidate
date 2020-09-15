import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface InsitutionalListItem {
  institutename: string;
  id: number;
  active: number;
  contact: number;
  code: string;
  status: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: InsitutionalListItem[] = [
  {id: 1, institutename: 'PES', active: 1979, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 2, institutename: 'IOS', active: 1989, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 3, institutename: 'GRE', active: 1949, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 4, institutename: 'SMT', active: 1989, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 5, institutename: 'ANU', active: 1980, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 6, institutename: 'JNU', active: 1999, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 7, institutename: 'VVIT', active: 1979, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 8, institutename: 'RVR', active: 1987, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 9, institutename: 'BNI', active: 1970, contact: 7789876789, code: 'D24J', status: 'Active'},
  {id: 10, institutename: 'SRT', active: 1991, contact: 7789876789, code: 'D24J', status: 'Active'}
];

/**
 * Data source for the InsitutionalList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InsitutionalListDataSource extends DataSource<InsitutionalListItem> {
  data: InsitutionalListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InsitutionalListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InsitutionalListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InsitutionalListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.institutename, b.institutename, isAsc);
        case 'active': return compare(+a.active, +b.active, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'contact': return compare(+a.contact, +b.contact, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
