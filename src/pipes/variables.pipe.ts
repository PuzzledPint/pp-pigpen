import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variables'
})
export class VariablesPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.includes('$year')) {
      const year = new Date().getFullYear();

      value = value.replace('$year', year.toString());
    }
      return value;
  }
}
