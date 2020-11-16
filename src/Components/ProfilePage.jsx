import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link, navigate } from "@reach/router";

import CalcularSalario from "./Home/CalcularSalario";
import ListaInicio from "./Home/ListaInicio";
import Crud from "./Home/Crud";
import Perfil from "./Home/Perfil";

const ProfilePage = () => {

    // Asigna un user para leer el contexto del tema actual.
    // React encontrará el Provider superior más cercano y usará su valor.
    const user = useContext(UserContext);

    const { photoURL, displayName, email } = user;
    console.log(" Usuario ProfilePage : " + displayName + " - " + email);

    const signOut = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="">Parcial 3</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li class="nav-item active">
                            <Link className="nav-link" to="crud">Administrar empleados</Link>
                        </li>
                        <li class="nav-item active">
                            <Link className="nav-link" to="calcularSalario">Cálculo de salario</Link>
                        </li>
                        <li class="nav-item active">
                            <Link className="nav-link" to="perfil">Perfil de usuario</Link>
                        </li>
                        <button className="btn btn-danger nav-item" onClick={() => { signOut() }}>
                            Sign out
                        </button>
                    </ul>
                </div>
            </nav>
            <Router>
                <ListaInicio exact path="/" />
                <Crud exact path="crud" />
                <CalcularSalario exact path="calcularSalario" />
                <Perfil exact path="perfil" />
            </Router>


        </div>
    )
};

export default ProfilePage;

