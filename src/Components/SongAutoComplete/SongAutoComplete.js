import React, { useState, useCallback } from 'react';
import { Autocomplete, TextField, Popper } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    textAlign: "right",
    right: "2rem",
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

function SongAutocomplete({ availableSongs, handleSongChange, sx }) {
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  const handleChange = (event, newValue) => {
    handleSongChange(newValue);
  };

  return (
    <StyledAutocomplete
      noOptionsText="אנא בחר שיר"
      disablePortal
      fullWidth
      id="songsAutocomplete"
      options={inputValue.length > 0 ? availableSongs : []}
      disableClearable
      filterOptions={filterOptions}
      renderInput={(params) => (
        <StyledTextField {...params} label="בחר שיר" fullWidth />
      )}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      PopperComponent={(props) => (
        <Popper {...props} placement="top-start" />
      )}
      sx={sx}
    />
  );
}

export default SongAutocomplete;
