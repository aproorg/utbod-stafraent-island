import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as kennitala from 'kennitala';

@ValidatorConstraint({ name: 'nationalIdValidator', async: false })
export class NationalIdValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    return kennitala.isValid(text);
  }

  defaultMessage() {
    return `nationalId is not valid`;
  }
}
