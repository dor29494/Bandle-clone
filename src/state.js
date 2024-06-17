// src/state.js
import { atom } from 'recoil';

export const songDataState = atom({
  key: 'songDataState',
  default: null,
});

export const songState = atom({
  key: 'songState',
  default: { id: null, title: null, views: null, spotifyId: null, youtubeId: null },
});

export const tooltipMessageState = atom({
  key: 'tooltipMessageState',
  default: '',
});

export const successState = atom({
  key: 'successState',
  default: { index: 0, state: false },
});

export const failedState = atom({
  key: 'failedState',
  default: { index: 0, state: false },
});

export const showErrorState = atom({
  key: 'showErrorState',
  default: false,
});

export const showPlayerState = atom({
  key: 'showPlayerState',
  default: false,
});

export const availableSongsState = atom({
  key: 'availableSongsState',
  default: [],
});

export const guessState = atom({
  key: 'guessState',
  default: { id: null, title: null },
});

export const layersState = atom({
  key: 'layersState',
  default: [],
});

export const songsListState = atom({
  key: 'songsListState',
  default: [],
});
