import instance from "~/utils/api"

export const postWoker=async (wokerId,wokerName,noteArea,rfid,fileData)=>{
    try {
    const res = await instance.post('/Woker',{
        wokerId,wokerName,noteArea,rfid,fileData
    })
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

export const postMachineError=async (errorName,errorDescription,errorTime,machineId)=>{
    try {
    const res = await instance.post('/Machine/Error',{
        errorName,errorDescription,errorTime,machineId
    })
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}


export const postProject=async (project)=>{
    try {
    const res = await instance.post('/Project',project)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}