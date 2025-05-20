const BASE_URL = 'http://192.168.1.4:5000'; 

export const obtenerPredicciones = async (pais, mes) => {
  try {
    const response = await fetch(`${BASE_URL}/precio_cafe?pais=${pais}&mes=2025-${mes.toString().padStart(2, '0')}`);

    if (!response.ok) {
      throw new Error('Error al obtener las predicciones');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la petición:', error.message);
    return { error: true, mensaje: error.message };
  }
};
