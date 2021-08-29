import './App.css';
import { useState } from 'react';
import { Dropdown } from './Dropdown';

const options = [
  {value: 'goldfish', label:'GoldFish'},
  {value:"dog", label:"Dog"},
  {value:"cat", label:"Cat"},
  {value:"hamster", label:"Hamster"},
  {value:"parrot", label:"Parrot"},
  {value:"spider", label:"Spider"},
  {value:"goldfish", label:"Goldfish"}
]
const initialValue = 'hamster'
function App() {
  const [selectedValue, setSelectedValue] = useState(initialValue)

  return (
    <div>
      <label for="pet-select">Choose a pet:</label>

      <Dropdown 
        options={options}
        id='pet-select'
        selectedValue={selectedValue}
        onSelectedValueChane={setSelectedValue}
      />

    </div>    
  );
}

export default App;
