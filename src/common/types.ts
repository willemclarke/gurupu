export enum Messages {
  JOIN_ROOM = 'join-room',
  JOINED_ROOM = 'joined-room',
  ROOM_STATUS = 'room-status',
  VALIDATED_JOIN_ROOM = 'validated-join-room',
  INVALID_JOIN_ROOM = 'invalid-join-room',
}

export interface User {
  roomId: string;
  username: string;
}

export interface RoomStatus {
  id: string;
  users: User[];
}
