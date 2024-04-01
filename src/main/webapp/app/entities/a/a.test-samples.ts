import { IA, NewA } from './a.model';

export const sampleWithRequiredData: IA = {
  id: 24864,
};

export const sampleWithPartialData: IA = {
  id: 177,
};

export const sampleWithFullData: IA = {
  id: 17295,
};

export const sampleWithNewData: NewA = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
