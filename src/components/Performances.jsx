import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import "../css/components/performances.css"
import PropTypes from 'prop-types';

export function Performances(props){

    const data = [];

      for (let index = 0; index < Object.keys(props.performances).length; index++) {
        data.push(
            {
                subject: Object.keys(props.performances)[index],
                value: Object.values(props.performances)[index]
            }
        )
      }

    return (
        <article className="performances">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="60%" data={data} className="radialchart">
                    <PolarGrid radialLines={false} stroke={"white"}/>
                    <PolarAngleAxis dataKey="subject"/>
                    <Radar dataKey="value" fill="#FF0101" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </article>
    )

}

Performances.propTypes = {performances: PropTypes.object}