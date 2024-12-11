'use client';
import generateUUID from '@/app/(root)/_related/generateUUID';
import { useRouter } from 'next/navigation';
import { CreateRoomButtonContainer } from '../_related/room.styled';

const CreateRoomButton = () => {
  const router = useRouter();

  const handleCreateRoom = () => {
    router.push(`/room/${generateUUID()}`);
  };

  return (
    <CreateRoomButtonContainer onClick={handleCreateRoom}>
      +
    </CreateRoomButtonContainer>
  );
};

export default CreateRoomButton;
