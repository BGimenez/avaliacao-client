import { FormControl } from "@angular/forms";

export class Validacoes {

  static soNumeroValidator(control: FormControl) {
      const valor = control.value;
      if ( valor && valor !== '' ) {
        const regra = /^\d*$/;
        return regra.test(valor) ? null : { soNumeroInvalido : true};
      }

      return null;
    }

  static getMensagemErro(nomeCampo: string, nomeValidacao: string) {
      const config = {
          'required': `${nomeCampo} é obrigatório.`,
          'email': 'Email inválido.',
          'soNumeroInvalido': 'Favor informar somente número para o campo.'
      };

      return config[nomeValidacao];
  }
}
