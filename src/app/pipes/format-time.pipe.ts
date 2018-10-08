import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    if (typeof(value) === 'number') {
      const seconds = value % 60;
      const minutes = Math.floor(value / 60) % 60;
      const hours = Math.floor(value / 3600);

      return `${this.leadingZero(hours)}:${this.leadingZero(minutes)}:${this.leadingZero(seconds)}`;
    }
  }

  private leadingZero(val): string {
    return `${val < 10 ? '0' : ''}${val}`
  }
}
