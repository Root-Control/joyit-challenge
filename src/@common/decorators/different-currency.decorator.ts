import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsDifferentCurrency(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDifferentCurrency',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[args.constraints[0]];
          return value !== relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be equal to ${args.constraints[0]}`;
        },
      },
    });
  };
}
