import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign In', async () => {
    const apiResponse = {
      user: {
        id: 'user_id',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'user_token',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    // local storage mock
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // depende do contexto
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      // o contexto
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    // não vai prosseguir até que seja realizado o update
    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'user-token';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user_id',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      // o contexto
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'user-token';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user_id',
            name: 'John Doe',
            email: 'johndoe@example.com.br',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      // o contexto
      wrapper: AuthProvider,
    });

    // função que realiza algum aguardo de mudança de estado em uma função não
    // assíncrona, signOut não assíncrono, setData assíncrono
    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });
  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user_id',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: 'jondoe-image.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
