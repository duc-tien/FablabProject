import instance from "~/utils/api";

export const getAll= async()=>{
    // try {
    const res=await instance.get('/DanhmucRepo')
        return res.data;
    // }
    // } catch (error) {
    //     console.log(error);
    // }
}

export const getOnReq=async(search,page="1")=>{
    try {
        const res= await instance.get('/DanhmucRepo/getonreq',{
            params:{
                search,
                page
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
