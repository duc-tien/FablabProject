import { useDispatch } from "react-redux";
import { displayModalLogin } from "../redux/displaySlice";
import { jwtDecode } from "jwt-decode";

// Kiểm tra xem localStorage có token hay không, nếu có thì còn hiệu lực hay không
 const checkLogin=()=>{
    const token = localStorage.getItem('token');
    let date = new Date();

    if (!token) {
      return false
    } 
    else 
    {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp < date.getTime() / 1000) {
        return false
      } 
    }
    return true
}
export default checkLogin