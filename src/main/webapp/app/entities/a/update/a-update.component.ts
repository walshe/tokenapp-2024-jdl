import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IA } from '../a.model';
import { AService } from '../service/a.service';
import { AFormService, AFormGroup } from './a-form.service';

@Component({
  standalone: true,
  selector: 'jhi-a-update',
  templateUrl: './a-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AUpdateComponent implements OnInit {
  isSaving = false;
  a: IA | null = null;

  protected aService = inject(AService);
  protected aFormService = inject(AFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AFormGroup = this.aFormService.createAFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ a }) => {
      this.a = a;
      if (a) {
        this.updateForm(a);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const a = this.aFormService.getA(this.editForm);
    this.subscribeToSaveResponse(this.aService.create(a));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IA>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(a: IA): void {
    this.a = a;
    this.aFormService.resetForm(this.editForm, a);
  }
}
