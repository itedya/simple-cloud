import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "pipeValidator", async: false })
export class PipeValidationValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const pipe = new validationArguments.constraints[0];
    pipe.transform(value);

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Pipe validation failed.";
  }
}
