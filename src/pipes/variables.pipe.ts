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
    if (value && value.includes('$privacy-policy')) {
      const year = new Date().getFullYear();

      value = value.replace('$privacy-policy', "[Privacy Policy Coming soon]");
    }
    if (value && value.includes('$version')) {
      const year = new Date().getFullYear();

      value = value.replace('$version', `[agent="${navigator.userAgent}" Build #${ppPigpenVersion.build} (${ppPigpenVersion.commit})]`);
    }
    return value;
  }
}
