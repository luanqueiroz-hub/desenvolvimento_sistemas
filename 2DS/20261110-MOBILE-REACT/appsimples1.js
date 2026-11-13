import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [timeA, setTimeA] = useState('Nós');
  const [pontosA, setPontosA] = useState(0);

  const adicionarPonto = (valor) => {
    const novoPlacar = pontosA + valor;
    if (novoPlacar >= 12) {
      Alert.alert('Fim de Jogo!', `O time "${timeA}" venceu a partida!`);
      setPontosA(0);
      return;
    }
    setPontosA(novoPlacar);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://flaticon.com' }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Marcador de Pontos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da equipe..."
        placeholderTextColor="#888"
        value={timeA}
        onChangeText={setTimeA}
      />

      <Text style={styles.placar}>{pontosA} pts</Text>

      <View style={styles.botoes}>
        <Button title="+ 1 Ponto" onPress={() => adicionarPonto(1)} color="#4caf50" />
        <View style={{ height: 10 }} />
        <Button title="+ 3 Pontos (Truco)" onPress={() => adicionarPonto(3)} color="#ff9800" />
        <View style={{ height: 10 }} />
        <Button title="Zerar Placar" onPress={() => setPontosA(0)} color="#f44336" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e24',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000000',
    textAlign: 'center',
  },
  placar: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#61dafb',
    marginVertical: 15,
  },
  botoes: {
    width: '100%',
  },
});
