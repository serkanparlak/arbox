import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';

export const animates = [
  trigger('tbody', [transition('void => *', [style({ opacity: 0.5 }), animate(300)])]),
  trigger('bounce', [
    transition('* => *', [
      style({ transform: 'rotate(0)', 'background-color': '#333', filter: 'blur(0)' }),
      animate(
        '2000ms 0s ease',
        keyframes([
          style({ transform: 'rotate(180deg)', 'background-color': 'tomato', filter: 'blur(5px)' }),
          style({ transform: 'rotate(0deg)', 'background-color': 'lightgreen', filter: 'blur(0)' })
        ])
      ),
      animate(1000)
    ])
  ])
];
