import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [cracha, setCracha] = useState(null);

  const gerarCracha = () => {
    if (nome.trim() === '' || cargo.trim() === '') {
      Alert.alert('Atenção', 'Preencha seu nome e sua área/cargo!');
      return;
    }
    setCracha({ nome, cargo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerador de Crachá Dev</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome completo..."
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu cargo (Ex: Dev Mobile)"
        placeholderTextColor="#888"
        value={cargo}
        onChangeText={setCargo}
      />

      <Button title="Gerar Crachá" onPress={gerarCracha} color="#2196f3" />

      {cracha && (
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://flaticon.com' }}
            style={styles.avatar}
          />
          <Text style={styles.cardNome}>{cracha.nome}</Text>
          <Text style={styles.cardCargo}>{cracha.cargo}</Text>
          <Text style={styles.cardEmpresa}>ACESSO LIBERADO • 2026</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 12,
  },
  card: {
    marginTop: 25,
    width: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginBottom: 10,
  },
  cardNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardCargo: {
    fontSize: 16,
    color: '#60a5fa',
    marginTop: 4,
  },
  cardEmpresa: {
    marginTop: 12,
    fontSize: 12,
    color: '#4caf50',
    fontWeight: 'bold',
  },
});
