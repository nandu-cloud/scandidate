import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface InsitutionalListItem {
  userName: string;
  id: number;
  contact: number;
  email:string;
  address: string;
  department: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: InsitutionalListItem[] = [
  {id: 1, userName: 'PES', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 2, userName: 'IOS', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 3, userName: 'GRE', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 4, userName: 'SMT', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 5, userName: 'ANU', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 6, userName: 'JNU', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 7, userName: 'VVIT', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 8, userName: 'RVR', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 9, userName: 'BNI', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'},
  {id: 10, userName: 'SRT', email: 'himaja@gmail.com', contact: 7789876789, address: 'D24J', department: 'email'}
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
        case 'name': return compare(a.userName, b.userName, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'contact': return compare(+a.contact, +b.contact, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'department': return compare(a.department, b.department, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
