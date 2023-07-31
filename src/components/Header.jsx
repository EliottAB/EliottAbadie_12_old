import { Link } from "react-router-dom"
import LOGO from "../assets/logo.svg"
import "../css/components/header.css"

export function Header(){

    return (
        <header>
            <img src={LOGO} alt=""/>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/">Profil</Link>
                <Link to="/">Réglage</Link>
                <Link to="/">Communauté</Link>
            </nav>
        </header>
    )
}