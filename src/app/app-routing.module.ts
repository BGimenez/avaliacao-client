import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pessoa',
    pathMatch: 'full'
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./componentes/pessoa/pessoa.module').then(m => m.PessoaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
