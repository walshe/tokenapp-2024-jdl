import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IA, NewA } from '../a.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IA for edit and NewAFormGroupInput for create.
 */
type AFormGroupInput = IA | PartialWithRequiredKeyOf<NewA>;

type AFormDefaults = Pick<NewA, 'id'>;

type AFormGroupContent = {
  id: FormControl<IA['id'] | NewA['id']>;
};

export type AFormGroup = FormGroup<AFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AFormService {
  createAFormGroup(a: AFormGroupInput = { id: null }): AFormGroup {
    const aRawValue = {
      ...this.getFormDefaults(),
      ...a,
    };
    return new FormGroup<AFormGroupContent>({
      id: new FormControl(
        { value: aRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getA(form: AFormGroup): NewA {
    return form.getRawValue() as NewA;
  }

  resetForm(form: AFormGroup, a: AFormGroupInput): void {
    const aRawValue = { ...this.getFormDefaults(), ...a };
    form.reset(
      {
        ...aRawValue,
        id: { value: aRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AFormDefaults {
    return {
      id: null,
    };
  }
}
