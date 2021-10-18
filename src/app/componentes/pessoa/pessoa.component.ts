import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaService } from 'src/app/services/pessoa.service';

import { Dados } from 'src/app/model/dados';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  mensagem = { emptyMessage: `<span class="text-primary"> Nenhum registro encontrado.</span>`,
               totalMessage: ' registro(s) encontrado(s)'};

  consulta: Dados = new Dados();
  formulario: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.montarFiltro();
    this.onPesquisar();
  }

  onCadastrar() {
    this.router.navigate(['novo'], { relativeTo: this.route});
  }

  onPesquisar() {
    this.pessoaService.consultaPaginada(this.formulario.value).subscribe(ret => {
      if ( ret ) {
        this.consulta.conteudo = ret.conteudo;
        this.consulta.numeroPagina = ret.numeroPagina;
        this.consulta.tamanhoPagina = ret.tamanhoPagina;
        this.consulta.totalResultados = ret.totalResultados;
      }
    });
  }

  onMudarPagina(evento){
    this.formulario.get('page').setValue(evento.offset);
    this.onPesquisar();
  }

  onSelecionar(item) {
    this.router.navigate([item.selected[0].id, 'editar'], { relativeTo: this.route });
  }

  montarFiltro() {
    this.formulario = this.formBuilder.group({
      id: '',
      nome: '',
      cpf: '',
      size: this.consulta.tamanhoPagina,
      page: this.consulta.numeroPagina
    })
  }

  onAtivar($event) {
    //Contorno feito para nao dar erro de unchecked --> https://github.com/swimlane/ngx-datatable/issues/721#issuecomment-327841686
    //ela poderá ser retirada se as próximas versões do ngx-datatable conter a correção da ISSUE acima
    if ($event.type === 'click') {
      $event.cellElement.blur();
    }
  }

}
