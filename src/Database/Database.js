import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'CadastroTarefas.db';
const database_version = '1.0';
const database_displayname = 'Cadastro Tarefas';
const database_size = 200000;

export default class Database {
  Conectar() {
    let db;
    return new Promise(resolve => {
      console.log('Checando a integridade do plugin ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integridade Ok ...');
          console.log('Abrindo Banco de Dados ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Banco de dados Aberto');
              db.executeSql('SELECT 1 FROM Tarefa LIMIT 1')
                .then(() => {
                  console.log(
                    'O banco de dados está pronto ... Executando Consulta SQL ...',
                  );
                })
                .catch(error => {
                  console.log('Erro Recebido: ', error);
                  console.log(
                    'O Banco de dados não está pronto ... Criando Dados',
                  );
                  db.transaction(tx => {
                    tx.executeSql(
                      'CREATE TABLE IF NOT EXISTS Tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(30), dataTermino DATE, prioridade VARCHAR(30), status INTEGER)',
                    );
                  })
                    .then(() => {
                      console.log('Tabela criada com Sucesso');
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log('echoTest Falhou - plugin não funcional');
        });
    });
  }

  Desconectar(db) {
    if (db) {
      console.log('Fechando Banco de Dados');
      db.close()
        .then(status => {
          console.log('Banco de dados Desconectado!!');
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log('A conexão com o banco não está aberta');
    }
  }

  Listar() {
    return new Promise(resolve => {
      const listaTarefas = [];
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Tarefa', []).then(([tx, results]) => {
              console.log('Consulta completa');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {id, descricao, dataTermino, prioridade, status} = row;
                listaTarefas.push({
                  id,
                  descricao,
                  dataTermino,
                  prioridade,
                  status,
                });
              }
              resolve(listaTarefas);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  Inserir(tarefa) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO Tarefa (descricao, dataTermino, prioridade, status) VALUES (?, ?, ?, ?)',
              [
                tarefa.descricao,
                tarefa.dataTermino,
                tarefa.prioridade,
                tarefa.status,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  Atualizar(tarefa) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Tarefa SET descricao = ?, dataTermino = ?, prioridade = ?, status = ? WHERE id = ?',
              [
                tarefa.descricao,
                tarefa.dataTermino,
                tarefa.prioridade,
                tarefa.status,
                tarefa.id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  AtualizarStatus(id) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            //Query SQL para atualizar um dado no banco
            tx.executeSql("UPDATE Tarefa SET status = 1 WHERE id = ?", [
              id,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  Deletar(id) {
    return new Promise(resolve => {
      this.Conectar()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Tarefa WHERE id = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(result => {
              this.Desconectar(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
