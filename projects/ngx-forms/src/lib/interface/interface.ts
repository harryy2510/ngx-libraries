export interface FormField {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: any;
  validators?: FormValidators;
  options?: FormFieldOption[];
  multiple?: boolean;
  canAdd?: boolean;
  isVisible?: boolean;
  config?: any;
  disabled?: boolean;
  classNames?: string;
  content?: string;
}

export interface FormFieldOption {
  id?: string;
  label?: string;
  value?: any;
  name?: any;
  checked?: boolean;
}

export interface FormValidators {
  [type: string]: {
    value?: any;
    message?: string;
    class?: string;
  };
}
