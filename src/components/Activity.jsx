import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import "../css/components/activity.css"

export function Activity(props){

  const data = props.data
  let unit
  
  /**
   * get the good data for the ToolTip
   * @param {object} e 
   * @returns cusotom ToolTip data
   */
  function getTooltipDatas(e){
    if (unit === "kcal" || unit === undefined) {
      unit = "kg"
    }else{
      unit = "kcal"
    }
    return [e + unit, null]
  }

    return (
        <article className="activity">
          <div className='infotext'>
            <p>Activité quotidienne</p>
            <ul className='legende'>
              <li>Poids (kg)</li>
              <li>Calories brûlées (kCal)</li>
            </ul>
          </div>
            <ResponsiveContainer width="90%" height="65%">
                <BarChart margin={0} data={data}>
                  <CartesianGrid vertical={false} strokeDasharray=".2em" horizontalPoints={["1%", "43%"]}/>
                  <XAxis dataKey={"day"} tickLine={false}/>
                  <YAxis hide="true" yAxisId={"left"} dataKey={"calories"} orientation="left"/>
                  <YAxis yAxisId={"right"} domain={[props.minkg - 1 , props.maxkg + 1]} ticks={[props.minkg - 1, ((props.minkg - 1) + (props.maxkg +1))/2 ,props.maxkg + 1]} dataKey={"kilogram"} orientation="right" axisLine={false} tickLine={false}/>
                  <Tooltip formatter={getTooltipDatas} cursor={{fill: "#C4C4C4", opacity:"50%"}} labelStyle={{ display: "none" }} wrapperStyle={{textAlign: "center"}} contentStyle={{display: "flex", alignItems: "center", height: "3.93em", backgroundColor: "#E60000", border: "none"}} itemStyle={{color: "white", fontSize: "1em"}}/>
                  <Bar barSize={8} yAxisId="right" dataKey="kilogram" fill="#282D30" radius={[20, 20, 0, 0]}/>
                  <Bar barSize={8} yAxisId="left" dataKey="calories" fill="#E60000" radius={[20, 20, 0, 0]}/>
                </BarChart>
            </ResponsiveContainer>
        </article>
    );
}

Activity.propTypes = {
  data: PropTypes.array,
  minkg: PropTypes.number,
  maxkg: PropTypes.number
}