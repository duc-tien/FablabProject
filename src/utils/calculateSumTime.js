const calculateSumTime=(listTimeStamp)=>{
    let accumulateTime=0

    for(let i=0;i<listTimeStamp.length;i++){
        const timeStart = new Date(listTimeStamp[i].startTimeStamp)
        const timeEnd = new Date(listTimeStamp[i].endTimeStamp)
        accumulateTime+= (timeEnd.getHours()-timeStart.getHours())*3600 +(timeEnd.getMinutes()-timeStart.getMinutes())*60+ (timeEnd.getSeconds()-timeStart.getSeconds())
    }   
    return accumulateTime
}
 
export default calculateSumTime