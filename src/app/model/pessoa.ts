import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Validacoes } from "./validacoes";

export class Pessoa {

  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  contatos: Contato[];

  constructor() {
    this.contatos = [];
  }

  static montarFormulario(dados: Pessoa): FormGroup {
    return new FormGroup({
      id: new FormControl(dados.id),
      nome: new FormControl(dados.nome, [Validators.required]),
      cpf: new FormControl(dados.cpf, [Validators.required, Validacoes.soNumeroValidator]),
      dataNascimento: new FormControl(dados.dataNascimento, [Validators.required]),
      contatos: new FormArray(dados.contatos.map(con => Contato.montarFormulario(con)))
    });
  }

}

export class Contato {

  id: number;
  nome: string;
  telefone: string;
  email: string;

  static montarFormulario(dados: Contato): FormGroup {
    return new FormGroup({
      id: new FormControl(dados.id),
      nome: new FormControl(dados.nome, [Validators.required]),
      telefone: new FormControl(dados.telefone, [Validators.required]),
      email: new FormControl(dados.email, [Validators.required, Validators.email]),
    });
  }
}
