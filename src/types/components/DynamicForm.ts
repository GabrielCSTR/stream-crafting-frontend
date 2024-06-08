import type { GenericObject, FormContext } from 'vee-validate'
import type { ClassType, Disablable, Loaddable } from '..'

export interface DynamicFormField extends Partial<Loaddable & Disablable> {
  label?: string
  classes?: ClassType | ClassType[]
  component: any
  bind?: GenericObject
}

export interface DynamicFormProps<T extends string | symbol = any>
  extends Partial<Loaddable & Disablable> {
  fields: Record<T, DynamicFormField>
  formContext: FormContext
}
