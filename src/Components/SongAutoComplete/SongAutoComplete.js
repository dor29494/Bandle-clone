import { Autocomplete, Popper, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React, { useCallback, useState } from "react";

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
  "& .MuiInputBase-root": {
    borderRadius: "60px",
    "& .MuiAutocomplete-popupIndicator": {
      display: "none",
    },
  },
});

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-listbox": {
    direction: "rtl",
  },
});

function SongAutocomplete({ availableSongs, handleSongChange, sx }) {
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const [inputValue, setInputValue] = useState("");

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
      renderInput={(params) => {
        const { InputProps, ...rest } = params;
        return (
          <StyledTextField
            {...params}
            placeholder="הכנס שם שיר/אמן ובחר"
            fullWidth
            sx={{
              borderRadius: "60px",
            }}
            InputLabelProps={{ shrink: false }}
            // InputProps={{
            //   ...InputProps, // Merge the default InputProps
            //   endAdornment: (
            //     <>
            //       {inputValue && (
            //         <IconButton
            //           size="small"
            //           onClick={() => {
            //             setInputValue("");
            //             handleChange(null, "none");
            //           }}
            //         >
            //           <ClearIcon />
            //         </IconButton>
            //       )}
            //       {InputProps.endAdornment}
            //     </>
            //   ),
            // }}
          />
        );
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      PopperComponent={(props) => <Popper {...props} placement="top-start" />}
      sx={sx}
    />
  );
}

export default SongAutocomplete;
