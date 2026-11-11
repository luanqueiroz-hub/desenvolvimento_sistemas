
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  ScrollView, StyleSheet, SafeAreaView
} from 'react-native';

export default function App() {
  const cores = [
    ['papel', '#F3F0E8'],
    ['lima', '#D8F071'],
    ['azul', '#3458E8'],
    ['coral', '#FD6E57'],
    ['rosa', '#F4A8C6'],
    ['lilás', '#AD92E9'],
    ['musgo', '#266A58'],
    ['mel', '#F5B75D'],
    ['névoa', '#D9D4CF'],
    ['noite', '#1D1D1B'],
    ['água', '#76D2D0'],
    ['telha', '#E05A3F']
  ];

  const [indice, setIndice] = useState(0);
  const cor = cores[indice];

  const texto = [2, 6, 9].includes(indice)
    ? 'white' : '#191919';

  function surpresa() {
    let numero = Math.floor(Math.random() * cores.length);
    if (numero === indice) numero = (numero + 1) % cores.length;
    setIndice(numero);
  }

  return (
    <SafeAreaView style={[styles.tela, {backgroundColor: cor[1]}]}>

      <View style={styles.topo}>
        <Text style={[styles.logo, {color: texto}]}>matiz.</Text>
        <Text style={{color: texto}}>{indice + 1} / 12</Text>
      </View>

      <TouchableOpacity
        style={styles.centro}
        onPress={() => setIndice((indice + 1) % cores.length)}
      >
        <Text style={[styles.legenda, {color: texto}]}>
          UM ESTUDO SOBRE A COR
        </Text>

        <Text
          style={[styles.nome, {color: texto}]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {cor[0]}.
        </Text>

        <Text style={{color: texto}}>
          Toque para descobrir outro tom ↗
        </Text>
      </TouchableOpacity>

      <View style={styles.rodape}>
        <View style={[styles.linha, {backgroundColor: texto}]} />

        <View style={styles.topo}>
          <Text style={[styles.legenda, {color: texto}]}>
            COLEÇÃO / 12 CORES
          </Text>

          <Text
            onPress={surpresa}
            style={[styles.legenda, {color: texto}]}
          >
            ALEATÓRIA ↗
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cores.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setIndice(i)}
              style={[
                styles.botao,
                {
                  backgroundColor: item[1],
                  borderColor: texto,
                  borderWidth: indice === i ? 2 : 0
                }
              ]}
            />
          ))}
        </ScrollView>

        <View style={styles.topo}>
          <Text style={{color: texto}}>{cor[1]}</Text>
          <Text style={{color: texto}}>{cor[0].toUpperCase()}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 25,
    justifyContent: 'space-between'
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: 32,
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  centro: {
    flex: 1,
    justifyContent: 'center'
  },
  legenda: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 12
  },
  nome: {
    fontSize: 75,
    fontFamily: 'serif',
    fontStyle: 'italic',
    marginBottom: 12
  },
  rodape: {
    paddingBottom: 15,
    gap: 15
  },
  linha: {
    height: 1
  },
  botao: {
    width: 35,
    height: 48,
    marginRight: 9,
    borderRadius: 2
  }
});