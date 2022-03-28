export default function Footer(props) {
    const { image, movieTitle, day, hora } = props;

    return !day ? (<footer>
        <div className="img-container">
            <img src={image} />
        </div>
        <div className="movie-session">
            <p>{movieTitle}</p>
        </div>
    </footer>) : (
        <footer>
            <div className="img-container">
                <img src={image} />
            </div>
            <div className="movie-session">
                <p>{movieTitle}</p>
                <p> {day} - {hora}</p>
            </div>
        </footer>

    )
}