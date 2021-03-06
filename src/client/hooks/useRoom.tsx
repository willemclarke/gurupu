import React from 'react';
import { useParams } from 'react-router-dom';
import { Messages, RoomStatus } from '../../common/types';
import { useLocationQuery } from '../hooks/useQuery';
import { Socket } from 'socket.io';
import useSocket from 'use-socket.io-client';
import { useAppContext } from './useAppContext';

export interface RoomContext {
  username: string | null;
  roomStatus: RoomStatus | null;
  socket: Socket;
}

export const useRoom: () => RoomContext = () => {
  const { config } = useAppContext();
  const [socket] = useSocket(config.webSocketApi, {
    autoConnect: true,
    secure: config.webSocketSecure,
  });
  const { roomId } = useParams();
  const username = useLocationQuery().get('username');

  const [roomStatus, setRoomStatus] = React.useState<RoomStatus | null>(null);

  React.useEffect(() => {
    socket.on(Messages.ROOM_STATUS_RESPONSE, (status: RoomStatus) => {
      console.log('status', status);
      setRoomStatus(status);
    });

    socket.emit(Messages.JOIN_ROOM_REQUEST, {
      roomId,
      username,
    });
  }, []);

  return {
    username,
    roomStatus,
    socket,
  };
};
