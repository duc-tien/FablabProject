import instance from "~/utils/api";

export const login= async(userName,passWords)=>{
    try {
    const res=await instance.post('/User',{
        userName,
        passWords
    })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}