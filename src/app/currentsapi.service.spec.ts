import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { CurrentsApiService } from './currentsapi.service'; // Ensure the path is correct

describe('CurrentsApiService', () => {
  let service: CurrentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule here
      providers: [CurrentsApiService] // Provide the CurrentsApiService
    });
    service = TestBed.inject(CurrentsApiService); // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Basic test to check service instantiation
  });
});