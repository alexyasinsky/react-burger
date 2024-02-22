import reducer, {initialState} from "./reducers";
import {thunk} from "redux-thunk";
import configureStore from "redux-mock-store";
import {makeOrder} from "./actions";

describe('testing order reducer', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const order = [
    '643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093c'
  ]

  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            success: true,
            order: {
              number: 123
            }
          }
        ),
        ok: true,
      })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  test('should fire pending and fulfilled actions after succeeded makeOrder action ', async () => {

    const store = mockStore(initialState);

    await store.dispatch(makeOrder(order));

    const actions = store.getActions();

    expect(actions[0].type).toEqual('order/makeOrder/pending')
    expect(actions[1].type).toEqual('order/makeOrder/fulfilled')

    const state = reducer(initialState, actions[1]);

    expect(state).toEqual({
      ...initialState,
      order: 123
    })

  })

  test('should fire pending and rejected actions after incorrect makeOrder action', async () => {


    const store = mockStore(initialState);

    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.reject('error'),
    }));

    await store.dispatch(makeOrder(['643d69a5c3f7b9001cfa093c']));

    const actions = store.getActions();

    expect(actions[0].type).toEqual('order/makeOrder/pending')
    expect(actions[1].type).toEqual('order/makeOrder/rejected')
  })

})