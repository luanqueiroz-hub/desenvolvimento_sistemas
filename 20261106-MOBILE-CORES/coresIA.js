
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';

const cores = [
  { nome: 'papel', hex: '#F3F0E8' },
  { nome: 'lima', hex: '#D8F071' },
  { nome: 'azul', hex: '#3458E8' },
  { nome: 'coral', hex: '#FD6E57' },
  { nome: 'rosa', hex: '#F4A8C6' },
  { nome: 'lilás', hex: '#AD92E9' },
  { nome: 'musgo', hex: '#266A58' },
  { nome: 'mel', hex: '#F5B75D' },
  { nome: 'névoa', hex: '#D9D4CF' },
  { nome: 'noite', hex: '#1D1D1B' },
  { nome: 'água', hex: '#76D2D0' },
  { nome: 'telha', hex: '#E05A3F' },
];

// Contraste automático
function contraste(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const brilho = (r * 299 + g * 587 + b * 114) / 1000;

  return brilho > 155 ? '#191919' : '#FFFFFF';
}

export default function App() {
  const [indice, setIndice] = useState(0);

  const opacidade = useRef(new Animated.Value(1)).current;
  const movimento = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();

  const atual = cores[indice];
  const tinta = contraste(atual.hex);

  function mudarCor(novoIndice) {
    if (novoIndice === indice) return;

    setIndice(novoIndice);

    opacidade.setValue(0);
    movimento.setValue(15);

    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(movimento, {
        toValue: 0,
        friction: 8,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function proximaCor() {
    mudarCor((indice + 1) % cores.length);
  }

  function corAleatoria() {
    const sorteio = Math.floor(
      Math.random() * (cores.length - 1)
    );

    mudarCor(
      sorteio >= indice ? sorteio + 1 : sorteio
    );
  }

  const numero = String(indice + 1).padStart(2, '0');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: atual.hex },
      ]}
    >
      <StatusBar
        backgroundColor={atual.hex}
        barStyle={
          tinta === '#FFFFFF'
            ? 'light-content'
            : 'dark-content'
        }
      />

      <View style={styles.pagina}>

        {/* IDENTIDADE */}
        <View style={styles.topo}>
          <Text style={[styles.logo, { color: tinta }]}>
            matiz.
          </Text>

          <Text style={[styles.numeracao, { color: tinta }]}>
            {numero} / {cores.length}
          </Text>
        </View>

        {/* ÁREA PRINCIPAL */}
        <Pressable
          style={styles.centro}
          onPress={proximaCor}
          accessibilityRole="button"
          accessibilityLabel="Próxima cor"
        >
          <Animated.View
            style={{
              opacity: opacidade,
              transform: [{ translateY: movimento }],
            }}
          >
            <Text
              style={[
                styles.legenda,
                { color: tinta },
              ]}
            >
              UM ESTUDO SOBRE A COR — {numero}
            </Text>

            <Text
              style={[
                styles.nome,
                {
                  color: tinta,
                  fontSize: Math.min(width * 0.22, 100),
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {atual.nome}.
            </Text>

            <Text
              style={[
                styles.instrucao,
                { color: tinta },
              ]}
            >
              Toque para descobrir outro tom ↗
            </Text>
          </Animated.View>
        </Pressable>

        {/* PALETA */}
        <View style={styles.rodape}>
          <View
            style={[
              styles.linha,
              { backgroundColor: tinta },
            ]}
          />

          <View style={styles.barra}>
            <Text
              style={[
                styles.pequeno,
                { color: tinta },
              ]}
            >
              COLEÇÃO / 12 CORES
            </Text>

            <Pressable
              onPress={corAleatoria}
              accessibilityRole="button"
              accessibilityLabel="Escolher cor aleatória"
              hitSlop={10}
            >
              <Text
                style={[
                  styles.pequeno,
                  { color: tinta },
                ]}
              >
                ALEATÓRIA ↗
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paleta}
          >
            {cores.map((cor, i) => (
              <Pressable
                key={cor.hex}
                onPress={() => mudarCor(i)}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar ${cor.nome}`}
                accessibilityState={{ selected: i === indice }}
                style={styles.itemPaleta}
              >
                <View
                  style={[
                    styles.amostra,
                    {
                      backgroundColor: cor.hex,
                      borderColor: tinta,
                      borderWidth: i === indice ? 2 : 0.5,
                    },
                  ]}
                />

                <View
                  style={[
                    styles.indicador,
                    {
                      backgroundColor:
                        i === indice ? tinta : 'transparent',
                    },
                  ]}
                />
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.informacoes}>
            <Text style={[styles.codigo, { color: tinta }]}>
              {atual.hex.toUpperCase()}
            </Text>

            <Text style={[styles.codigo, { color: tinta }]}>
              {numero} — {atual.nome.toUpperCase()}
            </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pagina: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 25,
  },

  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 32,
    fontStyle: 'italic',
    letterSpacing: -2,
  },

  numeracao: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '500',
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 15,
  },

  legenda: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.8,
    marginBottom: 14,
  },

  nome: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontStyle: 'italic',
    letterSpacing: -3,
    marginBottom: 12,
  },

  instrucao: {
    fontSize: 13,
    fontWeight: '400',
  },

  rodape: {
    width: '100%',
  },

  linha: {
    height: 1,
    opacity: 0.65,
    marginBottom: 22,
  },

  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  pequeno: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },

  paleta: {
    gap: 9,
    paddingBottom: 10,
  },

  itemPaleta: {
    width: 35,
    alignItems: 'center',
  },

  amostra: {
    width: 35,
    height: 48,
    borderRadius: 2,
  },

  indicador: {
    width: '100%',
    height: 2,
    marginTop: 7,
  },

  informacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },

  codigo: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: '500',
  },
});
