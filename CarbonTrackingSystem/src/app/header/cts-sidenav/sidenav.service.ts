import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private refreshSubject = new BehaviorSubject<void>(undefined);

  refresh$ = this.refreshSubject.asObservable();

  refresh() {
    this.refreshSubject.next();
  }
}
