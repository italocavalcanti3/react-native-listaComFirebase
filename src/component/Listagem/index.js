import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Listagem({ data }){
    return(
         <View style={styles.card}>
            <Text style={styles.nome}>{data.nome}</Text>
            <Text style={styles.cargo}>{data.cargo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        borderWidth: 0.8,
        borderRadius: 5,
        padding: 8,
        borderColor: '#666'
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cargo: {

    },
});