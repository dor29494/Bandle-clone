import React from 'react';
import { Autocomplete, TextField, Popper } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    textAlign: "right",
    right: "1rem",
    direction: "rtl",
    width: "100%",
    transformOrigin: "top right",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    visibility: "hidden",
  },
  '& .MuiInputBase-root': {
    '& .MuiAutocomplete-popupIndicator': {
      display: 'none',
    },
  },
});

const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiAutocomplete-listbox': {
    direction: 'rtl',
  },
});

function SongAutocomplete({ availableSongs, handleSongChange }) {
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
      <StyledAutocomplete
      noOptionsText="אנא בחר שיר"
      disablePortal
      fullWidth
      id="songsAutocomplete"
      options={availableSongs}
      disableClearable
      filterOptions={filterOptions}
      renderInput={(params) => (
        <StyledTextField {...params} label="בחר שיר" fullWidth />
      )}
      onChange={handleSongChange}
      PopperComponent={(props) => (
        <Popper {...props} placement="top-start" />
      )}
    />
  );
}

export default SongAutocomplete;
