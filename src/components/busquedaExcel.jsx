import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelForm = () => {
  const [excelData, setExcelData] = useState(() => {
    // Recupera los datos del localStorage al iniciar
    const savedData = localStorage.getItem('excelData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar la carga del archivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      setExcelData(data);
      // Guarda los datos en localStorage
      localStorage.setItem('excelData', JSON.stringify(data));
    };

    reader.readAsBinaryString(file);
  };

  // Función para manejar el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtrar los datos según el término de búsqueda
  const filteredData = excelData.filter(row =>
    row.some(cell => cell?.toString().toLowerCase().includes(searchTerm))
  );

  // Copiar una fila en el formato JSON específico usando un <pre> temporal
  const handleCopyRow = (row) => {
    const formattedJson = {
      nro_ruvs: row[0] || 0,
      nro_cargo_policial: row[1] || 0,
      marca: row[2] || '',
      modelo: row[3] || '',
      tipo: row[4] || '',
      dominio: row[5] || '',
      chasis: row[6] || '',
      motor: row[7] || '',
      dependencia_policial: row[8] || ''
    };

    const jsonString = JSON.stringify(formattedJson, null, 2); // Formato con indentación

    // Crear un elemento <pre> temporal para mantener el formato del JSON
    const pre = document.createElement("pre");
    pre.textContent = jsonString;
    document.body.appendChild(pre);

    // Seleccionar y copiar el contenido del <pre>
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      alert("Datos copiados en el portapapeles:\n" + jsonString);
    } catch (err) {
      console.error("Error al copiar", err);
    }

    // Limpiar la selección y eliminar el elemento temporal
    selection.removeAllRanges();
    document.body.removeChild(pre);
  };

  return (
    <div>
      <h2>Importar, Buscar y Exportar Datos de Excel</h2>

      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{margin: '20px'}}/>

      <div style={{margin:"20px"}}>
        <input
          type="text"
          placeholder="Buscar en el Excel..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table border="1">
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
              <td>
                <button onClick={() => handleCopyRow(row)}>Copiar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelForm;
