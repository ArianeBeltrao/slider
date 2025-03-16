
import './App.css';
import Slider from './components/Slider.js'
import { ArrayImages } from './data/ArrayImages.js';

export default function App() {
  return (
    <div className="App">
      <h2>SLIDER PAGE</h2>
      <Slider images={ArrayImages}/>
    </div>
  );
}
