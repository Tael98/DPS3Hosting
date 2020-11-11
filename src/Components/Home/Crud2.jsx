import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";

const Crud2 = (props) => {

  const initialStateValues = {
    displayName: "",
    email: "",
    horas_trabajadas: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditUsuario(values);
    setValues({ ...initialStateValues });
  };

  const getUserById = async (id) => {
    const doc = await firestore.collection("users").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getUserById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
      <div className="container">
        <br/>
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">Nombre</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese el nombre"
          value={values.displayName}
          name="displayName"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">Email</i>
        </div>
        <input
          type="email"
          value={values.email}
          name="email"
          placeholder="Ingrese email"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">Horas trabajadas</i>
        </div>
        <input
          type="number"
          value={values.horas_trabajadas}
          name="horas_trabajadas"
          placeholder="Ingrese las horas trabajadas"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
    </div>

  );
}

export default Crud2