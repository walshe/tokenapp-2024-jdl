import { IA } from 'app/entities/a/a.model';

export interface IB {
  id: number;
  a?: IA | null;
}

export type NewB = Omit<IB, 'id'> & { id: null };
