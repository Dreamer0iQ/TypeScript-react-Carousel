import './App.css'
import Carousel from './carousel/Carousel'

function App() {
  const configuration = {
    'width': '900px', 
    'spaces': '25px', 
    'activeColor': 'black',
    'nonActiveColor' : 'white'
  }
  return (
    <>
      <Carousel src = {['https://30.img.avito.st/image/1/1.a2q0wra4x4OCawWG7ttMDp9gxYUKY0WLwmbFgQRrz4kC.v-PlHrwzooc-IfosRXFRWN8qSxW8crbl4JcmnVeG9rI', 'https://30.img.avito.st/image/1/1.a2q0wra4x4OCawWG7ttMDp9gxYUKY0WLwmbFgQRrz4kC.v-PlHrwzooc-IfosRXFRWN8qSxW8crbl4JcmnVeG9rI', 'https://30.img.avito.st/image/1/1.a2q0wra4x4OCawWG7ttMDp9gxYUKY0WLwmbFgQRrz4kC.v-PlHrwzooc-IfosRXFRWN8qSxW8crbl4JcmnVeG9rI']} cfg={configuration}></Carousel>
    </>

    )
}

export default App
