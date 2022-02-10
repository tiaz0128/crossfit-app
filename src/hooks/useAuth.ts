import { loadingEnd, loadingStart } from './../modules/loading';
import { CurrentUser, loginUserThunk, logoutUserThunk } from './../modules/currentUser';
import { RootState } from './../modules/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoIn, logoOut } from '../api/login';
import { useLocation, useNavigate } from 'react-router';
import { MEMBER_MENUS } from '../constants/menuList';

export default function useAuth(): {
  currentUser: CurrentUser;
  loading: boolean;
  pathname: string;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
} {
  const { currentUser, loading } = useSelector((state: RootState) => {
    return { currentUser: state.currentUser, loading: state.loading };
  });
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let { pathname } = useLocation();

  useEffect(() => {
    if (!currentUser) handleGuestPath();
  }, [currentUser]);

  const guestAccessToLoginMenu = () => {
    return MEMBER_MENUS.find(({ path }) => '/' + path === pathname);
  };

  const handleGuestPath = () => {
    dispatch(loadingEnd());
    if (guestAccessToLoginMenu()) {
      return navigate('/login', { replace: true });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    dispatch(loadingStart());
    try {
      const UserImpl = await logoIn(email, password);
      dispatch(loginUserThunk(UserImpl.user));
      navigate('/dashboard');
    } catch {
      alert('로그인 에러 발생!!');
    }
    dispatch(loadingEnd());
  };

  const handleLogout = async () => {
    dispatch(loadingStart());
    try {
      await logoOut();
      dispatch(logoutUserThunk());
    } catch {
      alert('로그아웃 에러 발생!!');
    }
    dispatch(loadingEnd());
  };

  return { currentUser, loading, pathname, handleLogin, handleLogout };
}
