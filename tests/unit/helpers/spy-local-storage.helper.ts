type TLocalStorageMethods = 'getItem' | 'setItem' | 'clear';

export function spyLocalStorageHelper(
  metodName: TLocalStorageMethods,
  returnedData: any | null = null
): jest.SpyInstance {
  if (metodName === 'getItem') {
    const result = returnedData ? JSON.stringify(returnedData) : null;
    return jest.spyOn(window.localStorage.__proto__, metodName).mockReturnValue(result);
  }
  return jest.spyOn(window.localStorage.__proto__, metodName);
}
