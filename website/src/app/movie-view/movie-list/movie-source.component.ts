import {  MovieList, DataSource, MatPaginator, MovieListComponent, Observable } from '../../import-module';

/** Data source to provide what data should be rendered. */
export class MovieSource extends DataSource<any> {
  constructor(private _movieComponent: MovieListComponent, private _paginator: MatPaginator) {
    super();
  }

  /** Add extra space after ','. */
  splitElements(data, typeOfData) {
    for (let i = 0; i < data.length; i++) {
      switch (typeOfData) {
        case 'genre':
          data[i].genre = data[i].genre.toString().split(',').join(', ');
          break;
        case 'actors':
          data[i].actors = data[i].actors.toString().split(',').join(', ');
          break;
      }
    }
    return data;
  }

  /** Connect function called to retrieve one stream containing the data to render. */
  connect(): Observable<MovieList[]> {
    const displayDataChanges = [
      this._movieComponent.dataChange,
      this._paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      let data = this._movieComponent.data.slice();
      /** Add space between genres. */
      data = this.splitElements(data, 'genre');
      data = this.splitElements(data, 'actors');

      /** Grab the page's slice of data. */
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }
  disconnect() {}

}
