import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUserName'
})
export class FormatUserNamePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const parts = value.split('-');
    const take = parts.slice(0, 2);
    const formatted = take.map(word => {
      if (!word) return '';
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });
    return formatted.join(' ');
  }

}
