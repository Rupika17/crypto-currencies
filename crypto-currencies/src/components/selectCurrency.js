import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';

const SELECT_API_URL="https://api.coincap.io/v2/assets";

export default function SelectCurrency() {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [select, setselect] = React.useState('');
    const [fetchedData, setfetchedData] = React.useState('');
    React.useEffect(() => {
      fetch(SELECT_API_URL).then((response) =>
        response.json().then((data) => setselect(data.data))
      );
    }, [selectedValue]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        fetch(`https://api.coincap.io/v2/assets/${event.target.value}`).then((response) =>
        response.json().then((data) => setfetchedData(data.data))
      );
    };
  console.log(fetchedData)
    return (
      <Box sx={{ minWidth: 500 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedValue}
            label="select"
            onChange={handleChange}
          >
            {select.length > 0 &&
              select?.map((data) => (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        {fetchedData ? (
          <div style={{ color: "#000000"}}>
            <label>Name :</label> <label>{fetchedData?.name}</label> <br />
            <label>Rank :</label> <label>{fetchedData?.rank}</label> <br />
            <label>Symbol :</label> <label>{fetchedData?.symbol}</label> <br />
            <label>Price :</label> <label>{fetchedData?.priceUsd}</label> <br />
          </div>
        ) : null}
      </Box>
    );
  }