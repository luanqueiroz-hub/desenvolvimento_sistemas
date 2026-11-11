
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ImageBackground, Image, StyleSheet, Alert
} from 'react-native';

export default function App() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [usuario, setUsuario] = useState('');

  // VALIDAR LOGIN
  function entrar() {
    if (
      (login === 'adm' && senha === '2026') ||
      (login === 'aluno' && senha === '1234')
    ) {
      setUsuario(login);
      setLogado(true);
    } else {
      Alert.alert('Ops!', 'Usuário ou senha incorretos.');
      setLogin('');
      setSenha('');
    }
  }

  // SAIR DO SISTEMA
  function sair() {
    setLogado(false);
    setLogin('');
    setSenha('');
  }

  // TELA APÓS O LOGIN
  if (logado) {
    return (
      <ImageBackground
        source={{
          uri: 'https://updateordie.com/wp-content/uploads/2025/01/mcdonalds_logo-1044x586.webp'
        }}
        style={styles.foto}
        resizeMode="cover"
      >
        <View style={styles.sombra}>

          <Text style={styles.marcaBranca}>
            McDonald's
          </Text>

          <View>
            <Text style={styles.bemVindo}>
              Olá, {usuario}!
            </Text>

            <Text style={styles.frase}>
              Seu momento Méqui chegou.
            </Text>

            <TouchableOpacity
              style={styles.botaoAmarelo}
              onPress={sair}
            >
              <Text style={styles.textoEscuro}>
                Sair da conta →
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    );
  }

  // TELA DE LOGIN
  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>

        <Image
          source={{
            uri: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/330px-McDonald%27s_Golden_Arches.svg.png"
          }}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.marca}>
          McDonald's®
        </Text>

        <Text style={styles.titulo}>
          Bateu aquela fome?
        </Text>

        <Text style={styles.subtitulo}>
          Seu Méqui começa aqui.
        </Text>

      </View>

      <View style={styles.conteudo}>

        <Text style={styles.tituloLogin}>
          Que bom te ver!
        </Text>

        <Text style={styles.descricao}>
          Entre para aproveitar seu momento Méqui.
        </Text>

        <Text style={styles.label}>
          Usuário
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#999"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={entrar}
        >
          <Text style={styles.textoBotao}>
            Entrar na minha conta →
          </Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          Simples. Rápido. Do seu jeito.
        </Text>

      </View>
    </View>
  );
}

// ESTILIZAÇÃO
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  cabecalho: {
    backgroundColor: '#DA291C',
    padding: 30,
    paddingTop: 55,
    paddingBottom: 45
  },

  logo: {
    width: 95,
    height: 85,
    marginBottom: 15
  },

  marca: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 25
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },

  subtitulo: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 8
  },

  conteudo: {
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },

  tituloLogin: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#212121'
  },

  descricao: {
    color: '#777777',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 30
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333'
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 20,
    color: '#212121'
  },

  botao: {
    backgroundColor: '#DA291C',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  rodape: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 12,
    marginTop: 25
  },

  // TELA DE BOAS-VINDAS

  foto: {
    flex: 1
  },

  sombra: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 60,
    justifyContent: 'space-between'
  },

  marcaBranca: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold'
  },

  bemVindo: {
    fontSize: 38,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },

  frase: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 30
  },

  botaoAmarelo: {
    backgroundColor: '#FFC72C',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center'
  },

  textoEscuro: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
