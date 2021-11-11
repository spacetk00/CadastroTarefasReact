import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {lista} from '../Styles/Index.js';

export default class ListaTarefas extends Component {
  render() {

    function verificaData(data) {
      var today = new Date();
      var dataHojeString =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let dataHoje = Date.parse(dataHojeString);
      let dataTarefa = Date.parse(data);

      if (dataTarefa > dataHoje) {
        return 'Ok';
      } else if (dataTarefa === dataHoje) {
        return 'Vencimento';
      } else {
        return 'Atraso';
      }
    }

    // Estiliza a view de acordo com a data registrada
    function getEstilo(data) {
      let dataVerificada = data;
      if (dataVerificada === 'Atraso') {
        return {
          flex: 1,
          backgroundColor: '#e86666',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        };
      } else if (dataVerificada === 'Vencimento') {
        return {
          flex: 1,
          backgroundColor: '#f5c593',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        };
      } else {
        return {
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        };
      }
    }

    // Adiciona uma image a view de acordo com a data registrada
    function getImage(data) {
      let dataVerificada = data;
      if (dataVerificada === 'Atraso') {
        return <Image source={require('../Images/atraso.png')}></Image>;
      } else if (dataVerificada === 'Vencimento') {
        return <Image source={require('../Images/vencimento.png')}></Image>;
      } else {
        return <Image source={require('../Images/ok.png')}></Image>;
      }
    }

    return (
      <View style={lista.containerTarefa}>
        <View style={lista.containerEsquerdo}>
          <Text style={lista.tituloTarefa}>Tarefa</Text>
          <Text>ID: {this.props.id}</Text>
          <Text>Descrição: {this.props.descricao}</Text>
          <Text>Data de Término: {this.props.dataTermino}</Text>
          <Text>
            Prioridade:
            {this.props.prioridade === 'baixa' ? (
              <Text style={lista.statePioridadeBaixa}>
                {this.props.prioridade}
              </Text>
            ) : (
              <Text style={lista.statePioridadeAlta}>
                {this.props.prioridade}
              </Text>
            )}
          </Text>
          <Text>
            Status:
            {this.props.status === 1 ? (
              <Text style={lista.statusConcluido}>Concluída</Text>
            ) : (
              <Text style={lista.statusNaoConcluido}>Não Conluída</Text>
            )}
          </Text>

          <View style={lista.containerBotoes}>
            <TouchableOpacity
              onPress={() => {
                this.props.deletar(this.props.id);
              }}
              style={lista.btnRemover}>
              <Text style={{color: 'white'}}>Remover</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.finalizar(this.props.id);
              }}
              style={lista.btnFinalizar}>
              <Text style={{color: 'black'}}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={getEstilo(verificaData(this.props.dataTermino))}>
          {getImage(verificaData(this.props.dataTermino))}
          <Text style={{fontWeight: 'bold'}}>
            {verificaData(this.props.dataTermino)}
          </Text>
        </View>
      </View>
    );
  }
}
