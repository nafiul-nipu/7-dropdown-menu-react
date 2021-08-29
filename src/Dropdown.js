export const Dropdown = ({options, id, selectedValue, onSelectedValueChane}) => (
    <select id={id} onChange={event => onSelectedValueChane(event.target.value)}>
      {options.map(({value, label}) => (
        <option value={value}  selected={value === selectedValue}>  {label} </option>
      ))}      
    </select>
  );
  