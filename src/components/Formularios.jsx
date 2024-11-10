import React, { useState } from 'react';
import axios from 'axios';
import '../styles/formulario.css'
import CargaImagen from './cargaImagen';

function FormulariosVehiculo() {
  const [vehiculos, setVehiculos] = useState([
    {
      nro_ruvs: 0,
      nro_cargo_policial: 0,
      marca: '',
      modelo: '',
      tipo: '',
      dominio: '',
      chasis: '',
      motor: '',
      dependencia_policial: ''
    }
  ]);

  const [mensaje, setMensaje] = useState('');

  // Maneja el cambio de cada campo en el formulario para cada vehículo
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosVehiculos = [...vehiculos];
    nuevosVehiculos[index][name] = value;
    setVehiculos(nuevosVehiculos);
  };
  

  // Agrega un nuevo vehículo al array
  const agregarVehiculo = () => {
    setVehiculos([
      ...vehiculos,
      {
        nro_ruvs: 0,
        nro_cargo_policial: 0,
        marca: '',
        modelo: '',
        tipo: '',
        dominio: '',
        chasis: '',
        motor: '',
        dependencia_policial: ''
      }
    ]);
  };
  
 
  // Función para pegar información del portapapeles
  
  // Función para pegar información del portapapeles
  const handlePaste = async (index) => {
    try {
      const text = await navigator.clipboard.readText(); // Leer el texto del portapapeles
      console.log(text);
      const data = JSON.parse(text); // Intentar parsear el texto como JSON
  
      // Asegúrate de que los campos coinciden con las propiedades en tu JSON
      const updatedVehiculos = [...vehiculos];
      updatedVehiculos[index] = {
        nro_ruvs: Number(data.nro_ruvs) || '', // Convertir a número
        nro_cargo_policial: Number(data.nro_cargo_policial) || '', // Convertir a número
        marca: data.marca || '',
        modelo: data.modelo || '',
        tipo: data.tipo || '',
        dominio: data.dominio || '',
        chasis: data.chasis || '',
        motor: data.motor || '',
        dependencia_policial: data.dependencia_policial || ''
      };
      setVehiculos(updatedVehiculos); // Actualizar el estado de vehiculos
  
    } catch (error) {
      console.error("Error al pegar la información:", error); // Mostrar error en consola
      alert("El formato de los datos pegados no es válido.");
    }
  };
  


  const eliminarVehiculo = (index) => {
    const nuevosVehiculos = vehiculos.filter((_, i) => i !== index);
    setVehiculos(nuevosVehiculos);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const datos = Array.isArray(vehiculos) ? vehiculos : [vehiculos]; // Asegúrate de enviar un array

    try {
        const response = await axios.post('http://localhost:8000/formulario/multiples', datos);
        setMensaje('Formulario enviado exitosamente');
        console.log(response.data);
    } catch (error) {
        setMensaje('Error al enviar el formulario');
        console.error(error.response.data);
    }
};



  return (
    <div  >
      <CargaImagen/>
      <h2 className='h22' >Carga de Autos</h2>
      <form  onSubmit={handleSubmit}>
        {vehiculos.map((vehiculo, index) => (
          <div   key={index}>
           
            <div className='contenedor' >
            <div className='columnas'>
              <label>Número RUVS</label>
              <input type="number" name="nro_ruvs" value={vehiculo.nro_ruvs} onChange={(e) => handleChange(index, e)} required />
            </div>
            <div className='columnas'>
              <label>Número de Cargo Policial</label>
              <input type="number" name="nro_cargo_policial" value={vehiculo.nro_cargo_policial} onChange={(e) => handleChange(index, e)} required />
            </div>
            <div className='columnas'>
              <label>Marca</label>
              <input type="text" name="marca" value={vehiculo.marca} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className='columnas'>
              <label>Modelo</label>
              <input type="text" name="modelo" value={vehiculo.modelo} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className='columnas'>
              <label>Tipo</label>
              <input type="text" name="tipo" value={vehiculo.tipo} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className='columnas'>
              <label>Dominio</label>
              <input type="text" name="dominio" value={vehiculo.dominio} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className='columnas'>
              <label>Chasis</label>
              <input type="text" name="chasis" value={vehiculo.chasis} onChange={(e) => handleChange(index, e)} />
            </div>
            <div className='columnas'>
              <label>Motor</label>
              <input type="text" name="motor" value={vehiculo.motor} onChange={(e) => handleChange(index, e)} />
            </div>
            
            <div className='columnas'>
              <label>Dependencia Policial</label>
              <input type="text" name="dependencia_policial" value={vehiculo.dependencia_policial} onChange={(e) => handleChange(index, e)} />
            </div>
            
            <button type="button" onClick={() => eliminarVehiculo(index)} style={{   backgroundColor: '#dc3545', color: '#fff', border: 'none',   borderRadius: '5px', cursor: 'pointer'  }}>
              Eliminar Vehículos
            </button>
            <button type="button" onClick={() => handlePaste(index)}>Pegar Información</button>
            </div>
          </div>
        ))}
        
        <button type="button" onClick={agregarVehiculo}>Agregar otro vehículo</button>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default FormulariosVehiculo;
