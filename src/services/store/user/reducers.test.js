import reducer, {initialState} from "./reducers";
import {thunk} from "redux-thunk";
import configureStore from "redux-mock-store";
import {register, login, logout, getUser, editUser} from "./actions";
describe('testing user reducer', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  test('should fire pending and fulfilled actions after succeeded register action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
            success: true,
            user: {
              email: 'email',
              name: 'Alex'
            }
          }
        ),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(register({email: 'email', password: 'password'}));

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/register/pending')
    expect(actions[1].type).toEqual('profile-user/register/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: 'email',
        name: 'Alex'
      },
      isAuthChecked: true
    })

  })

  test('should fire pending and fulfilled actions after succeeded login action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
            success: true,
            user: {
              email: 'email',
              name: 'Alex'
            }
          }
        ),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(login({email: 'email', password: 'password'}));

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/login/pending')
    expect(actions[1].type).toEqual('profile-user/login/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: 'email',
        name: 'Alex'
      },
      isAuthChecked: true
    })

  })

  test('should fire pending and fulfilled actions after succeeded logout action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
            success: true,
          }
        ),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(logout());

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/logout/pending')
    expect(actions[1].type).toEqual('profile-user/logout/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: null
    })

  })

  test('should fire pending and fulfilled actions after succeeded getUser action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
            success: true,
            user: {
              email: 'email',
              name: 'Alex'
            }
          }
        ),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(getUser());

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/getUser/pending')
    expect(actions[1].type).toEqual('profile-user/getUser/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: 'email',
        name: 'Alex'
      },
      isAuthChecked: true
    })

  })

  test('should fire pending and fulfilled actions after incorrect getUser action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.reject('error'),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(getUser());

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/getUser/pending')
    expect(actions[1].type).toEqual('profile-user/getUser/rejected')

  })

  test('should fire pending and fulfilled actions after succeeded editUser action ', async () => {

    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
            success: true,
            user: {
              email: 'email',
              name: 'Alex'
            }
          }
        ),
        ok: true,
      })

    const store = mockStore(initialState);

    await store.dispatch(editUser());

    const actions = store.getActions();

    expect(actions[0].type).toEqual('profile-user/editUser/pending')
    expect(actions[1].type).toEqual('profile-user/editUser/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      user: {
        email: 'email',
        name: 'Alex'
      },
    })

  })

})
