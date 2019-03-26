import { Pipe, PipeTransform } from '@angular/core';
import { ppPigpenVersion } from 'src/environments/version';

@Pipe({
  name: 'variables'
})
export class VariablesPipe implements PipeTransform {

  public transform(value: string): string {
    if (value && value.includes('$year')) {
      const year = new Date().getFullYear();

      value = value.replace('$year', year.toString());
    }
    return value;
  }
}
