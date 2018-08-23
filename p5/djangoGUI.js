// DO NOT TOUCH THESE
var tasks
var num_lanes

let lane_y = 10;
let lane_gap = 5;
let lane_height = 35;

var canvas_width = windowWidth;
var canvas_height = windowHeight

function preload() {
  // Get the most recent earthquake in the database
  var url =
   'tasksJSON/';
  tasks = loadJSON(url);
  console.log(tasks)

}

function setup() {
  // Set the size of the GUI in the browser
  var canvas = createCanvas(canvas_width, canvas_height);
  canvas.position(width/2,height/2);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  var max = 0;
  for (i = 0; i < Object.keys(tasks).length; i++){
    if (tasks[i].resources > max){
      max = tasks[i].resources;
    }
  }
  num_lanes = max

  // Create the lanes using the Lane class at the bottom of this file
  for (i = 0; i < num_lanes; i++) {
    lanes[i] = new Lane(i + 1, ypos1, h);
    ypos1 = ypos1 + h + lane_gap;
  }

}

// Class describing how the lanes work
class Lane {
  constructor(tempID, tempy) {
    this.x = 0;
    this.y = tempy;
    this.w = 480;
    this.stroke = 1;
    this.mouseover = false;

    this.ID = tempID.toString();
    // array to hold all the jobs that have been added to the lane
    this.jobs = []
  }

  // function to check if the mouse is over top of the lane
  mouseOn() {
    if (mouseX > this.x*zoom_val && mouseX < this.x*zoom_val + this.w*zoom_val
      && mouseY > this.y && mouseY < this.y + lane_height) {
      this.stroke = 2;
      this.mouseover = true;
    }
    else {
      this.stroke = 1;
      this.mouseover = false;
    }
  }


  // how the lanes are all displayed
  show() {
    stroke(0);
    strokeWeight(this.stroke);
    noFill();
    rect(this.x, this.y, this.w, lane_height);

    strokeWeight(1);
    textSize(12);
    text(`Lane: ${this.ID}`, this.x + (.06 * this.w), this.y + (.5 * lane_height) + 3);

    // if no jobs are in the lane it displays the full length of the lane
    // otherwise each new job added updates the display to show the
    // amount of space remaining
    if (this.jobs.length == 0) {
      textSize(12);
      text(`Lane Length: ${lane_lens}`, this.x + (.75 * this.w), this.y + (.5 * lane_height) + 3);
    }
  }
}


class Job {
  constructor(tempx, tempy, templength, job, lane) {
    this.w = templength;
    this.x = tempx;
    this.y = tempy;
    this.mouseover = false;
    // store the unused job this turned into in case someone removes
    // it from the lane
    this.job = job;

    // store the lane this job is in to be able to make changes to the
    // lane when the job is added/ removed
    this.lane = lane;
  }

  // is the mouse over the used job
  mouseOn() {
    if (mouseX > this.x*zoom_val && mouseX < this.x*zoom_val + this.w*zoom_val
      && mouseY > this.y && mouseY < this.y + lane_height) {
      this.mouseover = true;
    }
    else {
      this.mouseover = false;
    }
  }


  // Defines how used jobs are displayed
  show() {
      stroke(0);
      strokeWeight(1);
      fill(150);
      rect(this.x, this.y, this.w, lane_height);

      // if the used job rectangle covers the text with the lane number
      // redraw the same text over everythin
      if (this.x + this.w > 35) {
        strokeWeight(.5);
        fill(0);
        text(`Lane ${this.lane + 1}`, lanes[this.lane].x + (.06 * lanes[this.lane].w), lanes[this.lane].y + (.5 * lane_height) + 3);
      }


      // Display the amount of space that is remaining in the lane
      strokeWeight(.5);
      fill(0);
      text(`Space Remaining: ${lanes[this.lane].remaining}`, lanes[this.lane].x + (.75 * lanes[this.lane].w), lanes[this.lane].y + (.5 * lanes[this.lane].h) + 3);
  }
}


function parseJSON(tasks){
  console.log(tasks)
}
