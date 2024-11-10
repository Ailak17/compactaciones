import React, { useState } from 'react';
import userService from '../services/userService';
import ExcelForm from '../components/busquedaExcel';

const Busqueda = () => {
 

  return (
    < div style={{margin: "90px" }}>
      <ExcelForm/>
    </div>
  );
};

export default Busqueda;

