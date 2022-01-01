import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003',
});

export const addPost = async ({
  wodType,
  joinDate,
  title,
  content,
  file,
}: {
  wodType: string;
  joinDate: string;
  title: string;
  content: string;
  file: string;
}) => {
  await api.post('/comments', { wodType, joinDate, title, content, file });
};

export const getCheckDay = async (date: Date) => {
  const res = await api.get(`/checkDays/${date.getFullYear()}`);
  return res.data.checkDayOfMonth[date.getMonth()];
};

export const getWodInfo = async (date: string) => {
  const res = await api.get(`/wodInfo/${date}`);
  return res.data;
};

export const getProfile = async (userId: string) => {
  const res = await api.get(`/profile/${userId}`);
  return res.data;
};

export const setProfile = async (
  userId: string,
  { name, birthday, userImg, phone, password, about }: { [key: string]: string }
) => {
  const res = await api.put(`/profile/${userId}`, {
    name,
    birthday,
    userImg,
    phone,
    password,
    about,
  });
  return res.data;
};
