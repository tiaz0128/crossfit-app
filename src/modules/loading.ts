const LORDING_START = 'currentUser/LORDING_START' as const;
const LORDING_END = 'currentUser/LORDING_END' as const;

export const loadingStart = () => ({ type: LORDING_START });
export const loadingEnd = () => ({ type: LORDING_END });

type LoadingAction = ReturnType<typeof loadingStart> | ReturnType<typeof loadingEnd>;

const initialState = true;

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function loading(state = initialState, action: LoadingAction) {
  switch (action.type) {
    case LORDING_START:
      return true;
    case LORDING_END:
      return false;
    default:
      return state;
  }
}
