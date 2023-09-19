import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

const Trends: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Grid container spacing={4} className="movie-container">
        {movies.map((movie: any) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <Typography variant="h6">{movie.title}</Typography>
              <Typography variant="body2">{movie.release_date}</Typography>
              <Typography variant="body2">{movie.runtime} minutes</Typography>
              <Typography variant="body2">
                Genres:{" "}
                {movie.genre_ids
                  ? movie.genre_ids
                      .map((genre: any) => movie.genre_ids)
                      .join(", ")
                  : "N/A"}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      {movies.length > itemsPerPage && (
        <Pagination
          count={Math.ceil(movies.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      )}
    </>
  );
};

export default Trends;
