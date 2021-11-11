import React, {Component} from 'react';
import {Text, TextInput, Button, View, ScrollView, DevSettings} from 'react-native';
import ListaTarefas from './src/Components/ListaTarefas';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import Database from './src/Database/Database';
import Tarefa from './src/Models/Tarefa';
import {main} from './src/Styles/Index.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: '',
      dataTermino: '',
      prioridade: 'baixa',
      status: 0,
      listaTarefas: [],
    };
    this.listarTarefas();
  }

  listarTarefas() {
    const banco = new Database();
    banco.Listar().then(data => {
      this.setState({listaTarefas: data});
    });
  }

  CadastrarTarefa(descricao, dataTermino, prioridade, status) {
    const novaTarefa = new Tarefa(descricao, dataTermino, prioridade, status);
    const banco = new Database();
    banco.Inserir(novaTarefa);
    this.listarTarefas();
  }

  DeletarTarefa(id) {
    const banco = new Database();
    banco.Deletar(id);
    DevSettings.reload();
  }

  FinalizarTarefa(id) {
    const banco = new Database();
    banco.AtualizarStatus(id);
    DevSettings.reload();
  }

  render() {
    return (
      <ScrollView style={main.containerCadastro}>
        <Text style={main.mainTitulo}>Cadastro de Tarefas</Text>
        <TextInput style={main.input}
          onChangeText={valorInformado => {
            this.setState({descricao: valorInformado});
          }}
          placeholder="Descrição da tarefa"></TextInput>
        {/*Picker desatualizado, substituir futuramente*/}
        <Text style={main.subTitulo}>Data de término da tarefa</Text>
        <DatePicker
          style={main.calendario}
          date={this.state.dataTermino}
          mode="date"
          placeholder="Selecionar Data"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({dataTermino: date});
          }}
        />
        <Text style={main.subTitulo}>Prioridade</Text>
        <Picker style={main.picker}
          selectedValue={this.state.prioridade}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({prioridade: itemValue})
          }>
          <Picker.Item label="Baixa" value="baixa" />
          <Picker.Item label="Alta" value="alta" />
        </Picker>
        <Button
          title="Cadastrar"
          onPress={() => {
            this.CadastrarTarefa(
              this.state.descricao,
              this.state.dataTermino,
              this.state.prioridade,
              this.state.status,
            );
          }}></Button>

        {this.state.listaTarefas.map(item => (
          <ListaTarefas
            key={item.id}
            id={item.id}
            descricao={item.descricao}
            dataTermino={item.dataTermino}
            prioridade={item.prioridade}
            status={item.status}
            deletar={this.DeletarTarefa}
            finalizar={this.FinalizarTarefa}
          />
        ))}
      </ScrollView>
    );
  }
}
