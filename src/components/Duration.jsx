import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import "../css/components/duration.css"
import PropTypes from 'prop-types';

export function Duration(props) {

    const data = [
        {
        name: 'L',
        sessionLength: props.sessionsLength[0]
        },
        {
        name: 'Ma',
        sessionLength: props.sessionsLength[1]
        },
        {
        name: 'Me',
        sessionLength: props.sessionsLength[2]
        },
        {
        name: 'J',
        sessionLength: props.sessionsLength[3]
        },
        {
        name: 'V',
        sessionLength: props.sessionsLength[4]
        },
        {
        name: 'S',
        sessionLength: props.sessionsLength[5]
        },
        {
        name: 'D',
        sessionLength: props.sessionsLength[6]
        },
    ];

    const [perc, setPerc] = useState(0);
    /**
     * transform the line chart background to a gradient
     * @param {object} hoveredData
     */
    function onMouseMove(hoveredData){
        if (hoveredData && hoveredData.activePayload) {
            const hoveredX = hoveredData.activePayload[0].payload.name;
            const index = data.findIndex(d => d.name === hoveredX);
            const percentage = ((data.length - index - 1) * 100) / (data.length - 1);
            document.querySelector(".changeback").style.background = `linear-gradient(90deg, #FF0000 ${perc}%, #E60000 ${perc}%)`
            document.querySelector(".duration").style.background = `linear-gradient(90deg, #FF0000 ${perc}%, #E60000 ${perc}%)`
    
            setPerc(100 - percentage);
        }
      };

    /**
     * create a ToolTip content with the hovered data
     * @param {object} props 
     * @returns customed ToolTip
     */
    function persTooltip(props){
        let text = null
        if (props.active === true) {
            text = props.payload[0].value + " min"
        }
        return <p className="durationtooltip">{text}</p>
    }

    return (
        <article className="duration">
            <div className="changeback"></div>
            <p className="durationtext">Durée moyenne des sessions</p>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                className="linechart"
                data={data}
                margin={{
                    left: 20,
                    right: 20,
                    bottom: 20
                }}
                onMouseMove={onMouseMove}
                onMouseOut={()=>{document.querySelector(".duration").style.background = "#FF0000"; document.querySelector(".changeback").style.background = "#FF0000"}}
                >
                <CartesianGrid stroke='none'/>
                <XAxis dataKey="name" stroke="white" axisLine={false} tickLine={false}/>
                <Tooltip cursor={false} content={persTooltip}/>
                <Line type="monotone" dataKey="sessionLength" stroke="white" strokeWidth={3} activeDot={{ r:5, fill: "white", stroke:"rgba(250, 250, 250, 0.5)", strokeWidth:".7em"}} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </article>
    );

}

Duration.propTypes = {sessionsLength: PropTypes.array}
