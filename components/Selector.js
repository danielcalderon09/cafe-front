import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Selector({ pais, setPais, mes, setMes }) {
  return (
    <View>
      <Text>Selecciona el país:</Text>
      <Picker selectedValue={pais} onValueChange={(value) => setPais(value)}>
        <Picker.Item label="Colombia" value="Col" />
        <Picker.Item label="Brasil" value="Br" />
        <Picker.Item label="Vietnam" value="Vtm" />
      </Picker>

      <Text>Selecciona el mes:</Text>
      <Picker selectedValue={mes} onValueChange={(value) => setMes(value)}>
        {Array.from({ length: 12 }, (_, i) => (
          <Picker.Item key={i} label={`Mes ${i + 1}`} value={i + 1} />
        ))}
      </Picker>
    </View>
  );
}
