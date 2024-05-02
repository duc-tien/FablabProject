import instance from "~/utils/api"

export const putMaintenance=async (maintenance)=>{
    try {
    const res = await instance.put('/Machine/Maintenance',maintenance)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}

export const putWorker=async (worker)=>{
    try {
    const res = await instance.put('/Worker',worker)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}


export const putDetail=async (detailId)=>{
    try {
    const res = await instance.put('/Detail/Complete',detailId)
    return res.data
    } 
    catch (error) {
    console.log(error);
    }
}