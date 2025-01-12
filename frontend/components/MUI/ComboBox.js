import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function ComboBox(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = async () => {
    let response = [];
    if(props.categoria !== undefined){
      response = await props.listarItens(props.categoria);
    } else {
      response = props.listarItens;
    }
    
    if(response !== undefined){
      if(response.length === 0){
        setOpen(false);
        alert("Não existe nenhum item nessa categoria!");
      } else {
          setOpen(true);
        (async () => {
          setLoading(true);
          await sleep(1e3); // For demo purposes.
          setLoading(false);
  
          setOptions([...response]);
        })();
      }
    } else{
      alert("ERRO! Falha no Sistema");
    }
    
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
      sx={props.sx}
      value={props.value}
      onChange={props.handleValueChange}
      inputValue={props.inputValue}
      onInputChange={props.handleInputValueChange}

      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option === value} //Comparar valor digitado
      getOptionLabel={(option) => option} //Titulo de exibição enquanto procura
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
} 