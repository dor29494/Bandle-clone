import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Box,
  IconButton,
  Paper,
  Popper,
  TextField,
  useMediaQuery, // Add this
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useCallback } from "react";

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

function SongAutocomplete({
  availableSongs,
  handleSongChange,
  sx,
  inputValue,
  setInputValue,
}) {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

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
    <StyledAutocomplete
      noOptionsText="הכנסו שם שיר/אומן ובחרו"
      disablePortal
      fullWidth
      id="songsAutocomplete"
      options={inputValue.length > 0 ? availableSongs : []}
      disableClearable
      filterOptions={filterOptions}
      PaperComponent={(props) => (
        <Paper
          style={{
            borderRadius: "20px",
            backgroundColor: darkMode ? "#585B93" : "#BABACF",
            color: darkMode ? "fff" : "#282827",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          sx={{
            "& .MuiAutocomplete-option": {
              minHeight: "30px !important",
            },
            "& .MuiAutocomplete-listbox": {
              maxHeight: isMobile ? "150px" : "200px",
            },
            "& .MuiAutocomplete-option:hover": {
              backgroundColor: `${darkMode ? "#BABACF" : "#585B93"} !important`,
              color: `${darkMode ? "#282827" : "#fff"} !important`,
            },
          }}
          {...props}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Box width="100%" minHeight="24px">
            {splitByLastDash(option)[0]}
            <span style={{ margin: "0 5px" }}>-</span>
            {splitByLastDash(option)[1]}
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder="הכנסו שם שיר/אומן ובחרו"
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
      PopperComponent={(props) => (
        <Popper
          {...props}
          placement="top-start"
          modifiers={[
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              options: {
                altBoundary: true,
                padding: 0,
              },
            },
          ]}
          style={{
            width: props.anchorEl ? props.anchorEl.clientWidth : undefined,
            maxHeight: isMobile ? "150px" : "200px",
            overflowY: "auto",
            padding: "0",
            borderRadius: "20px",
          }}
        />
      )}
      sx={{
        ...sx,
        "& .MuiInputBase-input::placeholder": {
          color: darkMode ? "#BABACF" : "#585B93",
          opacity: 1,
          fontSize: "15px",
          fontWeight: "bold",
        },
        "& .MuiInputBase-root, & .MuiInputBase-root:hover, & .MuiInputBase-root:active":
          {
            border: `1px solid ${darkMode ? "#BABACF" : "#585B93"}`,
          },
      }}
    />
  );
}

export default SongAutocomplete;
