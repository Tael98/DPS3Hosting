import React, { useEffect, useState } from "react";
import Crud2 from "./Crud2";

import { firestore } from "../../firebase";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Crud = () => {
    const [Usuarios, setUsuarios] = useState([]);
    const [currentId, setCurrentId] = useState("");
  
    const getUsuarios = async () => {
      firestore.collection("users").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setUsuarios(docs);
      });
    };
  
    const onDeleteUser = async (id) => {
      if (window.confirm("are you sure you want to delete this User?")) {
        await firestore.collection("users").doc(id).delete();
        toast("Se eliminó un usuario", {
          type: "error",
          //autoClose: 2000
        });
      }
    };
  
    useEffect(() => {
      getUsuarios();
    }, []);
  
    const addOrEditUsuario = async (UsuarioObject) => {
      try {
        if (currentId === "") {
          await firestore.collection("users").doc().set(UsuarioObject);
          toast("Se agregó un usuario", {
            type: "success",
          });
        } else {
          await firestore.collection("users").doc(currentId).update(UsuarioObject);
          toast("Se actualizó un usuario", {
            type: "info",
          });
          setCurrentId("");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>    
        <div className="col-md-4 p-2">
          <div className="container">
          <Crud2 {...{ addOrEditUsuario, currentId, Usuarios }} />
          </div>
        </div>
  
        <div className="col-md-8 p-2">
          <div class="container">
            <br/>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Horas trabajadas</th>
                  <th>Aciones</th>
                </tr>
              </thead>
              <tbody>
                {Usuarios.map((Usuario) => (
                  <tr key={Usuario.id}>
                    <td>{Usuario.displayName}</td>
                    <td>{Usuario.email}</td>
                    <td>{Usuario.horas_trabajadas}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setCurrentId(Usuario.id)}>Editar</button>
                      &nbsp;
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => onDeleteUser(Usuario.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

export default Crud