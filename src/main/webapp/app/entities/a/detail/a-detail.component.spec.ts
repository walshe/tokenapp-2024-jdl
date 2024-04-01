import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ADetailComponent } from './a-detail.component';

describe('A Management Detail Component', () => {
  let comp: ADetailComponent;
  let fixture: ComponentFixture<ADetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ADetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ADetailComponent,
              resolve: { a: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ADetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load a on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ADetailComponent);

      // THEN
      expect(instance.a).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
