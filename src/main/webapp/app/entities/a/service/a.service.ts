import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IA, NewA } from '../a.model';

export type EntityResponseType = HttpResponse<IA>;
export type EntityArrayResponseType = HttpResponse<IA[]>;

@Injectable({ providedIn: 'root' })
export class AService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/as');

  create(a: NewA): Observable<EntityResponseType> {
    return this.http.post<IA>(this.resourceUrl, a, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IA[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAIdentifier(a: Pick<IA, 'id'>): number {
    return a.id;
  }

  compareA(o1: Pick<IA, 'id'> | null, o2: Pick<IA, 'id'> | null): boolean {
    return o1 && o2 ? this.getAIdentifier(o1) === this.getAIdentifier(o2) : o1 === o2;
  }

  addAToCollectionIfMissing<Type extends Pick<IA, 'id'>>(aCollection: Type[], ...aSToCheck: (Type | null | undefined)[]): Type[] {
    const aS: Type[] = aSToCheck.filter(isPresent);
    if (aS.length > 0) {
      const aCollectionIdentifiers = aCollection.map(aItem => this.getAIdentifier(aItem));
      const aSToAdd = aS.filter(aItem => {
        const aIdentifier = this.getAIdentifier(aItem);
        if (aCollectionIdentifiers.includes(aIdentifier)) {
          return false;
        }
        aCollectionIdentifiers.push(aIdentifier);
        return true;
      });
      return [...aSToAdd, ...aCollection];
    }
    return aCollection;
  }
}
