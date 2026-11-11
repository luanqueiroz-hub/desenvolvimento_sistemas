
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';

export default function App() {

  const [corFundo, setCorFundo] = useState('#F4F1EB');

  return (
    <View style={[styles.container, {backgroundColor: corFundo}]}>

      <View style={styles.painel}>

        <Text style={styles.titulo}>COR!</Text>

        <Text style={styles.subtitulo}>
          Escolha uma cor.
        </Text>

        <View style={styles.cores}>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#FFE600'}]}
            onPress={() => setCorFundo('#FFE600')}
          >
            <Text style={styles.texto}>Amarelo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#2857FF'}]}
            onPress={() => setCorFundo('#2857FF')}
          >
            <Text style={[styles.texto, {color: 'white'}]}>Azul</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#f71230'}]}
            onPress={() => setCorFundo('#F71230')}
          >
            <Text style={[styles.texto, {color: 'white'}]}>Vermelho</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#00cf23'}]}
            onPress={() => setCorFundo('#00cf23')}
          >
            <Text style={styles.texto}>Verde</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#943DFF'}]}
            onPress={() => setCorFundo('#943DFF')}
          >
            <Text style={[styles.texto, {color: 'white'}]}>Roxo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#FF8800'}]}
            onPress={() => setCorFundo('#FF8800')}
          >
            <Text style={styles.texto}>Laranja</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#FF39AB'}]}
            onPress={() => setCorFundo('#FF39AB')}
          >
            <Text style={styles.texto}>Rosa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#00DCEB'}]}
            onPress={() => setCorFundo('#00DCEB')}
          >
            <Text style={styles.texto}>Turquesa</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.limpar}
          onPress={() => setCorFundo('#F4F1EB')}
        >
          <Text style={styles.textoLimpar}>
            VOLTAR AO INÍCIO ↻
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  painel: {
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 20
  },

  titulo: {
    fontSize: 54,
    fontWeight: 'bold',
    color: 'white'
  },

  subtitulo: {
    fontSize: 15,
    color: '#BBBBBB',
    marginBottom: 25
  },

  cores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  botao: {
    width: '48%',
    height: 85,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },

  texto: {
    color: '#111111',
    fontSize: 17,
    fontWeight: 'bold'
  },

  limpar: {
    borderWidth: 1,
    borderColor: '#666666',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },

  textoLimpar: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }

});