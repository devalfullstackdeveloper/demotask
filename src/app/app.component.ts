import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoTask';

  movies: any[] = [
    {
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'https://example.com/poster1.jpg'
    },
    {
      Title: 'The Godfather',
      Year: '1972',
      Poster: 'https://example.com/poster2.jpg'
    },
  ];
  recordsPerPage: number = 5;
  displayedMovies: any[] = [];

  ngOnInit() {
    this.updateDisplayedMovies();
  }

  onRecordsPerPageChange() {
    this.updateDisplayedMovies();
  }

  updateDisplayedMovies() {
    this.displayedMovies = this.movies.slice(0, this.recordsPerPage);
  }
}
