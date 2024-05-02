import Calendar from "react-calendar";
import { useState } from "react";
import "./style.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function TimeTracking() {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <>
            <Calendar onChange={onChange} showNeighboringMonth={false} prev2Label={null} next2Label={null} minDate={new Date()} maxDate={new Date(2025, 0, 0)} minDetail={"month"} value={value} />
            <div className="inner-container">
                <h3>Uppgifter</h3>
            </div>
        </>
    );
}

export default TimeTracking;
