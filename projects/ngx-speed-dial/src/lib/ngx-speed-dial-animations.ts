// import {animate, query, state, style, transition, trigger} from '@angular/animations';
//
// export const spinInOut = trigger('spinInOut', [
//   state('in', style({transform: 'rotate(0)', opacity: '1'})),
//   transition(':enter', [
//     style({transform: 'rotate(-180deg)', opacity: '0'}),
//     animate('150ms ease')
//   ]),
//   transition(':leave', [
//     animate('150ms ease', style({transform: 'rotate(180deg)', opacity: '0'}))
//   ]),
// ]);
//
// export const preventInitialAnimation = trigger('preventInitialAnimation', [
//   transition(':enter', [
//     query(':enter', [], {optional: true})
//   ]),
// ]);
