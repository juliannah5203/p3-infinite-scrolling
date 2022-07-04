

"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  fill(noise(i, j) * 255)

  push();

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);


  strokeWeight(3);
  stroke(random(130), random(130, 255), random(130));
  line(th, tw, th+16, tw+16);
  line(th, tw, th, tw+16);
  line(th+16, tw, th, tw+16);
  strokeWeight(1);

  let n = clicks[[i, j]] | 0;
  if (i % 2 == 1 && n % 2 == 1) {
    let x = random(255);
    let z = random(255);
    fill(x, 255, z, 180);
    ellipse(th/2, tw/2, 15, 15);
  }
  else if (i % 3 == 1 && n % 2 == 1){
    let x = random(255);
    let z = random(255);
    fill(x, z, 255, 180);
    square(0, 0, 15);
  }
  else if (n % 2 == 1) {
    let x = random(255);
    let z = random(255);
    fill(255, x, z, 180);
    triangle(0, tw, th/2, 0, th, tw);
  }



  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(255, 0, 255, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}