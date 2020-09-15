import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserListItem {
  userName: string;
  id: number;
  dob: number;
  contact: number;
  code: string;
  status: string;
  userOrg: string;
  userInst: string;
  linkedUsers: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserListItem[] = [
  // tslint:disable-next-line: max-line-length
  {id: 1, userName: 'Swapna', dob: 1979, contact: 7789876789, code: 'D24J', status: 'Active',
   userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 2, userName: 'Sri', dob: 1989, contact: 8908656543, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 3, userName: 'Grany', dob: 1949, contact: 9978456434, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 4, userName: 'Navya', dob: 1989, contact: 8943545345, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 5, userName: 'Anusri', dob: 1980, contact: 7890667890, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 6, userName: 'Hema', dob: 1999, contact: 8789023456, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 7, userName: 'Navya', dob: 1979, contact: 8886578974, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 8, userName: 'Ranbi', dob: 1987, contact: 9994056789, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 9, userName: 'Bavani', dob: 1970, contact: 6789034568, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3},
  {id: 10, userName: 'Harini', dob: 1991, contact: 6578509876, code: 'D24J', status: 'Active',
  userOrg: 'None', userInst: 'None', linkedUsers: 3}
];

/**
 * Data source for the UserList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserListDataSource extends DataSource<UserListItem> {
  data: UserListItem[] = EXAMPLE_DATA;
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
  connect(): Observable<UserListItem[]> {
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
  private getPagedData(data: UserListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'userName': return compare(a.userName, b.userName, isAsc);
        case 'dob': return compare(+a.dob, +b.dob, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'contact': return compare(+a.contact, +b.contact, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'userOrg': return compare(a.userOrg, b.userOrg, isAsc);
        case 'userInst': return compare(a.userInst, b.userInst, isAsc);
        case 'linkedUsers': return compare(+a.linkedUsers, +b.linkedUsers, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
