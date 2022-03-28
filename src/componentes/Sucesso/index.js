import "./style.css";

import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Successo() {
    const location = useLocation()
    const { name, cpf, seats, movie, day, hora } = location.state;

    const tickets = seats.filter(filterSeats);

    function filterSeats(seat){
        let counter = 0;
        for (let i = 0; i < seats.length; i++) {
                if (seats[i] === seat) {
                    counter++;
            }
        }
              if (counter % 2 !== 0) {
                return seat;
            }
    }

    const ticket = tickets.filter((item, index) => tickets.indexOf(item) === index);

    return (
        <section className="success-page">
            <div className="success-message">
                <h6>Pedido feito <br></br> com sucesso!</h6>
            </div>
            <div className="chosen-movie">
                <h2>Filme e sessão</h2>
                <p>{movie}</p>
                <p>{day} {hora}</p>
            </div>
            <div className="tickets">
                <h2>Ingressos</h2>
                {ticket.map((assento, index) => {
                    return <p key={index}>Assento {assento}</p>
                })}
            </div>
            <div className="buyer">
                <h2>Comprador</h2>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </div>

            <Link to={"/"}>
                <button>Voltar para Home</button>
            </Link>
        </section>
    )
}