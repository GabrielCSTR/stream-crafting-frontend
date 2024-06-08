import type { GenericObject } from 'vee-validate'
import type { DynamicFormProps } from './DynamicForm'
import type { Loaddable } from '..'

export interface AuthBaseProps extends Partial<Loaddable> {
  title: string
  handleSubmit(values: GenericObject): any
  dynamicFormProps: DynamicFormProps
  submitBtnText: string
}
