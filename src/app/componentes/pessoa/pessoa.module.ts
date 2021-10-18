import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PessoaComponent } from './pessoa.component';
import { PessoaFormularioComponent } from './pessoa-formulario/pessoa-formulario.component';
import { MensagemModule } from '../mensagem/mensagem.module';

const routes: Routes = [
  {
    path: '',
    component: PessoaComponent
  },
  {
    path: 'novo',
    component: PessoaFormularioComponent
  },
  {
    path: ':id/editar',
    component: PessoaFormularioComponent
  }
];


@NgModule({
  declarations: [
    PessoaComponent,
    PessoaFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    MensagemModule
  ]
})
export class PessoaModule { }
