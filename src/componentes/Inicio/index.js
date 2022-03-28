import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import "./style.css";

export default function FirstScreen() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise.then(response => {
            setMovies(response.data);
        });

    }, []);


    return movies ? (
        <section className='first-screen'>
            <h1>Selecione o filme</h1>
            <div className="movies">
                
                    {
                        movies.map(movie => {
                            const { id, posterURL, title } = movie;
                            return <div className='poster-container' key={id}>
                                <Link to={`/Sessao/${id}`}>
                                <img className='poster' src={posterURL} alt={title}  />
                                </Link>
                            </div>
                        })
                    }
                
            </div>
        </section>
    ) : (
        <p>Carregando...</p>
    )
}