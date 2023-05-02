import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
// import { pusher } from '../lib';

// TODO 未使用
export default function Chat() {
  const { user } = useContext(UserContext);

  const but = (
    <>
      <button type="button" onClick={() => user}>
        user.name
      </button>
      <button type="button" onClick={() => console.log(user)}>
        getUser
      </button>
    </>
  );

  return (
    <>
      <p>
        chat
      </p>
      {but}
    </>
  );
}

/**
 *
 *
 * useEffect(() => {
  pusher().then((client) => {
    client.private(`users.${user?.id}`)
      .listen('.CommentCreated', ({ model }) => {
        notification.open({
          message: 'Notification',
          description: `${model.user.name} 已評論 ${model.post.title}`,
        });
      })
      .error((error) => {
        console.error(error);
      });
  });
}, []);
 */
