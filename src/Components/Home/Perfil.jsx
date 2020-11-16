import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const Perfil = () => {
    const user = useContext(UserContext);
    const { photoURL, displayName, email } = user;
    return (
        <div className="container">
            <div className="row justify-content-center text-center mt-3">
                <div className="col-md-8">
                    <img style={{
                        background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                        backgroundSize: "cover",
                        height: "150px",
                        width: "150px"
                    }}
                        className="img-fluid border border-blue-300 text-center" />
                    <br></br>
                    <div className="mt-2">
                        Nombre : <h2 className="font-semibold">{displayName}</h2>
                        <br></br>
                        Correo: <h3 className="italic">{email}</h3>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Perfil