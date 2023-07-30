import React, {useEffect, useState} from "react";

import './App.css';
import SearchIcon from './searchIcon.svg';
import MovieCard from './MovieCard';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const searchMovies = async (title) => {
        const response = await fetch (`${process.env.REACT_APP_MOVIE_API_URL}?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }

    useEffect (() => {
        searchMovies('Captain America')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    )
}

export default App;