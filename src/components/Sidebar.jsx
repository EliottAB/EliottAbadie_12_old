import SPORT1 from "../assets/sport1.svg"
import SPORT2 from "../assets/sport2.svg"
import SPORT3 from "../assets/sport3.svg"
import SPORT4 from "../assets/sport4.svg"
import "../css/components/sidebar.css"

export function Sidebar(){

    return (
        <aside>
            <ul>
                <li><img src={SPORT1} alt="yoga"/></li>
                <li><img src={SPORT2} alt="yoga"/></li>
                <li><img src={SPORT3} alt="yoga"/></li>
                <li><img src={SPORT4} alt="yoga"/></li>
            </ul>
            <p>Copiryght, SportSee 2020</p>
        </aside>
    )
}