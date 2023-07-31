import "../css/components/calories.css"
import PropTypes from 'prop-types';

export function Calories(props){

    return (
        <li>
            <img src={props.icon} alt={props.type}/>
            <p>
                {props.count}<br/>
                <span>{props.type}</span>
            </p>
        </li>
    )

}

Calories.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    count: PropTypes.number
}