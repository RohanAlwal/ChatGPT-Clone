import { useNavigate } from "react-router-dom";
import react from 'react';
const Chat = ({onLogout}) => {
    return(
        <div>
                <h1>🔐 Protected Chat Page</h1>
                <button onClick={onLogout}> logout </button>
        </div>
    );
};

export default Chat;