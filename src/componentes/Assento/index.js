import "./style.css";

import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookSession from '../BookSession';
import Footer from "../Footer";

export default function Assento() {
    const { idSession } = useParams();

    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');

    const [spots, setSpots] = useState([]);
    const [getDay, setGetDay] = useState({});
    const [getData, setGetData] = useState([]);
    const [getMovie, setGetMovie] = useState([]);

    const [getSeatIds, setGetSeatIds] = useState([]);
    const [getSeatNames, setGetSeatNames] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
        promise.then(response => {
            const data = response.data;

            setGetData(data);
            setGetMovie(data.movie);
            setGetDay(data.day);
            setSpots(data.seats);
        })
    }, [])


    function filterSeatIds(seatId) {
        const filteredIds = [];

        for (let i = 0; i < seatId.length; i++) {
            let counter = 0;
            for (let j = 0; j < seatId.length; j++) {
                if (seatId[i] === seatId[j]) {
                    counter++;
                }
            }
            if (counter % 2 !== 0) {
                filteredIds.push(seatId[i]);
            }
        }
        return filteredIds;
    }


    function sendReservation() {
        const filteredIds = filterSeatIds(getSeatIds);

        let object = {
            ids: filteredIds,
            name: input,
            cpf: input2
        };
        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', object);
    }

    return spots ? (
        <section className="book-session">
            <h1>Selecione o(s) assento(s)</h1>
            <div className="seats">

                {spots.map((seat) => {
                    const { id, isAvailable, name } = seat;
                    return <BookSession
                        callbackIDs={(chosenID) => setGetSeatIds([...getSeatIds, chosenID])}
                        callbackNames={(chosenSeat) => setGetSeatNames([...getSeatNames, chosenSeat])}
                        isAvailable={isAvailable}
                        name={name}
                        index={id}
                    />
                })}

            </div>
            <div className="example">
                <div className="example-option">
                    <div className="circle selected-circle"></div>
                    <p>Selecionado</p>
                </div>
                <div className="example-option">
                    <div className="circle available-circle"></div>
                    <p>Disponivel</p>
                </div>
                <div className="example-option">
                    <div className="circle unavailable-circle"></div>
                    <p>Indisponível</p>
                </div>
            </div>
            <div className="buyer-name">
                <h2>Nome do Comprador:</h2>
                <input required value={input} onInput={e => setInput(e.target.value)} placeholder="Digite seu nome..."></input>
            </div>
            <div className="buyer-cpf">
                <h2>CPF do Comprador:</h2>
                <input required value={input2} onInput={e => setInput2(e.target.value)} placeholder="Digite seu CPF..."></input>
            </div>


            <Link to={'/Sucesso'} state={{
                name: input, cpf: input2,
                seats: getSeatNames, movie: getMovie.title, day: getDay.date, hora: getData.name
            }}>
                <button onClick={sendReservation}>Reservar acento(s)</button>
            </Link>

            <Footer image={getMovie.posterURL} movieTitle={getMovie.title} day={getDay.weekday} hora={getData.name} />
        </section>
    ) : (
        <p>Carregando</p>
    )
}