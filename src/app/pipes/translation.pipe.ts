import { Pipe, PipeTransform } from '@angular/core';
import { ES } from '../locales/es';
import { EN } from '../locales/en';

@Pipe({
  name: 'translation',
  pure: false
})
export class TranslationPipe implements PipeTransform {

  transform(value: string, language: string): string {
    if (language === 'en') {
      return EN[value];
    }
    return ES[value];
  }

}
