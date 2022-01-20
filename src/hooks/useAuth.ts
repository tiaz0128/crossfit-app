import { onAuthStateChanged } from 'firebase/auth';
import { CurrentUser, loginUser, logoutUser } from './../modules/currentUser';
import { RootState } from './../modules/index';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoIn, logoOut } from '../api/login';
import { useLocation, useNavigate } from 'react-router';
import { auth } from '../api/firebase';
import { MEMBER_MENUS } from '../constants/menuList';

export default function useAuth(): {
  currentUser: CurrentUser;
  loading: boolean;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
} {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user: CurrentUser) => {
      if (user) {
        dispatch(loginUser(user));
        if (location.pathname === '/') navigate('/dashboard', { replace: true });
        else navigate(location.pathname, { replace: true });
      }
    });

    return unSub;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
      return;
    }
  }, [currentUser]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const UserImpl = await logoIn(email, password);
      dispatch(loginUser(UserImpl.user));
      navigate('/dashboard');
    } catch {
      alert('로그인 에러 발생!!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoOut();
      dispatch(logoutUser());
    } catch {
      alert('로그아웃 에러 발생!!');
    }
    setLoading(false);
  };

  return { currentUser, loading, handleLogin, handleLogout };
}
