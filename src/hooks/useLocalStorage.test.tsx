import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

// Mock localStorage
let storageMock: { [key: string]: string } = {};
const localStorageMock = {
  getItem: (key: string) => storageMock[key] || null,
  setItem: (key: string, value: string) => {
    storageMock[key] = value;
  },
  removeItem: (key: string) => {
    delete storageMock[key];
  },
  clear: () => {
    storageMock = {};
  },
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Clear storage after each test
afterEach(() => {
  localStorageMock.clear();
});

describe('useLocalStorage hook', () => {
  it('should initialize with initialValue when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'testKey', initialValue: 'initial' }));

    expect(result.current[0]).toBe('initial');
  });

  it('should initialize with stored value when localStorage has an item', () => {
    localStorageMock.setItem('testKey', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage({ key: 'testKey', initialValue: 'initial' }));

    expect(result.current[0]).toBe('stored');
  });

  it('should update stored value when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'testKey', initialValue: 'initial' }));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorageMock.getItem('testKey')).toBe(JSON.stringify('updated'));
  });

  it('should handle function as argument for setValue', () => {
    const { result } = renderHook(() => useLocalStorage({ key: 'testKey', initialValue: 'initial' }));

    act(() => {
      result.current[1]((prevValue: string) => prevValue + 'ly');
    });

    expect(result.current[0]).toBe('initially');
    expect(localStorageMock.getItem('testKey')).toBe(JSON.stringify('initially'));
  });
});
