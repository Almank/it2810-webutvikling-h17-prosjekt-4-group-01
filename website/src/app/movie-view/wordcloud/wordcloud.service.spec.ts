
import {async, TestBed, FormsModule } from '../../import-module';
import { getTestBed } from '@angular/core/testing';
import { XHRBackend, BaseRequestOptions, HttpModule, Http, Response, ResponseOptions } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

  /** Mocking service */
  class MockWordcloudService {
    getWordcloud() {
      var mockData = {
          "Action":243,
          "Adventure":276,
          "Drama":651,
          "Mystery":89,
          "Thriller":131,
          "Crime":194,
          "Music":72,
          "Fantasy":99,
          "Sci-Fi":70,
          "History":77,
          "Comedy":300,
          "Biography":147,
          "Animation":108,
      };
      return mockData;
    }
  }

  /** Setup test */
  describe('WordcloudService', () => {
    let mockBackend: MockBackend;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          MockBackend,
          MockWordcloudService,
          BaseRequestOptions,
          {
            provide: Http,
            deps: [MockBackend, MockWordcloudService],
            useFactory:
              (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
              }
          }
        ],
        imports: [
          FormsModule,
          HttpModule
        ]
      });
      mockBackend = getTestBed().get(MockBackend);
    }));

    it('Should be run correctly', done => {
      let mockWordcloudService: MockWordcloudService;

      getTestBed().compileComponents().then(() => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: [
                    {
                      id: 26,
                      contentRendered: '<p>Test Text</p>',
                      contentMarkdown: '*Test Text*'
                    }]
                }
              )));
          });

        mockWordcloudService = getTestBed().get(MockWordcloudService);
        expect(mockWordcloudService).toBeDefined();
        done();
      });
    });
  });
