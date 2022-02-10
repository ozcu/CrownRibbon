import './style.css'
import p5 from 'p5';
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise('seed');

const sketch = p5 => {

  //variables
  let numFrames = 200;

  let mov = 50;
  let rad = 0.8;

  const TWO_PI = 6.28318530717958647693;

  let pointContainer = [];

  //number of small points between big points
  const m = 500;
  //number of big points
  let n = 50;
    
  // Variables scoped within p5
  const canvasWidth = p5.windowWidth;
  const canvasHeight = p5.windowHeight;
  
  //center of point pattern
  const ax = canvasWidth/2  
  const ay = canvasHeight-50

  // make library globally available
  window.p5 = p5;


//Point Class

class Point{
  constructor(t){
    this.t=t;
  }

   delayFactor = 1.6;
   seed = p5.random(200);

  //center of the random points
   cx = p5.random(0.1*canvasWidth,0.9*canvasWidth);
   cy = p5.random(0.1*canvasHeight,0.5*canvasHeight);

   
  
  //time and phase
   x(t,ph){

    return this.cx + mov*simplex.noise2D(this.seed+rad*p5.cos(TWO_PI*(t+ph+50)),rad*p5.sin(TWO_PI*(t+ph)));
  }
  
   y(t,ph)  {
    
    return this.cy + mov*simplex.noise2D((this.seed*1.2)+rad*p5.cos(TWO_PI*(t+ph)),rad*p5.sin(TWO_PI*(t+ph)));
  }
  show(t){

  
  let px,py
  
    px = this.x(t,0);
    py = this.y(t,0);
    

    p5.stroke(255);
    p5.strokeWeight(1);
    p5.fill(255);
    p5.ellipse(px,py,5,5);

    

    for(var i=0;i<=m;i++){
      const tt = 1.0*i/m;
      

      const xx = p5.lerp(this.x(t,-this.delayFactor*tt),ax,tt);
      const yy = p5.lerp(this.y(t,-this.delayFactor*tt),ay,tt);
      
      p5.point(xx,yy);
    }
  }
  
}

let sliderPoints,sliderTime,sliderMov
  // Setup function

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);

    sliderPoints = p5.createSlider(1, 50, 1);
    sliderPoints.position(10, 10);
    sliderPoints.style('width', '80px');

    sliderTime = p5.createSlider(10,200,10);
    sliderTime.position(10,30);
    sliderTime.style('width','80px');

    sliderMov = p5.createSlider(10,300,5);
    sliderMov.position(10,50);
    sliderMov.style('width','80px');



      for(var i=0;i<n;i++){
        pointContainer[i] = new Point();
      }

  };

  // Draw function

  let t=0;
  p5.draw = () => {
    p5.background(0);

    n = sliderPoints.value();
    numFrames = sliderTime.value();
    mov = sliderMov.value();


    //render over time
    t=0.5*(p5.frameCount-1)/numFrames;
    
    for(var i=0;i<n;i++){

      pointContainer[i].show(t);
    }
  }
}

new p5(sketch);

export default sketch;

p5.windowResized = () => {
    resizeCanvas(p5.windowWidth, p5.windowHeight);
    
}