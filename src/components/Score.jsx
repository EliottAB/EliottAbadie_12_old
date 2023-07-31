import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import "../css/components/score.css"
import PropTypes from 'prop-types';



export function Score(props){

  const data = [
    { name: 'progress', value: props.score },
    { name: 'complete progress', value: 100-props.score }
  ];

  return (
    <article className="score">
        <p className="percentage">{props.score}%<br/><span>de votre<br/>objectif</span></p>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart className="scorecircle" width="100%" height="100%">
          <Pie
            data={data}
            dataKey={"value"}
            innerRadius={"45%"}
            outerRadius={"51%"}
            cornerRadius={"100%"}
            >
            <Cell fill={"#E60000"} stroke="#E60000"/>
            <Cell fill={"transparent"} stroke="transparent"/>
        </Pie>
          </PieChart>
          </ResponsiveContainer>
      </article>
  );
}

Score.propTypes = {score: PropTypes.number}
