import "./style.css";

import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../Footer";

export default function Sessao() {
    const { idMovie } = useParams();

    const [Info, setInfo] = useState({});

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes/`)
        promise.then(response => {

            setInfo(response.data);
            setSessions(response.data.days);
        })
    }, [])

    return sessions ? (
        <section className="movie-sessions">
            <h1>Selecione o horário</h1>
            <div>
                {sessions.map((session) => {
                    return <div key={session.id}>
                        <h6>{session.weekday} - {session.date}</h6>
                        <div className="session-times">
                            {(session.showtimes).map(movie => {
                                return <Link to={`/Assento/${movie.id}`}>
                                    <div className="session-time" key={movie.id}>{movie.name}</div>
                                    </Link>
                            })}
                        </div>
                    </div>
                })
                }
            </div>

            <Footer image={Info.posterURL} movieTitle={Info.title} />
        </section>
    ) : (
        <p>Carregando</p>
    )
}