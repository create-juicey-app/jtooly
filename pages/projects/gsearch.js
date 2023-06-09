import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  MenuItem,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import LocalizationProvider from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const GoogleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [siteRestriction, setSiteRestriction] = useState("");
  const [additionalRestriction, setAdditionalRestriction] = useState("");
  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);
  const [selectedFiletype, setSelectedFiletype] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSiteRestrictionChange = (event) => {
    setSiteRestriction(event.target.value);
  };

  const handleAdditionalRestrictionChange = (event) => {
    setAdditionalRestriction(event.target.value);
  };

  const handleBeforeDateChange = (date) => {
    setBeforeDate(date);
  };

  const handleAfterDateChange = (date) => {
    setAfterDate(date);
  };

  const handleFiletypeChange = (event) => {
    setSelectedFiletype(event.target.value);
  };

  const addAdditionalRestriction = (restriction) => {
    setAdditionalRestriction(
      (prevRestriction) => `${prevRestriction} ${restriction}`
    );
  };

  const generateSearchUrl = () => {
    let url = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerm
    )}`;

    if (siteRestriction) {
      url += `+site:${encodeURIComponent(siteRestriction)}`;
    }

    if (beforeDate) {
      const formattedDate = beforeDate.toISOString().split("T")[0];
      url += `+before:${formattedDate}`;
    }

    if (afterDate) {
      const formattedDate = afterDate.toISOString().split("T")[0];
      url += `+after:${formattedDate}`;
    }

    if (selectedFiletype) {
      url += `+filetype:${encodeURIComponent(selectedFiletype)}`;
    }

    if (additionalRestriction) {
      url += `+${encodeURIComponent(additionalRestriction)}`;
    }

    setSearchUrl(url);
    return url;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(searchUrl);
  };

  const searchOperators = [
    { label: "OR", value: "OR" },
    { label: "|", value: "|" },
    { label: "AND", value: "AND" },
    { label: "-", value: "-" },
    { label: "*", value: "*" },
    { label: "(", value: "(" },
    { label: ")", value: ")" },
    { label: "define:", value: "define:" },
    { label: "cache:", value: "cache:" },
    { label: "filetype:", value: "filetype:" },
    { label: "ext:", value: "ext:" },
    { label: "site:", value: "site:" },
    { label: "related:", value: "related:" },
    { label: "intitle:", value: "intitle:" },
    { label: "allintitle:", value: "allintitle:" },
    { label: "inurl:", value: "inurl:" },
    { label: "allinurl:", value: "allinurl:" },
    { label: "intext:", value: "intext:" },
    { label: "allintext:", value: "allintext:" },
    { label: "weather:", value: "weather:" },
    { label: "stocks:", value: "stocks:" },
    { label: "map:", value: "map:" },
    { label: "movie:", value: "movie:" },
    { label: "in", value: "in" },
    { label: "source:", value: "source:" },
    { label: "before:", value: "before:" },
    { label: "after:", value: "after:" },
  ];

  const fileTypes = [
    "pdf",
    "doc",
    "xls",
    "ppt",
    "txt",
    "csv",
    "jpg",
    "png",
    "gif",
    "mp3",
    "mp4",
  ];

  return (
    <div>
      <TextField
        label="Search Term"
        value={searchTerm}
        onChange={handleSearchTermChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Site Restriction (optional)"
        value={siteRestriction}
        onChange={handleSiteRestrictionChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Additional Restriction (optional)"
        value={additionalRestriction}
        onChange={handleAdditionalRestrictionChange}
        fullWidth
        margin="normal"
      />
      <Box
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
        marginBottom={1}
      >
        {searchOperators.map((operator) => (
          <Button
            key={operator.label}
            variant="outlined"
            color="primary"
            onClick={() => addAdditionalRestriction(operator.value)}
            style={{ margin: "4px" }}
          >
            {operator.label}
          </Button>
        ))}
      </Box>
      <DatePicker
        label="Before Date (optional)"
        value={beforeDate}
        onChange={handleBeforeDateChange}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />
      <DatePicker
        label="After Date (optional)"
        value={afterDate}
        onChange={handleAfterDateChange}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />

      <TextField
        select
        label="Filetype (optional)"
        value={selectedFiletype}
        onChange={handleFiletypeChange}
        fullWidth
        margin="normal"
      >
        {fileTypes.map((fileType) => (
          <MenuItem key={fileType} value={fileType}>
            {fileType}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={generateSearchUrl}>
        Generate Search URL
      </Button>
      <br />
      <br />
      {searchUrl && (
        <div>
          <TextField
            label="Generated URL"
            value={searchUrl}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            Open Google Search
          </a>
        </div>
      )}
    </div>
  );
};

export default GoogleSearch;
