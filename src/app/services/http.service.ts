import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  ENDPOINT = 'http://overpass-api.de/api/interpreter?data=';

  /** Request to query restaurants near 1km around
   *
   */
  QUERY = `
  [out:json];
  (
    node[%22amenity%22=%22fast_food%22]
    (around:1000,45.77253718323469,%204.861621610053295);
    way[%22amenity%22=%22fast_food%22](around:1000,45.77253718323469,%204.861621610053295);
    relation[%22amenity%22=%22fast_food%22](around:1000,45.77253718323469,%204.861621610053295);
  );
  out;%3E;
  `;

  constructor(private http: HttpClient) { }

  retrieve = () =>  {
    // todo retrieve switch bar/restaurant/fast_food
    return this.http.get(this.ENDPOINT + this.QUERY).toPromise();
  }
}
