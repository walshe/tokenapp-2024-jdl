import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IA } from '../a.model';
import { AService } from '../service/a.service';

@Component({
  standalone: true,
  templateUrl: './a-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ADeleteDialogComponent {
  a?: IA;

  protected aService = inject(AService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
