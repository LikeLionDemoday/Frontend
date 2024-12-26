import { DayCost } from "./DayCost";
import axios from "axios";

const dummyExpenses = [
    { name: "감자탕", amount: 40000 },
    { name: "감자탕", amount: 40000 },
    { name: "감자탕", amount: 40000 },
    { name: "감자탕", amount: 40000 },
    { name: "감자탕", amount: 40000 },
    { name: "감자탕", amount: 40000 }
];



export function DummyData(){
    return(
        <div>
            <DayCost expenses={dummyExpenses} />
        </div>
    );
}