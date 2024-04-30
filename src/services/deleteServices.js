import instance from "~/utils/api";

export const deleteWoker=async(wokerId)=>{
    try {
        await instance.delete('/Woker',{
            params:{
                wokerId
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteMachine=async(macihneId)=>{
    try {
        await instance.delete('/Machine',{
            params:{
                macihneId
            }
        })
    } catch (error) {
        console.log(error);
    }
}

 

export const deleteProject=async(prjId)=>{
    try {
        await instance.delete('/Project',{
            params:{
                prjId
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteDetail=async(detailId)=>{
    try {
        await instance.delete('/Detail',{
            params:{
                detailId
            }
        })
    } catch (error) {
        console.log(error);
    }
}