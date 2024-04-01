import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AService } from '../service/a.service';
import { IA } from '../a.model';
import { AFormService } from './a-form.service';

import { AUpdateComponent } from './a-update.component';

describe('A Management Update Component', () => {
  let comp: AUpdateComponent;
  let fixture: ComponentFixture<AUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let aFormService: AFormService;
  let aService: AService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), AUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    aFormService = TestBed.inject(AFormService);
    aService = TestBed.inject(AService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const a: IA = { id: 456 };

      activatedRoute.data = of({ a });
      comp.ngOnInit();

      expect(comp.a).toEqual(a);
    });
  });

  describe('save', () => {
    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IA>>();
      const a = { id: 123 };
      jest.spyOn(aFormService, 'getA').mockReturnValue({ id: null });
      jest.spyOn(aService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ a: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: a }));
      saveSubject.complete();

      // THEN
      expect(aFormService.getA).toHaveBeenCalled();
      expect(aService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });
  });
});
