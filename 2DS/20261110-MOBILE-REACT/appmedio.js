import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [tela, setTela] = useState('lista'); // 'lista' ou 'cadastro'
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('Ficção');
  const [favorito, setFavorito] = useState(false);

  const [filmes, setFilmes] = useState([
    { id: '1', titulo: 'Interestelar', genero: 'Ficção', favorito: true, assistido: true },
    { id: '2', titulo: 'Homem-Aranha: Através do Aranhaverso', genero: 'Ação', favorito: true, assistido: false },
    { id: '3', titulo: 'Oppenheimer', genero: 'Drama', favorito: false, assistido: false },
  ]);

  const adicionarFilme = () => {
    if (titulo.trim().length < 2) {
      Alert.alert('Erro de validação', 'Digite um título válido com pelo menos 2 letras.');
      return;
    }

    const novo = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      genero,
      favorito,
      assistido: false,
    };

    setFilmes([novo, ...filmes]);
    setTitulo('');
    setFavorito(false);
    setTela('lista');
  };

  const alternarAssistido = (id) => {
    setFilmes(
      filmes.map((item) =>
        item.id === id ? { ...item, assistido: !item.assistido } : item
      )
    );
  };

  const removerFilme = (id) => {
    setFilmes(filmes.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Barra de Navegação Superior */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[styles.navBtn, tela === 'lista' && styles.navBtnAtivo]}
          onPress={() => setTela('lista')}
        >
          <Text style={styles.navText}>Minha Lista ({filmes.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, tela === 'cadastro' && styles.navBtnAtivo]}
          onPress={() => setTela('cadastro')}
        >
          <Text style={styles.navText}>+ Novo Título</Text>
        </TouchableOpacity>
      </View>

      {tela === 'lista' ? (
        <View style={styles.conteudo}>
          <Text style={styles.header}>CineList • Filmes & Séries</Text>
          <FlatList
            data={filmes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitulo, item.assistido && styles.riscado]}>
                    {item.favorito ? '⭐ ' : ''}{item.titulo}
                  </Text>
                  <Text style={styles.cardSub}>{item.genero}</Text>
                </View>

                <View style={styles.acoes}>
                  <Switch
                    value={item.assistido}
                    onValueChange={() => alternarAssistido(item.id)}
                  />
                  <TouchableOpacity
                    style={styles.btnExcluir}
                    onPress={() => removerFilme(item.id)}
                  >
                    <Text style={styles.txtExcluir}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <ScrollView style={styles.conteudo}>
          <Text style={styles.header}>Cadastrar Filme ou Série</Text>

          <Text style={styles.label}>Nome da obra:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Matrix"
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Gênero:</Text>
          <View style={styles.rowGeneros}>
            {['Ficção', 'Ação', 'Drama', 'Comédia'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.chip, genero === g && styles.chipAtivo]}
                onPress={() => setGenero(g)}
              >
                <Text style={[styles.chipText, genero === g && { color: '#fff' }]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Marcar como Favorito?</Text>
            <Switch value={favorito} onValueChange={setFavorito} />
          </View>

          <TouchableOpacity style={styles.btnSalvar} onPress={adicionarFilme}>
            <Text style={styles.btnSalvarText}>Salvar na Lista</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingTop: 40 },
  navbar: { flexDirection: 'row', backgroundColor: '#1e3a8a', padding: 10 },
  navBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  navBtnAtivo: { backgroundColor: '#3b82f6' },
  navText: { color: '#fff', fontWeight: 'bold' },
  conteudo: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1f2937' },
  riscado: { textDecorationLine: 'line-through', color: '#9ca3af' },
  cardSub: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  acoes: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btnExcluir: { backgroundColor: '#fee2e2', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  txtExcluir: { color: '#dc2626', fontWeight: 'bold' },
  label: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db' },
  rowGeneros: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#e5e7eb' },
  chipAtivo: { backgroundColor: '#2563eb' },
  chipText: { color: '#374151', fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  btnSalvar: { backgroundColor: '#16a34a', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnSalvarText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
