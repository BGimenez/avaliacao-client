import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { API } from "src/app.api";
import { Dados } from '../model/dados';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  baseUrl: string = API;
  cabecalho: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl += '/pessoa';
    this.cabecalho = this.cabecalho.set('Content-Type', 'application/json;charset=UTF-8');
  }

   /**
     * Obtem as mensagens de erro da requisição e trata para serem exibidas.
     */
    obterErro(erro: HttpErrorResponse) {
      console.log('Ocorreu um erro: ', erro.error.message);
      return throwError('Opa, tivemos um problema');
  }

  salvar(dados: Pessoa): Observable<Pessoa> {
    if ( !dados.id ) {
      return this.http.post<Pessoa>(this.baseUrl, JSON.stringify(dados), { headers: this.cabecalho })
        .pipe(catchError(this.obterErro));
    } else {
      return this.http.put<Pessoa>(`${this.baseUrl}/${dados.id}`, JSON.stringify(dados), { headers: this.cabecalho})
        .pipe(catchError(this.obterErro));
    }
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.obterErro));
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.obterErro));
  }

  consultaPaginada(parametros: any) {
    return this.http.get<Dados[]>(`${this.baseUrl}/pesquisar`, { params: parametros})
      .pipe(
        map( ret => {
          const dados = JSON.parse(JSON.stringify(ret));
          const retorno = new Dados();
          retorno.conteudo = dados.content;
          retorno.totalResultados = dados.totalElements;
          retorno.numeroPagina = dados.number;
          retorno.tamanhoPagina = dados.size;
          return retorno;
        }),
        catchError(this.obterErro)
      );
  }

  buscarTodos() {
    return this.http.get<Pessoa[]>(`${this.baseUrl}/buscarTodos`)
      .pipe(
        catchError(this.obterErro)
      );
  }

}
