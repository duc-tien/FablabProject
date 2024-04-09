import instance from "~/utils/api";

export const getWorker = async( workerId=null,pageSize=10,pageNumber=1)=>{
    try {
          const res = await instance.get('/Worker',{
        params:{
            workerId,
            pageSize,
            pageNumber
        }
    })
    return res.data
    } catch (error) {
        console.log(error);
    }
  

}

export const getMachine = async(machineId=null)=>{
    try {
        const res = await instance.get('/Machine',{
            params:{
                machineId
            }
        })
        return res.data
    } catch (error) {
        
    }
}

export const getOEE=async(machineId,startDate,endDate)=>{
    try {
        const res = await instance.get('/Machine/OEE',{
            params:{
                machineId,
                startDate,
                endDate
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getOrder=async(search)=>{
    try {
        const res = await instance.get('/Order',{
            params:{
                search
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getProject=async(prjId=null,orderId=null)=>{
    try {
        const res = await instance.get('/Project',{
            params:{
                orderId:orderId,
                prjId:prjId
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getDetail=async({prjId,detailId,workerId,machineId,status,pageSize=20,pageNumber=1})=>{
    try {
        const res = await instance.get('/Detail',{
            params:{
                prjId,detailId,workerId,machineId,status,pageSize,pageNumber
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
