import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'message'
})

export class MessagePipe implements PipeTransform {
  transform(validator: any, name: string, label: string): any {
    if (!validator) {
      return '';
    }
    let message = validator.message || '';
    message = message.replace(':field', label ? label : name || '');
    message = message.replace(':value', validator.value || '');
    switch (validator.type) {
      case 'range':
        message = message.replace(':min', validator.value[0] || '');
        message = message.replace(':max', validator.value[1] || '');
        break;
    }
    return message;
  }
}
