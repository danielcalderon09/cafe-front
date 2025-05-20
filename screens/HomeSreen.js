import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { obtenerPredicciones } from '../services/api';

export default function HomeScreen() {
  const [pais, setPais] = useState('Col');
  const [mes, setMes] = useState('1');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const consultar = async () => {
  setCargando(true);
  setResultado(null);
  setError(null);

  try {
    const data = await obtenerPredicciones(pais, parseInt(mes));

    if (data.error) throw new Error(data.mensaje);
    if (!data.precio_exportacion || !data.precio_bolsa) throw new Error("Datos incompletos");

    const res = {
      precio: data.precio_exportacion,
      bolsa: data.precio_bolsa,
      diferencia: data.precio_exportacion - data.precio_bolsa,
      variacion: ((data.precio_exportacion - data.precio_bolsa) / data.precio_bolsa) * 100
    };
    setResultado(res);
  } catch (err) {
    setError(err.message || 'Error al obtener los datos');
  }

  setCargando(false);
};

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>☕ Predicción Precio del Café</Text>

        <Text style={styles.label}>🌎 País:</Text>
        <Picker selectedValue={pais} onValueChange={setPais} style={styles.picker}>
          <Picker.Item label="Colombia" value="Col" />
          <Picker.Item label="Brasil" value="Br" />
          <Picker.Item label="Vietnam" value="Vtm" />
        </Picker>

        <Text style={styles.label}>📅 Mes:</Text>
        <Picker selectedValue={mes} onValueChange={setMes} style={styles.picker}>
          {meses.map((nombre, i) => (
            <Picker.Item key={i} label={nombre} value={`${i + 1}`} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.boton} onPress={consultar}>
          <Text style={styles.botonTexto}>Consultar Datos</Text>
        </TouchableOpacity>

        {cargando && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#fff" />}

        {resultado && (
          <View style={styles.resultado}>
            <Text style={styles.resultText}>📈 Precio Estimado: {resultado.precio.toFixed(2)} USD/kg</Text>
            <Text style={styles.resultText}>🏦 Precio Bolsa: {resultado.bolsa.toFixed(2)} USD/kg</Text>
            <Text style={styles.resultText}>💸 Diferencia: {resultado.diferencia.toFixed(2)} USD/kg</Text>
            <Text style={styles.resultText}>📊 Variación: {resultado.variacion.toFixed(2)}%</Text>
          </View>
        )}

        {error && <Text style={styles.error}>⚠️ Error: {error}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(44, 27, 19, 0.7)',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#f4e1d2',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#f7f1ec',
  },
  picker: {
    backgroundColor: '#f2e5d7',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 15,
    color: '#4e342e',
  },
  boton: {
    backgroundColor: '#6f4e37',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  botonTexto: {
    color: '#fff6e6',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#fffaf0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfa48f',
  },
  resultText: {
    color: '#3e2723',
    marginBottom: 5,
    fontWeight: '600',
  },
  error: {
    marginTop: 20,
    color: '#ff6b6b',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
