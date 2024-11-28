// src/app/components/homepage/homepage.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  items: any[] = [];
  itemCount: number = 0;
  currentPage: number = 1;
  searchString: string = '';
  _itemsPerPage:number = 15;
  type: string = '';
  searchInput = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.searchInput
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => {
          return this.apiService.getShows(this.currentPage, this.type, query);
        })
      )
      .subscribe((response: any) => {
        this.items = response.shows;
        this.itemCount = response.totalCount;
      });
  }

  ngOnInit() {   
    this.apiService.getInitialShows().subscribe((response: any) => {
      this.items = response.shows;
      this.itemCount = response.totalCount;
    });
  }

  searchEvent() {
    this.searchInput.next(this.searchString);
  }

  filterType(type: string) {
    this.type = type;
    this.apiService.getShows(this.currentPage, this.type, this.searchString).subscribe((response: any) => {
      this.items = response.shows;
      this.itemCount = response.totalCount;
    });
  }

  pageChange(p: number) {
    this.apiService.getShows(p, this.type, this.searchString, this.itemsPerPage).subscribe((response: any) => {
      this.items = response.shows;
      this.itemCount = response.totalCount;
    });
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(value: number) {
    this._itemsPerPage = value;    
    this.currentPage = 1;
    this.pageChange(1); // Call the method whenever value changes

  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }  
}
