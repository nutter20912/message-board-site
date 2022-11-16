import { request } from '../lib';

const Comment = {
  all: ({ postId }) => request('get', `/api/posts/${postId}/comments`),

  store: ({ postId, content }) => request('post', `/api/posts/${postId}/comments`, { content }),

  show: ({ id }) => request('get', `/api/comments/${id}`),

  update: ({ id, content }) => request('put', `/api/comments/${id}`, {
    content,
  }),

  delete: ({ id }) => request('delete', `/api/comments/${id}`),
};

export default Comment;
