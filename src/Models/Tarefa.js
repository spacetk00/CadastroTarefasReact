export default class Tarefa {
    constructor(descricao, dataTermino, prioridade, status) {
        this.descricao = descricao;
        this.dataTermino = dataTermino;
        this.prioridade = prioridade;
        this.status = status;
    }
}