import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailComponent } from './detail.component';
import { ApiService } from '../services/api.service';
import { environment } from '../../../src/environments/environment';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let httpMock: HttpTestingController;
  let route: ActivatedRoute;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('123') } },
          },
        },
        ApiService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verify there are no outstanding HTTP requests
  });

  it('should create the component', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/single-show/123`)
    expect(component).toBeTruthy();
  });

  it('should fetch show details on initialization', () => {
    const mockResponse = { show: { id: '123', name: 'Test Show' } };

    // Expect an HTTP GET request with the correct URL
    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/single-show/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    // Verify the component data is correctly set
    expect(component.data).toEqual(mockResponse.show);
  });

  it('should not fetch show details if id is null', () => {
    // Update the mocked route to return null for id
    
    (route.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);

    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/single-show/123`)
    // Reinitialize the component
    component.ngOnInit();

    // Ensure no HTTP request is made
    httpMock.expectNone(`${environment.apiBaseUrl}movies/single-show/null`);
    expect(component.data).toEqual({});
  });

  it('should format date correctly', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/single-show/123`)
    const dateString = '2023-04-26T00:00:00.000Z';
    const formattedDate = component.formatDate(dateString);

    expect(formattedDate).toBe('Apr 26, 2023');
  });
});
