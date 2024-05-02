import instance from "~/utils/api"

export const postWoker=async (worker)=>{
    try {
    const res = await instance.post('/Worker',worker)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

export const postMachineError=async (er)=>{
    try {
    const res = await instance.post('/Machine/Error',er)
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