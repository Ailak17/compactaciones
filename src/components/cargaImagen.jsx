import React, { useState } from 'react';

const CargaImagen = () => {
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Maneja el cambio de imagen
  const handleImageChange = (e) => {
    setImagen(e.target.files[0]); // Guarda el archivo de imagen
  };

  // Envía la imagen al backend
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setMensaje("Por favor selecciona una imagen antes de cargar.");
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
      const response = await fetch('http://localhost:3000/api/upload-imagen', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje("Imagen cargada exitosamente");
      } else {
        setMensaje("Error al cargar la imagen");
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
      setMensaje("Error al enviar la imagen");
    }
  };

  return (
    <div>
      <h2>Cargar Acta</h2>
      <form onSubmit={handleImageUpload}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Subir Imagen</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CargaImagen;
