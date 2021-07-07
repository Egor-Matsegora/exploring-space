import { api } from '@/api/index';
import { of, throwError } from 'rxjs';

export function mockApiHelper(methodName: string, mockedResponse: any, isError?: boolean) {
  const MOCKED_DATA = !isError ? of(mockedResponse) : throwError(() => mockedResponse);
  return jest.spyOn(api, methodName as any).mockReturnValue(MOCKED_DATA);
}
