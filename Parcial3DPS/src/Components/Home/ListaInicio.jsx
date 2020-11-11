import React, {useEffect, useState} from "react";
import { firestore } from "../../firebase";

const ListaInicio = () => {
    const [idList, List] = useState([]);
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");

    const getUsers = async () => {
        firestore.collection("users").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((user) => {
                let horast = user.data().horas_trabajadas;
                let name = user.data().displayName;
                let salario_base = 0;
                let restantes = 0;
                if(horast > 0){
                    if(horast <= 160){
                        salario_base = 160 * 9.75;
                    }else if(horast > 160 && horast <= 200){
                        restantes = horast - 160;
                        salario_base = (160 * 9.75) + (restantes * 11.50);
                    }else if(horast > 200 && horast <= 250){
                        restantes = horast - 200;
                        salario_base = (160 * 9.75) + (40 * 11.50) + (restantes * 12.50)
                    }else{
                        console.log("Se encontró un error");
                    }
                    //salario base multiplicado por el total de los descuentos (22.13%)
                    let isss = salario_base * 0.0525;
                    isss = Math.round(isss * 100)/100;
                    let afp = salario_base * 0.0688;
                    afp = Math.round(afp * 100)/100;
                    let renta = salario_base * 0.10;
                    renta = Math.round(renta * 100)/100;
                    let descuentos = isss + afp + renta;
                    let neto = salario_base -  descuentos;
                    console.log(user.data().displayName);
                    users.push({...user.data(), id: user.id, name: name, horas: horast, neto: neto});
                }else{
                    console.log("El usuario "+user.data().displayName+" no tiene un valor válido de horas.")
                }
            });
            users.sort((a, b) => (a.salario_base > b.salario_base) ? -1 : 1);
            let len = users.length;
            List(users);
            setMax(users[0].displayName);
            setMin(users[len-1].displayName);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return(
        <div className="container-fluid">
            <h1><b>Usuarios registrados: </b></h1>
            <table className="table centered">
                <thead className="thead-dark">
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Horas trabajadas</th>
                        <th>Sueldo neto</th>
                    </tr>
                </thead>
                <tbody>
                    {idList.map((User) => (
                        <tr>
                            <td>{User.id}</td>
                            <td>{User.name}</td>
                            <td>{User.horas_trabajadas}</td>
                            <td>{User.neto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaInicio