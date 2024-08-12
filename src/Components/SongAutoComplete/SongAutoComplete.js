import React, { useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Popper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

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

const StyledBox = styled(Box)({
  "& .MuiAutocomplete-listbox": {
    maxHeight: "180px !important",
    overflowY: "auto",
    direction: "rtl",
  },
});

function SongAutocomplete({
  availableSongs,
  handleSongChange,
  sx,
  inputValue,
  setInputValue,
}) {
  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  const handleChange = (event, newValue) => {
    handleSongChange(newValue);
  };

  const splitByLastDash = (option) => {
    const lastDashIndex = option.lastIndexOf("-");
    if (lastDashIndex === -1) {
      return [option, ""];
    }
    const part1 = option.substring(0, lastDashIndex).trim();
    const part2 = option.substring(lastDashIndex + 1).trim();
    return [part1, part2];
  };

  return (
    <StyledBox sx={sx}>
      <Autocomplete
        noOptionsText="אנא בחר שיר"
        disablePortal
        fullWidth
        id="songsAutocomplete"
        options={inputValue.length > 0 ? availableSongs : []}
        disableClearable
        filterOptions={filterOptions}
        renderOption={(props, option) => (
          <li {...props}>
            <Box display="flex" gap={"5px"}>
              <Chip label={splitByLastDash(option)[0]} color="primary" />
              <Chip label={splitByLastDash(option)[1]} color="secondary" />
            </Box>
          </li>
        )}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            placeholder="הכנס שם שיר/אמן ובחר"
            fullWidth
            sx={{
              borderRadius: "60px",
            }}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {inputValue && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setInputValue("");
                        handleChange(null, "none");
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        value={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        PopperComponent={(props) => <Popper {...props} placement="top-start" />}
        sx={sx}
      />
    </StyledBox>
  );
}

export default SongAutocomplete;
