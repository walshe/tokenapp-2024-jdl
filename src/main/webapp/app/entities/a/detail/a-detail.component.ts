import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IA } from '../a.model';

@Component({
  standalone: true,
  selector: 'jhi-a-detail',
  templateUrl: './a-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ADetailComponent {
  @Input() a: IA | null = null;

  previousState(): void {
    window.history.back();
  }
}
