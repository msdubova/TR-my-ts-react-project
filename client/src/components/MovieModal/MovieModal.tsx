import React from "react";
import { Modal, Typography } from "@mui/material";
import { Movie } from "../../types/movie"; 
import genreDictionary from "../Genres/Genre";
interface MovieModalProps {
  isOpen: boolean; 
  onClose: () => void;
  movie: Movie;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, movie }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="modal-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modal-poster"
        />
        <div className="modal_description">
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
                .map((genreId) => {
                  const genreName = genreDictionary[genreId];
                  return genreName || "N/A";
                })
                .join(", ")
            : "N/A"}
        </Typography>
        </div>
      
      </div>
    </Modal>
  );
};

export default MovieModal;
