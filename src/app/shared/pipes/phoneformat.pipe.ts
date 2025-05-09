import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneformat',
})
export class PhoneformatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const digits = value.replace(/\D+/g, '');

    if (digits.startsWith('0')) {
      return '+49 ' + digits.substring(1);
    } else {
      return '+49 ' + digits;
    }
  }
}
