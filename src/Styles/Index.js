import {StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;

const header = StyleSheet.create({
  background: {
    width: width,
    height: 80,
    backgroundColor: '#17569b',
  },
  container: {
    left: 16,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  logo: {
    width: 80,
    height: 80,
    right: 20,
    position: 'absolute',
  },
});

const main = StyleSheet.create({
  containerCadastro: {
    flex: 1,
    padding: 5,
  },

  mainTitulo: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#355df0',
    borderWidth: 0.5,
  },
  input: {
    width: 300,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  subTitulo: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 5,
  },
  calendario: {
    width: 300,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  picker: {
    width: 300,
  },
});

const lista = StyleSheet.create({
  containerTarefa: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    margin: 10,
    backgroundColor: '#355df0',
    borderWidth: 1,
  },

  tituloTarefa: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statePioridadeBaixa: {
    backgroundColor: '#668fe8',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  statePioridadeAlta: {
    backgroundColor: '#eb802f',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  statusNaoConcluido: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
  },

  statusConcluido: {
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
  },

  containerEsquerdo: {
    margin: 5,
  },

  containerBotoes: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },

  btnRemover: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'red',
  },

  btnFinalizar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#80fff0',
  },
});

export {header, main, lista};
