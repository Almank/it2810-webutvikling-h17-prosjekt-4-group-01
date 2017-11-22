import {async, TestBed, FormsModule } from '../../import-module';
import { getTestBed } from '@angular/core/testing';
import { XHRBackend, BaseRequestOptions, HttpModule, Http, Response, ResponseOptions } from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

  class MockMovieDetailsService {
    openDialog(data, auth, token) {
      if (auth) {
        const params = JSON.stringify({
          token: token,
          movie_id: data._id,
        });
      }
    }
  }

  describe('Movie Details Service', () => {
    let mockBackend: MockBackend;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          MockBackend,
          MockMovieDetailsService,
          BaseRequestOptions,
          {
            provide: Http,
            deps: [MockBackend, MockMovieDetailsService],
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
      let mockMovieDetailsService: MockMovieDetailsService;

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

        mockMovieDetailsService = getTestBed().get(MockMovieDetailsService);
        expect(mockMovieDetailsService).toBeDefined();
        done();
      });
    });
  });
