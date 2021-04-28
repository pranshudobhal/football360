import { useState } from 'react';
import { useParams } from 'react-router';
import { useData } from '../../context';
import { Error404 } from '../Error/Error404';

export function PlaylistPage() {
  const { playlistID } = useParams();
  return <h1>pa</h1>;
}
