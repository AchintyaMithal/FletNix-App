import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the auth token from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('mock_token'));
    const token = service.getAuthToken();
    expect(token).toBe('mock_token');
  });

  it('should handle missing auth token gracefully', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const token = service.getAuthToken();
    expect(token).toBe('');
  });

  it('should call register API with provided data', () => {
    const mockData = { email: 'test@example.com', password: '123456' };
    const mockResponse = { success: true };

    service.register(mockData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
    req.flush(mockResponse);
  });

  it('should fetch shows with correct query parameters', () => {
    const page = 1;
    const type = 'popular';
    const searchStr = 'action';
    const itemsPerPage = 15;
    const mockResponse = { shows: [] };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('mock_token'));

    service.getShows(page, type, searchStr, itemsPerPage).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}movies/shows/${page}?type=${type}&searchStr=${searchStr}&page_size=${itemsPerPage}`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock_token');
    req.flush(mockResponse);
  });

  it('should fetch initial shows without query parameters', () => {
    const mockResponse = { shows: [] };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('mock_token'));

    service.getInitialShows().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/shows/`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock_token');
    req.flush(mockResponse);
  });

  it('should fetch show details by ID', () => {
    const mockResponse = { show: { id: '123', name: 'Test Show' } };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('mock_token'));

    service.getShowDetails('123').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}movies/single-show/123`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('mock_token');
    req.flush(mockResponse);
  });
});
