import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Autocomplete from "@mui/material/Autocomplete";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const GoogleSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [siteRestriction, setSiteRestriction] = useState("");
  const [additionalRestriction, setAdditionalRestriction] = useState("");
  const [beforeDate, setBeforeDate] = useState(null);
  const [afterDate, setAfterDate] = useState(null);
  const [selectedFiletype, setSelectedFiletype] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [customFiletype, setCustomFiletype] = useState("");
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
      url += `+${formattedDate}+..`;
    }

    if (afterDate) {
      const formattedDate = afterDate.toISOString().split("T")[0];
      url += `+${formattedDate}`;
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
    { label: "define:", value: "define:" },
    { label: "cache:", value: "cache:" },
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
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        borderRadius: "32px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextField
        label="Search Term"
        value={searchTerm}
        onChange={handleSearchTermChange}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Site Restriction (optional)"
        value={siteRestriction}
        onChange={handleSiteRestrictionChange}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <TextField
        label="Additional Restriction (optional)"
        value={additionalRestriction}
        onChange={handleAdditionalRestrictionChange}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <Paper
        elevation={2}
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        {searchOperators.map((operator) => (
          <Chip
            label={operator.label}
            variant="outlined"
            key={operator.label}
            color="primary"
            onClick={() => addAdditionalRestriction(operator.value)}
            sx={{ margin: "4px" }}
          ></Chip>
        ))}
      </Paper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{ padding: "1rem" }}>
          <Tooltip
            title="Since Google removed the functionnality to search by date, we can
            only search from the year (dosent always work )"
          >
            <div>
              <DatePicker
                disabled
                label="Before Date (optional)"
                value={beforeDate}
                onChange={handleBeforeDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ marginBottom: "0.7rem" }}
              />
              <DatePicker
                disabled
                label="After Date (optional)"
                value={afterDate}
                onChange={handleAfterDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ marginBottom: "1rem" }}
              />
            </div>
          </Tooltip>
        </Paper>
      </LocalizationProvider>
      <Autocomplete
        options={fileTypes}
        value={selectedFiletype}
        onChange={(event, value) => setSelectedFiletype(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filetype (optional)"
            fullWidth
            margin="normal"
          />
        )}
        freeSolo
        inputValue={customFiletype}
        onInputChange={(event, value) => setCustomFiletype(value)}
        sx={{ marginBottom: "1rem", minWidth: "100px" }}
      />
      <Button
        variant="contained"
        onClick={generateSearchUrl}
        sx={{ marginBottom: "1rem" }}
      >
        Generate Search URL
      </Button>
      {searchUrl && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
          }}
        >
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
            sx={{ marginBottom: "1rem" }}
          />
          <a href={searchUrl} target="_blank" rel="noopener noreferrer">
            Open Google Search
          </a>
        </Paper>
      )}
    </Paper>
  );
};

export default GoogleSearch;
