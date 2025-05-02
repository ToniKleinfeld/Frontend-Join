import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, maxWords = 2): string {
    if (!value) return '';

    const normalized = value.replace(/-/g, ' ');

    const words = normalized
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .slice(0, maxWords);

    const initials = words.map((w) => w[0].toUpperCase()).join('');
    return initials;
  }
}
