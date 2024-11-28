import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  const mockResponse = {
    shows: [{ id: '1', name: 'Test Show' }],
    totalCount: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,   // For mocking HTTP calls
        NgxPaginationModule,      // For paginate pipe
        FormsModule               // Import FormsModule for ngModel
      ],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    spyOn(apiService, 'getInitialShows').and.returnValue(of(mockResponse));
    spyOn(apiService, 'getShows').and.returnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch initial shows on ngOnInit', () => {
    expect(apiService.getInitialShows).toHaveBeenCalled();
    expect(component.items).toEqual(mockResponse.shows);
    expect(component.itemCount).toBe(mockResponse.totalCount);
  });

  it('should fetch shows based on type when filterType is called', () => {
    component.filterType('movie');
    expect(component.type).toBe('movie');
    expect(apiService.getShows).toHaveBeenCalledWith(
      component.currentPage,
      'movie',
      component.searchString
    );
    expect(component.items).toEqual(mockResponse.shows);
  });

  it('should fetch shows on page change', () => {
    const newPage = 2;
    component.pageChange(newPage);

    expect(apiService.getShows).toHaveBeenCalledWith(
      newPage,
      component.type,
      component.searchString,
      component.itemsPerPage
    );
    expect(component.items).toEqual(mockResponse.shows);
    expect(component.currentPage).toBe(newPage);
  });

  it('should update items per page and fetch shows', () => {
    component.itemsPerPage = 20;
    expect(apiService.getShows).toHaveBeenCalledWith(
      1,
      component.type,
      component.searchString,
      20
    );
    expect(component._itemsPerPage).toBe(20);
    expect(component.currentPage).toBe(1);
  });

  it('should format date correctly', () => {
    const formattedDate = component.formatDate('2023-04-26T00:00:00.000Z');
    expect(formattedDate).toBe('Apr 26, 2023');
  });

  it('should trigger search when searchStr is called', () => {
    spyOn(component.searchInput, 'next');
    component.searchString = 'test';
    component.searchEvent();

    expect(component.searchInput.next).toHaveBeenCalledWith('test');
  });

 
});
