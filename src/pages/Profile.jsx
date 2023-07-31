import React from "react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { Loading } from "../components/Loading"
import { Activity } from "../components/Activity"
import { Calories } from "../components/Calories"
import { Score } from "../components/Score"
import { Performances } from "../components/Performances"
import { Duration } from "../components/Duration"
import { getDatas } from "../datas"
import "../css/pages/profile.css"
import caloriesicon from "../assets/calories.svg"
import glucidesicon from "../assets/glucides.svg"
import lipidesicon from "../assets/lipides.svg"
import proteinesicon from "../assets/proteines.svg"


export function Profile(){
    let [datas, waitdatas] = useState()
    
    const { id } = useParams()
    let usersid = ["18", "12"]
    let userid = 18

    if (usersid.includes(id)) {
        userid = parseInt(id)
    }
    
    useEffect(()=>{
        (async () => {
            waitdatas({
                globalInfos: await getDatas(userid, ""),
                keyData: await getDatas(userid, "key-data"),
                score: await getDatas(userid, "today-score"),
                activity: await getDatas(userid, "activity"),
                sessions: await getDatas(userid, "average-sessions"),
                performances: await getDatas(userid, "performance")
            })
        })()

    }, [userid])
    

    return (
        <React.Fragment>
            <Header/>
            <Sidebar/>
            <main className="mainprofile">
                {
                datas ? 
                
                <React.Fragment>
                    <h2 className="hello">Bonjour <span>{datas.globalInfos.userInfos.firstName}</span></h2>
                    <p className="congrats">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                    <section className="stats">
                        <Activity data={datas.activity.datas} minkg={datas.activity.minkg} maxkg={datas.activity.maxkg}></Activity>
                        <ul className="calories">
                            <Calories type="calories" icon={caloriesicon} count={datas.keyData.calorieCount}/>
                            <Calories type="proteines" icon={proteinesicon} count={datas.keyData.proteinCount}/>
                            <Calories type="glucides" icon={glucidesicon} count={datas.keyData.carbohydrateCount}/>
                            <Calories type="lipides" icon={lipidesicon} count={datas.keyData.lipidCount}/>
                        </ul>
                        <Duration sessionsLength={datas.sessions}/>
                        <Performances performances={datas.performances}/>
                        <Score score={datas.score}/>
                    </section>
                </React.Fragment>

                : <Loading/>
                }
            </main>
        </React.Fragment>
    )

}