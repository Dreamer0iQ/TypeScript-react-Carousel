
import './App.css';
import Carousel from './carousel.js'
function App() {
  const images = ['YOUR_PATH']
  const configuration = {
    'width': '900px', 
    'spaces': '25px', 
    'activeColor': 'black',
    'nonActiveColor' : 'white'
  }
  return (
    <div>
      <Carousel src = {images} cfg = {configuration}/>
      <Carousel src = {images} cfg = {configuration}/>
    </div>
  );
}

export default App;
