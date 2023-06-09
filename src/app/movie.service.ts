import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com'; // Replace with the OMDB API endpoint
  private apiKey = "656029f7";
  

  constructor() { }

 

  async searchMovies(query: string, page: number, itemsPerPage: number, sortBy: string): Promise<any> {
    const response = await axios.get(this.apiUrl, {
      params: {
        apikey: this.apiKey,
        s: query?query:"movie",
        page: page.toString(),
        type: 'movie',
        r: 'json',
        sort: sortBy,
        itemsPerPage: itemsPerPage
      }
    });
    return response.data;
  }

  async getMovieDetails(imdbID: string): Promise<any> {
    const response = await axios.get(this.apiUrl, {
      params: {
        apikey: this.apiKey,
        i: imdbID
      }
    });
    return response.data;
  }

  async getMovies(page: number, itemsPerPage: number): Promise<any> {
    const response = await axios.get(this.apiUrl, {
      params: {
        apikey: this.apiKey,
        s: 'movie',
        page: page.toString(),
        type: 'movie',
        r: 'json',
        itemsPerPage: itemsPerPage.toString()
      }
    });
    return response.data;
  }
  
}
