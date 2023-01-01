import { request } from '../lib';

const UserRelationship = {
  show: ({ id }) => request('get', `/api/relationship/${id}`),
  stroe: ({ id }) => request('post', '/api/relationship', { child_id: id }),
  delete: ({ id }) => request('delete', `/api/relationship/${id}`),
};

export default UserRelationship;
