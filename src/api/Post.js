import { request } from '../lib';

const Post = {
  getIndex: () => request('get', 'api/posts'),

  store: ({ title, content }) => request('post', 'api/posts', {
    title, content,
  }),

  show: ({ id }) => request('get', `api/posts/${id}`),

  update: ({ id, content }) => request('put', `api/posts/${id}`, {
    content,
  }),

  delete: ({ id }) => { console.log(id); },
};

export default Post;
