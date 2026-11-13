import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('painel');
  const [filtro, setFiltro] = useState('Todos');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('Água');

  const [registros, setRegistros] = useState([
    { id: '1', descricao: 'Garrafa manhã', quantidade: 500, unidade: 'ml', categoria: 'Água' },
    { id: '2', descricao: 'Revisão React Native', quantidade: 45, unidade: 'min', categoria: 'Estudo' },
    { id: '3', descricao: 'Caminhada no parque', quantidade: 30, unidade: 'min', categoria: 'Exercício' },
    { id: '4', descricao: 'Copo após almoço', quantidade: 300, unidade: 'ml', categoria: 'Água' },
  ]);

  const totalAgua = registros.filter((r) => r.categoria === 'Água').reduce((s, r) => s + r.quantidade, 0);
  const totalEstudo = registros.filter((r) => r.categoria === 'Estudo').reduce((s, r) => s + r.quantidade, 0);
  const totalExercicio = registros.filter((r) => r.categoria === 'Exercício').reduce((s, r) => s + r.quantidade, 0);
  const percentualAgua = Math.min(100, Math.round((totalAgua / 2000) * 100));

  const adicionarRegistro = () => {
    const valorNum = parseInt(quantidade, 10);
    if (descricao.trim() === '' || isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Informe uma descrição e uma quantidade maior que zero.');
      return;
    }
    const novo = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      quantidade: valorNum,
      unidade: categoria === 'Água' ? 'ml' : 'min',
      categoria,
    };
    setRegistros([novo, ...registros]);
    setDescricao('');
    setQuantidade('');
    setTela('painel');
  };

  const excluirRegistro = (id) => {
    setRegistros(registros.filter((item) => item.id !== id));
  };

  const registrosFiltrados = registros.filter((item) => (filtro === 'Todos' ? true : item.categoria === filtro));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VitaTrack • Rotina Diária</Text>
        <Text style={styles.headerSub}>Monitoramento de hidratação, foco e saúde</Text>
      </View>

      <View style={styles.navbar}>
        {['painel', 'historico', 'registrar'].map((aba) => (
          <TouchableOpacity
            key={aba}
            style={[styles.navBtn, tela === aba && styles.navBtnAtivo]}
            onPress={() => setTela(aba)}
          >
            <Text style={styles.navTxt}>
              {aba === 'painel' ? 'Painel' : aba === 'historico' ? 'Histórico' : '+ Registrar'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tela === 'painel' && (
        <ScrollView style={styles.body}>
          <View style={styles.cardAgua}>
            <Text style={styles.cardAguaTitulo}>Meta Diária de Água (2.000 ml)</Text>
            <Text style={styles.cardAguaValor}>{totalAgua} ml ({percentualAgua}%)</Text>
            <View style={styles.barraFundo}>
              <View style={[styles.barraProgresso, { width: `${percentualAgua}%` }]} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.miniCard, { borderTopColor: '#8b5cf6', marginRight: 6 }]}>
              <Text style={styles.miniLabel}>Tempo de Estudo</Text>
              <Text style={[styles.miniValor, { color: '#8b5cf6' }]}>{totalEstudo} min</Text>
            </View>
            <View style={[styles.miniCard, { borderTopColor: '#10b981', marginLeft: 6 }]}>
              <Text style={styles.miniLabel}>Atividade Física</Text>
              <Text style={[styles.miniValor, { color: '#10b981' }]}>{totalExercicio} min</Text>
            </View>
          </View>

          <Text style={styles.subtitulo}>Atividades Recentes</Text>
          {registros.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.cardItem}>
              <View>
                <Text style={styles.itemTitulo}>{item.descricao}</Text>
                <Text style={styles.itemCat}>{item.categoria}</Text>
              </View>
              <Text style={styles.itemQtd}>+{item.quantidade} {item.unidade}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {tela === 'historico' && (
        <View style={styles.body}>
          <View style={styles.row}>
            {['Todos', 'Água', 'Estudo', 'Exercício'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chipBtn, filtro === cat && styles.chipBtnAtivo]}
                onPress={() => setFiltro(cat)}
              >
                <Text style={[styles.chipTxt, filtro === cat && { color: '#fff' }]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={registrosFiltrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitulo}>{item.descricao}</Text>
                  <Text style={styles.itemCat}>{item.categoria} • {item.quantidade} {item.unidade}</Text>
                </View>
                <TouchableOpacity onPress={() => excluirRegistro(item.id)}>
                  <Text style={styles.btnExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {tela === 'registrar' && (
        <ScrollView style={styles.body}>
          <Text style={styles.subtitulo}>Adicionar Registro</Text>
          <Text style={styles.label}>Categoria:</Text>
          <View style={styles.row}>
            {['Água', 'Estudo', 'Exercício'].map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chipBtn, categoria === cat && styles.chipBtnAtivo]}
                onPress={() => setCategoria(cat)}
              >
                <Text style={[styles.chipTxt, categoria === cat && { color: '#fff' }]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            placeholder={categoria === 'Água' ? 'Ex: Garrafa 500ml' : 'Ex: Leitura de capítulo'}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Quantidade ({categoria === 'Água' ? 'em ml' : 'em minutos'}):</Text>
          <TextInput
            style={styles.input}
            placeholder={categoria === 'Água' ? 'Ex: 350' : 'Ex: 40'}
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <TouchableOpacity style={styles.btnSalvar} onPress={adicionarRegistro}>
            <Text style={styles.btnSalvarTxt}>Salvar Registro</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { backgroundColor: '#0284c7', paddingTop: 45, paddingBottom: 20, paddingHorizontal: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSub: { color: '#e0f2fe', fontSize: 13, marginTop: 2 },
  navbar: { flexDirection: 'row', backgroundColor: '#0369a1', padding: 6 },
  navBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  navBtnAtivo: { backgroundColor: '#38bdf8' },
  navTxt: { color: '#fff', fontWeight: 'bold' },
  body: { flex: 1, padding: 20 },
  row: { flexDirection: 'row', marginBottom: 15 },
  cardAgua: { backgroundColor: '#0ea5e9', padding: 20, borderRadius: 12, marginBottom: 15 },
  cardAguaTitulo: { color: '#e0f2fe', fontSize: 14, fontWeight: '600' },
  cardAguaValor: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 8 },
  barraFundo: { height: 10, backgroundColor: '#0284c7', borderRadius: 5, overflow: 'hidden' },
  barraProgresso: { height: 10, backgroundColor: '#a7f3d0' },
  miniCard: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 10, borderTopWidth: 4 },
  miniLabel: { color: '#64748b', fontSize: 13 },
  miniValor: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  cardItem: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitulo: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  itemCat: { fontSize: 13, color: '#64748b', marginTop: 2 },
  itemQtd: { fontSize: 15, fontWeight: 'bold', color: '#0284c7' },
  chipBtn: { flex: 1, backgroundColor: '#e2e8f0', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 3 },
  chipBtnAtivo: { backgroundColor: '#0284c7' },
  chipTxt: { fontSize: 12, fontWeight: 'bold', color: '#334155' },
  btnExcluir: { color: '#dc2626', fontWeight: 'bold', padding: 6 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
  btnSalvar: { backgroundColor: '#0284c7', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  btnSalvarTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
