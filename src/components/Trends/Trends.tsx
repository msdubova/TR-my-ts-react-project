import React, { useEffect, useState, useCallback } from "react";
import { Grid, Typography, Badge } from "@mui/material";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import genreDictionary from "../Genres/Genre";
import { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal"; 

const Trends: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      );

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Обработчик кликов вне модального окна
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectedMovie &&
        isModalOpen &&
        event.target instanceof Node &&
        !document.getElementById("movie-modal")?.contains(event.target)
      ) {
        closeMovieModal();
      }
    };

    if (isModalOpen) {
      // Добавляем обработчик для кликов вне модального окна при открытии модального окна
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      // Удаляем обработчик при закрытии модального окна
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      // Удаляем обработчик при размонтировании компонента
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, selectedMovie]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Grid container spacing={4} className="movie-container">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Badge
              badgeContent={movie.vote_average.toFixed(1)}
              color={movie.vote_average > 7 ? "success" : "error"}
            ></Badge>
            <div
              className="movie-card"
              onClick={() => handleMovieClick(movie)} 
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <Typography variant="h6">
                {movie.title || movie.name || "N/A"}
              </Typography>
              <Typography variant="body2">
                {movie.release_date || movie.first_air_date || "N/A"}
              </Typography>
              <Typography variant="body2">
                Genres:{" "}
                {movie.genre_ids
                  ? movie.genre_ids
                      .map((genreId: number) => {
                        const genreName = genreDictionary[genreId];
                        return genreName || "N/A";
                      })
                      .join(", ")
                  : "N/A"}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal
          isOpen={isModalOpen}
          onClose={closeMovieModal}
          movie={selectedMovie}
        />
      )}
    </>
  );
};

export default Trends;
