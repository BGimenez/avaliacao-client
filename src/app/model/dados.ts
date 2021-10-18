export class Dados{
  conteudo: any[];
  totalResultados: number;
  tamanhoPagina: number;
  numeroPagina: number;

  constructor() {
    this.numeroPagina = 0;
    this.tamanhoPagina = 5;
    this.totalResultados = 0;
    this.conteudo = [];
  }
}
