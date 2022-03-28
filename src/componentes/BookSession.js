import { useState } from 'react';
import "./Assento/style.css";


export default function BookSession(props) {
    const { index, isAvailable, name, callbackIDs, callbackNames } = props;

    const [select, setSelect] = useState(false);

    return isAvailable ? (<div className="seat-option">
                    <div className={select ? 'selected seat' : 'available seat'} onClick={()=> {setSelect(!select); 
                        callbackIDs(index);
                        callbackNames(name)}}>{name}</div>
                    </div>
                    ) : (
                <div className="seat-option" onClick={()=> alert("Esse assento não está disponível")}>
                    <div className={'unavailable seat'}>{name}</div>
                </div>)
    
}