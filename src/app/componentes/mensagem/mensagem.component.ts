import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validacoes } from 'src/app/model/validacoes';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  /**
   * Atributo usado para referênciar o formulário que está sendo utilizado.
   */
   @Input() formulario: FormGroup;

   /**
    * Campo que será validado no formulário.
    */
   @Input() campo: string;

   /**
    * Nome do campo que foi validado no formulário.
    * Este será utilizado na montagem das mensagens de erro.
    *
    */
   @Input() nomeCampo: string;

  constructor() { }

  ngOnInit(): void {
  }

  get mensagemErro() {
    let controle = <FormControl>this.formulario.get(this.campo);
    for (const nomePropriedade in controle?.errors) {
      if (controle.errors.hasOwnProperty(nomePropriedade) && ( controle.touched || this.formulario.get('id')?.value != null )) {
        return Validacoes.getMensagemErro(this.nomeCampo, nomePropriedade);
      }
    }
    return null;
  }

}
