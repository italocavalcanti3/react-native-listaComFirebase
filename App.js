import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet, FlatList, Button, TextInput, Keyboard, ActivityIndicator} from 'react-native';

import { db } from './src/firebaseConnection';
import { ref, onValue, push, set } from 'firebase/database';

import Listagem from './src/component/Listagem';

export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function carrega(){
      await onValue( ref(db, 'usuarios/'), snapshot =>{
        setUsuarios([]);
        snapshot.forEach( childItem => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            cargo: childItem.val().cargo
          }
          setUsuarios( oldArray => [...oldArray, data].reverse() );
        });

        setLoading(false);

      });
    }

    carrega();

  }, []);

  async function cadastrar(){
    if (nome !== '' && cargo !== ''){
      let usuarios = await ref(db, 'usuarios');
      let chave = push(usuarios)

      set( (usuarios, chave), {
        nome: nome,
        cargo: cargo
      } );
    }
    setNome('');
    setCargo('');
    Keyboard.dismiss();
  }

  return(
    <View style={styles.container}>
    
      <View style={styles.viewInput}>
        <Text style={styles.titulo}>Lista de Funcionários</Text>
        <TextInput
        style={styles.input}
        value={nome}
        placeholder='Digite um nome'
        onChangeText={nome => setNome(nome)}
        />
        <TextInput
        style={styles.input}
        value={cargo}
        placeholder='Digite um cargo'
        onChangeText={cargo => setCargo(cargo)}
        />
        <Button
        title='Cadastrar usuário'
        onPress={cadastrar}
        />
      </View>
      <View style={styles.viewFlatList}>

        {loading?
        (
          <ActivityIndicator color='#1999' size={45} />
          ) :
          (
            <FlatList
            style={styles.flatList}
            keyExtractor={item => item.key}
            data={usuarios}
            renderItem={ ({item}) => ( <Listagem data={item} /> ) }
            />
            )
          }
      
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    marginTop: 8,
  },
  viewInput: {
    marginBottom: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    lineHeight: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 8,
  },
  input: {
    fontSize: 20,
    lineHeight: 32,
    backgroundColor: '#EEE',
    marginVertical: 8,
    padding: 12,
    borderRadius: 4,
  },
  lista: {
    flex: 3,
    flexDirection: 'column',
    borderTopWidth: 0.8,
    paddingVertical: 8,
  },
  flatList: {

  },
});