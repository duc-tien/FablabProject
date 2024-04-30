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
export const getWorkerLog = async( workerId,start=null,end=null)=>{
    try {
          const res = await instance.get('/Worker',{
        params:{
            workerId,
            start,
            end
        }
    })
    return res.data
    } catch (error) {
        console.log(error);
    }
  

}

export const getArea = async()=>{
    try {
        const res = await instance.get('/Machine/Area')
        return res.data
    } catch (error) {
        
    }
}

export const getMachine = async(areaId)=>{
    try {
        const res = await instance.get('/Machine',{
            params:{
                areaId
            }
        })
        return res.data
    } catch (error) {
        
    }
}

export const getMachineDetailLog = async(machineId,start=null,end=null)=>{
    try {
        const res = await instance.get('/Machine/DetailLog',{
            params:{
                machineId,
                start,
                end
            }
        })
        return res.data
    } catch (error) {
        
    }
}
export const getMachineELog = async(machineId,start=null,end=null)=>{
    try {
        const res = await instance.get('/Machine/ELog',{
            params:{
                machineId,
                start,
                end
            }
        })
        return res.data
    } catch (error) {
        
    }
}
export const getMachineError = async(machineId,start=null,end=null)=>{
    try {
        const res = await instance.get('/Machine/Error',{
            params:{
                machineId,
                start,
                end
            }
        })
        return res.data
    } catch (error) {
        
    }
}
export const getMachineOEE = async(machineId,start=null,end=null)=>{
    try {
        const res = await instance.get('/Machine/OEE',{
            params:{
                machineId,
                start,
                end
            }
        })
        return res.data
    } catch (error) {
        
    }
}


export const getProject=async(prjId=null )=>{
    try {
        const res = await instance.get('/Project',{
            params:{
                prjId
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getListDetail=async(projectId,status=null,pageSize=100,pageNumber=1 )=>{
    try {
        const res = await instance.get('/Detail',{
            params:{
                projectId,
                status,
                pageSize,
                pageNumber
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getDetailLog=async(detailId )=>{
    try {
        const res = await instance.get('/Detail/full',{
            params:{
                detailId
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
