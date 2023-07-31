import * as mockdatas from"./mockdatas"

//set this variable as "true" if you want to work with backend
const isprod = false

/**
 * get the datas from api or mock
 * @param {number} id user's id 
 * @param {string} type which data we need
 * @returns result of function transformDatas
 */
export async function getDatas(id, type){

    let gettype = type
    if (type === "today-score" || type === "key-data") {
        gettype = ""
    }

    if (isprod) {
        const data = await fetch("http://localhost:3000/user/" + id + (gettype !== "" ? "/" : "") + gettype);
        const json = await data.json();
        return transformDatas(type, json.data);
    }else{
        switch (gettype) {
            case "":
                return transformDatas(type, mockdatas.USER_MAIN_DATA.find((current) => current.id === id))

            case "activity":
                return transformDatas(type, mockdatas.USER_ACTIVITY.find(current => current.userId === id))
            case "average-sessions":
                return transformDatas(type, mockdatas.USER_AVERAGE_SESSIONS.find(current => current.userId === id))

            case "performance":
                return transformDatas(type, mockdatas.USER_PERFORMANCE.find(current => current.userId === id))
        
            default:
                break;
        }
    }
}


/**
 * tranform the datas to get clear datas
 * @param {string} type which data we need
 * @param {object} data data to transform
 * @returns transformed datas
 */
function transformDatas(type, data){

    switch (type) {
        case "":
            return data

        case "activity":

            let recentdata = []
            for (let index = 31; index > -1 ; index--) {
                if (data.sessions.length > index) {   
                    recentdata.push(data.sessions[data.sessions.length - index -1])
                }
            }
            const transformedactivity = {
                datas: recentdata.map(session => (Object.assign({}, session, {day: session.day.slice(-2)}))),
                minkg: Math.min(...recentdata.map(session => session.kilogram)),
                maxkg: Math.max(...recentdata.map(session => session.kilogram))
            }
            return transformedactivity

        case "average-sessions":
            const transformedsessions = []
            data.sessions.forEach(element => {
                transformedsessions.push(element.sessionLength)
            });
            return transformedsessions

        case "performance":
            let transformedperformance = {}
            data.data.forEach(element => {
                transformedperformance[data.kind[element.kind]] = element.value
            });
            return transformedperformance
        
        case "today-score":
            let score
            if (data.todayScore) {
                score = data.todayScore*100
            }else{
                score = data.score ? data.score*100 : 0
            }
            return score

        case "key-data":
            let keydata
            if (data.keyData) {
                keydata = data.keyData
            }else{
                keydata = {
                calorieCount: 0,
                
                carbohydrateCount: 0,
                
                lipidCount: 0,
                
                proteinCount: 0
                }
            }
            return keydata
            
        default:
            break;
    }
}