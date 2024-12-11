'use client';
import generateUUID from '@/app/(root)/_related/generateUUID';
import Button from '@/app/_components/Button';
import {
  ButtonContainer,
  CloseButton,
  ModalBackDrop,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  XIcon,
} from '@/app/_components/common';
import Textfield from '@/app/_components/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
