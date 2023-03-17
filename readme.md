## Simple carousel/slider for React (adapted from my another repository)
It was made like a component, so u just need to import it.

## Usage/Examples

```javascript

import './App.css';
import Carousel from './carousel.js'
function App() {
  const images = ['35.png', '35.png', '35.png']     //it is the path to your images
  const configuration = {
    'width': '900px',                               //width of the window
    'spaces': '25px',                               //spaces between indicators
    'activeColor': 'black',                         //color when indicator is not active
    'nonActiveColor' : 'white'                      //color when indicator is Active
  }
  return (
    <div>                               
      <Carousel src = {images} cfg = {configuration}/> there u need to pass variables  
    </div>
  );
}

export default App;

```
Also u need some css classes which u can find in folder 'example'. U can create as much sliders as u want
Soonly I will add more params to config and fix some small bugs.