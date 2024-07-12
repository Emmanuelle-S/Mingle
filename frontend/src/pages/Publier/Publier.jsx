import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "@components/CreatePost/CreatePost";
import { AuthContext } from "../../contexts/AuthContext";

export default function Publier() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
        navigate("/ConnexionInscription", { state: { from: '/Publier' } });
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <CreatePost /> : null;
}
