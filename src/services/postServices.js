import instance from "~/utils/api"

export const postWoker=async (wokerId,wokerName,position,fileData)=>{
    try {
    const res = await instance.post('/Woker',{
        wokerId,wokerName,position,fileData
    })
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

export const postMachine=async (macihneId,macihneName,description)=>{
    try {
    const res = await instance.post('/Machine',{
        macihneId,macihneName,description
    })
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

export const postOrder=async (orderId,custummer,phoneNumber,address,email,product,note,startDate,endDate)=>{
    try {
    const res = await instance.post('/Order',{
        orderId,custummer,phoneNumber,address,email,product,note,startDate,endDate
    })
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

// export const postProject=async (projectId,projectName,startDate,endDate,note,orderId)=>{
//     try {
//     const res = await instance.post('/Project',{
//         projectId,projectName,startDate,endDate,note,orderId
//     })
//     return res.data
//     } 
//     catch (error) {
//     console.log(error);
//     }
// }

export const postProject=async (project)=>{
    try {
    const res = await instance.post('/Project',project)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}