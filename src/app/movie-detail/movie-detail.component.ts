import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const imdbID: any = params.get('imdbID');
      this.fetchMovieDetails(imdbID);
    });
  }

  async fetchMovieDetails(imdbID: string) {
    try {
      this.movie = await this.movieService.getMovieDetails(imdbID);
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    }
  }
  back(){
    this.router.navigate(['/']);
  }
}
