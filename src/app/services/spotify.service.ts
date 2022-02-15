import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify service listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders ({
      Authorization : 'Bearer BQC_iOTP0C9M7gfuElqWZ13zR4lAm3TZF-4jteMs_V7myyOjSI0YsGQYZALioc7cJ2cjVNodt4p_B8ddph4'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
      .pipe( map( data => data['albums'].items));

    /*const headers = new HttpHeaders ({
      Authorization : 'Bearer BQBTsXCfRyU5bIlAQWiOSzoMRSKt7OnG4V4D2dsD4sGsUkNvsc_CJLjn_xz-JE8HW13Gvbs3x9nXgV6mIKQ'
    });
    return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', { headers })
      .pipe( map( data => data['albums'].items));*/

  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe( map( data => data['artists'].items));

    /*return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, { headers })
      .pipe( map( data => data['artists'].items));*/
  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
      //.pipe( map( data => data['artists'].items));
  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=US`)
      .pipe( map( data => data['tracks']));
  }
}
