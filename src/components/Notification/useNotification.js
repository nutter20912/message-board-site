import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
  duration: 3,
  style: { borderRadius: '10px', cursor: 'pointer' },
});

export default function useNotification() {
  return notification;
}
