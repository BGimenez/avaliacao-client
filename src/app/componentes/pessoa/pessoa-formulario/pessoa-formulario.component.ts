import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PessoaService } from 'src/app/services/pessoa.service';

import { Pessoa } from 'src/app/model/pessoa';

@Component({
  selector: 'app-pessoa-formulario',
  templateUrl: './pessoa-formulario.component.html',
  styleUrls: ['./pessoa-formulario.component.scss']
})
export class PessoaFormularioComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  modoEdicao: boolean = false;
  formulario: FormGroup

  constructor(
    private aRoute: ActivatedRoute,
    private location: Location,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.verificarEdicao();
    this.montarFormulario(new Pessoa());
  }

  ngOnDestroy() {
    if ( this.inscricao )
      this.inscricao.unsubscribe;
  }

  verificarEdicao() {
    this.aRoute.params.subscribe(par => {
      const id = par['id'];
      if ( id )
        this.buscarDados(id);
    });
  }

  buscarDados(id) {
    this.inscricao = this.pessoaService.buscarPorId(id).subscribe(ret => {
      if ( ret ) {
        this.modoEdicao = true;
        this.montarFormulario(ret);
      }
    })
  }

  montarFormulario(dados) {
    this.formulario = Pessoa.montarFormulario(dados);
  }

  onSalvar() {
    this.inscricao = this.pessoaService.salvar(this.formulario.getRawValue()).subscribe(ret => {
      this.onVoltar();
    },
    erro => console.log(erro))
  }

  onExcluir() {
    this.inscricao = this.pessoaService.excluir(this.formulario.get('id').value).subscribe(ret => {
      this.onVoltar();
    },
    erro => console.log(erro))
  }

  onVoltar(){
    this.location.back();
  }

  verificarTouchedValido(campo: string, form: FormGroup) {
    return ( !form.get(campo).valid && ( form.get(campo).touched  || form.get('id').value != null  ) );
  }

  aplicaCssErro(campo: string, form: FormGroup) {
    if (form.get(campo).status !== 'DISABLED') {
      return {
        'has-error': this.verificarTouchedValido(campo, form),
        'has-feedback': this.verificarTouchedValido(campo, form)
      };
    }
  }

}
