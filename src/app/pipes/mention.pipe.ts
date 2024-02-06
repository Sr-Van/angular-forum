import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mention',
  standalone: true
})
export class MentionPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const letras = value.split("")
    let adicionarLetra = false
    let mention = ""


    letras.forEach((letra: string) => {


      if (letra === "@") {
        adicionarLetra = true
      }

      if (letra === " " || letra === ",") {
        adicionarLetra = false
      }

      if (adicionarLetra) {
        mention += letra
      }
    })

    const html = `<b>${mention}</b> ${value.replace(mention, " ")}`

    return html
  }

}
