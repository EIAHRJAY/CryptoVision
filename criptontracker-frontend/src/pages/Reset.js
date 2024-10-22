
import ResetPassword from "../components/ResetPassword";
import ResetEmail from "../components/ResetEmail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Reset = () =>{
    // const { token } = useParams(); 
    const [token, setToken] = useState('');
    const location = useLocation();

    useEffect(() => {
        
        const queryParams = new URLSearchParams(location.search);
        const tokenParam = queryParams.get('token');
        if (tokenParam) {
          setToken(tokenParam);
        }
      }, [location]);

    return(
        <div>
        {token ? ( 
                <ResetPassword token={token}/>
        ) : (
            < ResetEmail/>
            )}
        </div>
    )
};

export default Reset