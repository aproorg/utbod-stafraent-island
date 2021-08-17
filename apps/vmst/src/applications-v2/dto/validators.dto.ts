import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as kennitala from 'kennitala';
import { uniq } from 'underscore';

@ValidatorConstraint({ name: 'nationalIdValidator', async: false })
export class NationalIdValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    return kennitala.isValid(text);
  }

  defaultMessage() {
    return `nationalId is not valid`;
  }
}

@ValidatorConstraint({ name: 'noDuplicateValidator', async: false })
export class NoDuplicateValidator implements ValidatorConstraintInterface {
  validate(items: unknown[], args: ValidationArguments) {
    const [attribute] = args.constraints;
    const values = items.map((item) => item[attribute]);
    return uniq(values).length === values.length;
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args);
    const [attribute] = args.constraints;
    return `Found duplicate value in ${args.property}.${attribute}`;
  }
}
