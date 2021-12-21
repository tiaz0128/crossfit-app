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

export const getPost = async () => {
  const response = await api.get('/comments');
  return response;
};
