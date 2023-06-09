import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  isDetailViewOpen = false;
  selectedMovie: any = {};
  movies: any = [];
  currentPage = 1;
  itemsPerPage = 10; // Change this value to set the number of movies per page
  totalItems = 0;
  totalPages = 0;
  searchQuery:string = '';

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.searchQuery =  localStorage.getItem('searchquey') || ''
    this.searchMovies(this.searchQuery)
  }

  async searchMovies(query: string) {
    try {
      const result = await this.movieService.searchMovies(query, this.currentPage, this.itemsPerPage, 'release_date');
      this.movies = result.Search;
      this.totalItems = result.totalResults;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  }

  async openDetailView(imdbID: string) {
    try {
      const result = await this.movieService.getMovieDetails(imdbID);
      this.selectedMovie = result;
      this.isDetailViewOpen = true;
    } catch (error) {
      console.error('Failed to get movie details:', error);
    }
  }

  closeDetailView() {
    this.isDetailViewOpen = false;
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
    // this.fetchMovies();
    this.searchMovies(this.searchQuery);
  }

  getPaginationRange() {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);
  }


  async fetchMovies() {
    try {
      const result = await this.movieService.getMovies(this.currentPage, this.itemsPerPage);
      this.movies = result.Search;
      this.totalItems = parseInt(result.totalResults);
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }

  setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.fetchMovies();
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    localStorage.setItem('searchquey',this.searchQuery)
    this.searchMovies(this.searchQuery)
  }

  goToMovieDetail(imdbID: string) {
    this.router.navigate(['/movies', imdbID]);
  }
}
