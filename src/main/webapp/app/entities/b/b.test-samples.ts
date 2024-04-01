import { IB, NewB } from './b.model';

export const sampleWithRequiredData: IB = {
  id: 20239,
};

export const sampleWithPartialData: IB = {
  id: 23332,
};

export const sampleWithFullData: IB = {
  id: 31185,
};

export const sampleWithNewData: NewB = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
