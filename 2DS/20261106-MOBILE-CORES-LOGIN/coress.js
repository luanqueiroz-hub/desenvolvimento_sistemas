
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';

export default function App() {

  const [corFundo, setCorFundo] = useState('white');

  return (
    <View style={[styles.container, {backgroundColor: corFundo}]}>

      <Text style={styles.titulo}>
        Escolha uma cor
      </Text>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'yellow'}]}
        onPress={() => setCorFundo('yellow')}
      >
        <Text style={styles.texto}>Amarelo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'blue'}]}
        onPress={() => setCorFundo('blue')}
      >
        <Text style={styles.texto}>Azul</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'red'}]}
        onPress={() => setCorFundo('red')}
      >
        <Text style={styles.texto}>Vermelho</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'green'}]}
        onPress={() => setCorFundo('green')}
      >
        <Text style={styles.texto}>Verde</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'purple'}]}
        onPress={() => setCorFundo('purple')}
      >
        <Text style={styles.texto}>Roxo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, {backgroundColor: 'orange'}]}
        onPress={() => setCorFundo('orange')}
      >
        <Text style={styles.texto}>Laranja</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.limpar}
        onPress={() => setCorFundo('white')}
      >
        <Text style={styles.texto}>Limpar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
  },

  botao: {
    width: 200,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center'
  },

  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  limpar: {
    width: 200,
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15
  }

});
