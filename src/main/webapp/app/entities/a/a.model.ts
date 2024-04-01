export interface IA {
  id: number;
}

export type NewA = Omit<IA, 'id'> & { id: null };
