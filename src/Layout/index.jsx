import React from 'react'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { NavigationMenu } from '../components'
import './style.scss'
import { Loading } from '../components'
/* Copyright (c) 2022 by Nvagelis (https://codepen.io/Nvagelis/pen/yaQGrL)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

export default function Layout({loading}) {
    // attribution to https://codepen.io/Nvagelis/pen/yaQGrL
    useEffect (() => {
      
      const canvas1 = document.getElementById('canvas1');
      const canvas2 = document.getElementById('canvas2');
      const canvas3 = document.getElementById('canvas3');
      const ctx1 = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      const ctx3 = canvas3.getContext('2d');

      let rainthroughnum = 500;
      let speedRainTrough = 25;
      let RainTrough = [];

      let rainnum = 500;
      let rain = [];

      let lightning = [];
      let lightTimeCurrent = 0;
      let lightTimeTotal = 0;

      let w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
      let h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
      window.addEventListener('resize', function() {
        w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
        h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
      });

      function random(min, max) {
        return Math.random() * (max - min + 1) + min;
      }

      function clearcanvas1() {
        ctx1.clearRect(0, 0, w, h);
      }

      function clearcanvas2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      }

      function clearCanvas3() {
        ctx3.globalCompositeOperation = 'destination-out';
        ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
        ctx3.fillRect(0, 0, w, h);
        ctx3.globalCompositeOperation = 'source-over';
      };

      function createRainTrough() {
        for (let i = 0; i < rainthroughnum; i++) {
          RainTrough[i] = {
            x: random(0, w),
            y: random(0, h),
            length: Math.floor(random(1, 830)),
            opacity: Math.random() * 0.2,
            xs: random(-2, 2),
            ys: random(10, 20)
          };
        }
      }

      function createRain() {
        for (let i = 0; i < rainnum; i++) {
          rain[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1,
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
          };
        }
      }

      function createLightning() {
        let x = random(100, w - 100);
        let y = random(0, h / 4);

        let createCount = random(1, 3);
        for (let i = 0; i < createCount; i++) {
          let single = {
            x: x,
            y: y,
            xRange: random(5, 30),
            yRange: random(10, 25),
            path: [{
              x: x,
              y: y
            }],
            pathLimit: random(40, 55)
          };
          lightning.push(single);
        }
      };

      function drawRainTrough(i) {
        ctx1.beginPath();
        let grd = ctx1.createLinearGradient(0, RainTrough[i].y, 0, RainTrough[i].y + RainTrough[i].length);
        grd.addColorStop(0, "rgba(255,255,255,0)");
        grd.addColorStop(1, "rgba(255,255,255," + RainTrough[i].opacity + ")");

        ctx1.fillStyle = grd;
        ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
        ctx1.fill();
      }

      function drawRain(i) {
        ctx2.beginPath();
        ctx2.moveTo(rain[i].x, rain[i].y);
        ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
        ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
        ctx2.lineWidth = 1;
        ctx2.lineCap = 'round';
        ctx2.stroke();
      }

      function drawLightning() {
        for (let i = 0; i < lightning.length; i++) {
          let light = lightning[i];

          light.path.push({
            x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
            y: light.path[light.path.length - 1].y + (random(0, light.yRange))
          });

          if (light.path.length > light.pathLimit) {
            lightning.splice(i, 1);
          }

          ctx3.strokeStyle = 'rgba(255, 255, 255, .1)';
          ctx3.lineWidth = 3;
          if (random(0, 15) === 0) {
            ctx3.lineWidth = 6;
          }
          if (random(0, 30) === 0) {
            ctx3.lineWidth = 8;
          }

          ctx3.beginPath();
          ctx3.moveTo(light.x, light.y);
          for (let pc = 0; pc < light.path.length; pc++) {
            ctx3.lineTo(light.path[pc].x, light.path[pc].y);
          }
          if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
            ctx3.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
            ctx3.fillRect(0, 0, w, h);
          }
          ctx3.lineJoin = 'miter';
          ctx3.stroke();
        }
      };

      function animateRainTrough() {
        clearcanvas1();
        for (let i = 0; i < rainthroughnum; i++) {
          if (RainTrough[i].y >= h) {
            RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
          } else {
            RainTrough[i].y += speedRainTrough;
          }
          drawRainTrough(i);
        }
      }

      function animateRain() {
        clearcanvas2();
        for (let i = 0; i < rainnum; i++) {
          rain[i].x += rain[i].xs;
          rain[i].y += rain[i].ys;
          if (rain[i].x > w || rain[i].y > h) {
            rain[i].x = Math.random() * w;
            rain[i].y = -20;
          }
          drawRain(i);
        }
      }

      function animateLightning() {
        clearCanvas3();
        lightTimeCurrent++;
        if (lightTimeCurrent >= lightTimeTotal) {
          createLightning();
          lightTimeCurrent = 0;
          lightTimeTotal = 200;  //rand(100, 200)
        }
        drawLightning();
      }

      function init() {
        createRainTrough();
        createRain();
        window.addEventListener('resize', createRainTrough);
      }
      init();

      function animloop() {
        animateRainTrough();
        animateRain();
        animateLightning();
        requestAnimationFrame(animloop);
      }
      animloop();  
    },[])
    // end of attribution to https://codepen.io/Nvagelis/pen/yaQGrL
  return (
    <>
        <div className="thunder">
          <canvas id="canvas1"></canvas>
          <canvas id="canvas2"></canvas>
          <canvas id="canvas3"></canvas>
        </div> 
        {!loading ?
          <>
          <NavigationMenu />
          <Outlet />
          </>
          : <Loading />
        }
    </>
    
  )
}
