import React, { useState } from 'react';
import axios from 'axios';

function FormularioVehiculo() {
  const [formData, setFormData] = useState({
    nro_ruvs: '',
    nro_cargo_policial: '',
    marca: '',
    modelo: '',
    tipo: '',
    dominio: '',
    chasis: '',
    motor: '',
    dependencia_policial: ''
  });

  const [mensaje, setMensaje] = useState('');

  // Maneja el cambio de cada campo en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/formulario/', formData);
      setMensaje('Formulario enviado exitosamente');
      console.log(response.data);
    } catch (error) {
      setMensaje('Error al enviar el formulario');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Formulario de Vehículo</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Número RUVS</label>
          <input type="number" name="nro_ruvs" value={formData.nro_ruvs} onChange={handleChange} required />
        </div>
        <div>
          <label>Número de Cargo Policial</label>
          <input type="number" name="nro_cargo_policial" value={formData.nro_cargo_policial} onChange={handleChange} required />
        </div>
        <div>
          <label>Marca</label>
          <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
        </div>
        <div>
          <label>Modelo</label>
          <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} />
        </div>
        <div>
          <label>Tipo</label>
          <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} />
        </div>
        <div>
          <label>Dominio</label>
          <input type="text" name="dominio" value={formData.dominio} onChange={handleChange} />
        </div>
        <div>
          <label>Chasis</label>
          <input type="text" name="chasis" value={formData.chasis} onChange={handleChange} />
        </div>
        <div>
          <label>Motor</label>
          <input type="text" name="motor" value={formData.motor} onChange={handleChange} />
        </div>
        <div>
          <label>Dependencia Policial</label>
          <input type="text" name="dependencia_policial" value={formData.dependencia_policial} onChange={handleChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default FormularioVehiculo;
