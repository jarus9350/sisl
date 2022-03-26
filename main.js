import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import {Stamen, Vector as VectorSource} from 'ol/source';
// import {fromLonLat} from 'ol/proj';

import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import {fromLonLat, toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';

const source = new VectorSource();

const client = new XMLHttpRequest();
client.open('GET', './data/2157-01-blackburn-scanner-video-2021.csv');
client.onload = function () {
  const csv = client.responseText;
  const features = [];

  let prevIndex = csv.indexOf('\n'); // scan past the header line

  let curIndex;
  while ((curIndex = csv.indexOf('\n', prevIndex)) != -1) {
    const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');
    prevIndex = curIndex + 1;

    const coords = fromLonLat([parseFloat(line[15]), parseFloat(line[16])]);
    if (isNaN(coords[0]) || isNaN(coords[1])) {
      // guard against bad data
      continue;
    }

    features.push(
      new Feature({
        // col1: parseFloat(line[0]) || 0,
        // col2: parseInt(line[1]) || 0,
        col1: line[0],
        col2: line[1],
        col3: line[2],
        col4: line[3],
        col5: line[4],
        col6: line[5],
        col7: line[6],
        col8: line[7],
        col9: line[8],
        col10: line[9],
        col11: line[10],
        col12: line[11],
        col13: line[12],
        col14: line[13],
        col15: line[14],
        col16: line[15],
        col17: line[16],
        col18: line[17],
        col19: line[18],
        col20: line[19],
        col21: line[20],
        col22: line[21],
        col23: line[22],
        col24: line[23],
        col25: line[24],
        col26: line[25],
        col27: line[26],
        col28: line[27],
        geometry: new Point(coords),
      })
    );
  }
  source.addFeatures(features);
};
client.send();

const meteorites = new VectorLayer({
  source: source,
});

const layer = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  layers: [layer,meteorites],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

const displayFeatureInfo = (pixel) => {
  map.forEachFeatureAtPixel(pixel, function(features, layer) {
    console.log(features.values_['col1']);
    // features.push(features);
    for (const el of openEls) {
      el.addEventListener("click", function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
      });
    }
  
    for (const el of closeEls) {
      el.addEventListener("click", function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
      });
    }

    // document.getElementById('c1').innerHTML(features.get('col1'))
    document.getElementById('c1').innerHTML = features.values_['col1'];
    document.getElementById('c2').innerHTML = features.values_['col2'];
    document.getElementById('c3').innerHTML = features.values_['col3'];
    document.getElementById('c4').innerHTML = features.values_['col4'];
    document.getElementById('c5').innerHTML = features.values_['col5'];
    document.getElementById('c6').innerHTML = features.values_['col6'];
    document.getElementById('c7').innerHTML = features.values_['col7'];
    document.getElementById('c8').innerHTML = features.values_['col8'];
    document.getElementById('c9').innerHTML = features.values_['col9'];
    document.getElementById('c10').innerHTML = features.values_['col10'];
    document.getElementById('c11').innerHTML = features.values_['col11'];
    document.getElementById('c12').innerHTML = features.values_['col12'];
    document.getElementById('c13').innerHTML = features.values_['col13'];
    document.getElementById('c14').innerHTML = features.values_['col14'];
    document.getElementById('c15').innerHTML = features.values_['col15'];
    document.getElementById('c16').innerHTML = features.values_['col16'];
    document.getElementById('c17').innerHTML = features.values_['col17'];
    document.getElementById('c18').innerHTML = features.values_['col18'];
    document.getElementById('c19').innerHTML = features.values_['col19'];
    document.getElementById('c20').innerHTML = features.values_['col20'];
    document.getElementById('c21').innerHTML = features.values_['col21'];
    document.getElementById('c22').innerHTML = features.values_['col22'];
    document.getElementById('c23').innerHTML = features.values_['col23'];
    document.getElementById('c24').innerHTML = features.values_['col24'];
    document.getElementById('c25').innerHTML = features.values_['col25'];
    document.getElementById('c26').innerHTML = features.values_['col26'];
    document.getElementById('c27').innerHTML = features.values_['col27'];
    document.getElementById('c28').innerHTML = features.values_['col28'];
  }); 
}

// const displayFeatureInfo = (pixel) => {
//   map.getFeaturesAtPixel({
//     pixel: pixel,
//     layers: [layer],
//     success: function(featuresByLayer) {
//       var features = featuresByLayer[0];
//       console.log("feature found")
//       // var info = [];
//       // for (var i = 0, ii = features.length; i < ii; ++i) {
//       //   info.push(features[i].get('name'));
//       // }
//       // document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
//     }
//   });
// }

map.on('click', function(evt) {
  var pixel = evt.pixel;
  displayFeatureInfo(pixel);
});
