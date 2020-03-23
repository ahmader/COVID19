let finished = false;
let stopSick = true;
let chart = [];
let roomsFull = false;

const colors = {
  green: [27, 176, 109],
  red: [238, 40, 67],
  yellow: [241, 183, 24],
  blue: [24, 74, 156],
}
const rooms = [];
for (let yyy = 0; yyy < 5; yyy++) {
  // const floors = [];
  for (let xxx = 0; xxx < 5; xxx++) {
    // floors.push({ x: 0 + (10 * xxx), y: 0 + (10 * yyy), busy: false });
    rooms.push({
      x: 5 + (10 * xxx),
      y: 5 + (10 * yyy),
      busy: false
    });
  }
  // rooms.push(floors);
}
// rooms[0].busy = true;

// rooms.reverse();
// console.log(rooms);

// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor({
    id,
    x,
    y,
    isHealthy,
    isInfected,
    isSick,
    isRecovered,
    room,
    power,
  }) {
    this.id = id;

    if (this.isInfected) {
      this.y = this.y;
      this.x = this.x;
    } else {
      this.x = typeof x !== 'undefined' ? x : random(0, P5.width - 100);
      this.y = typeof y !== 'undefined' ? y : random(0, P5.height - 100);
      this.xSpeed = random(-2, 2);
      this.ySpeed = random(-1, 1.5);
    }
    this.r = 8; //random(1,8);


    this.isHealthy = isHealthy === true;
    this.isInfected = isInfected === true;
    this.isSick = isSick === true;
    this.isRecovered = isRecovered === true;
    this.sickness = 0;
    this.room = typeof room !== 'undefined' ? y : -1;
    this.power = typeof power !== 'undefined' ? power : 100;
  }

  // creation of a particle.
  createParticle() {



    if ((this.isSick) && this.sickness >= 500) {
      if (!stopSick && this.room === -1) {
        this.makeDead();
      } else {
        this.makeHealthy();
      }

    }
    if ((this.isInfected) && this.sickness >= 500) {
      this.sickness = 0;
      this.makeSick();
    }
    if (this.isSick || this.isInfected) {
      this.sickness += Math.round(random(1, 5));
    }
    noStroke();
    if (this.isHealthy) {
      fill('rgba(27, 176, 109,1)');
    } else if (this.isSick) {
      fill('rgba(238, 40, 67, 1)');
    } else if (this.isInfected) {
      fill('rgba(241, 183, 24, 1)');
    } else if (this.isRecovered) {
      fill('rgba(24, 74, 156, 1)');
    } else if (this.isDead) {
      fill('rgba(255, 255, 255, .8)');
    }

    circle(this.x, this.y, this.r);

    if (this.isInfected || this.isSick) {
      textSize(10);
      text(this.sickness, this.x, this.y);
      fill(255, 255, 255);
    }
  }
  makeInfected() {
    if (this.isHealthy !== true) return;
    // noStroke();
    // fill('rgba(255,0,0,1)');
    // circle(this.x,this.y,8);
    this.isInfected = true;
    this.isSick = false;
    this.isHealthy = false;
    this.isRecovered = false;
  }
  makeSick() {
    if (this.isHealthy !== true && this.isInfected !== true) return;
    // noStroke();
    // fill('rgba(255,0,0,1)');
    // circle(this.x,this.y,8);
    this.isInfected = true;
    this.isSick = true;
    this.isHealthy = false;
    this.isRecovered = false;
  }

  makeDead() {
    this.isInfected = false;
    this.isHealthy = false;
    this.isSick = false;
    this.isRecovered = false;
    this.isDead = true;
  }

  makeHealthy() {
    // if ( ! this.isSick ) return;
    // noStroke();
    // fill('rgba(255,255,255,1)');
    // circle(this.x,this.y,this.r);
    this.isInfected = false;
    this.isHealthy = false;
    this.isSick = false;
    this.isRecovered = true;
    this.sickness = 0;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-3, 3.5);
    this.x = random(0, P5.width - 100);
    this.y = random(0, P5.height - 100);
    if (this.room !== -1) {
      if (rooms[this.room]) {
        rooms[this.room].busy = false;
      }

    }
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.isDead) return;

    if (this.x < 0 || this.x > P5.width - 80)
      this.xSpeed *= -1;
    if (this.y < 0 || this.y > P5.height - 80)
      this.ySpeed *= -1;

    if (finished || this.isSick || (stopSick && (this.isInfected))) {
      if (this.room === -1) {
        let freeRoom = rooms.findIndex(r => r.busy === false);
        if (freeRoom !== -1) {
          rooms[freeRoom].busy = true;
          // this.x = (width - 100 ) - rooms[freeRoom].x; //width - 50;
          // this.y = P5.height - rooms[freeRoom].y - 100; //height - 50;
          this.x = (width - 100) + rooms[freeRoom].x; //width - 50;
          this.y = (height - 100) + rooms[freeRoom].y; //height - 50;
          this.room = freeRoom;
          this.xSpeed = 0;
          this.ySpeed = 0;
          roomsFull = false;
          // console.log(this.x, this.y);
        } else {
          roomsFull = true;
          // this.power--;
          // this.sickness++;
          this.xSpeed = 0;
          this.ySpeed = 0;
          // alert('No more rooms :(');
        }
      }

      // if (this.id === 1) {
      // this.x = P5.width - 100 - rooms[this.id].x ;//width - 50;
      // this.y = P5.height - 100 - rooms[this.id].y ;//height - 50;

    }

    // } else {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    // }

  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart

  joinParticles(paraticles) {

    particles.forEach(element => {
      let dis = dist(this.x, this.y, element.x, element.y);

      if (dis < 50) {
        if ((this.isSick || (this.isInfected && this.sickness > random(50, 100))) && element.isHealthy) {
          element.makeInfected();
          if (this.isInfected) {
            stroke('rgba(255,255,0,1)');
          } else {
            stroke('rgba(255,0,0,1)');
          }
          line(this.x, this.y, element.x, element.y);
        }
        if ((element.isSick || (element.isInfected && element.sickness > random(50, 100))) && this.isHealthy) {
          this.makeInfected();
          if (element.isInfected) {
            stroke('rgba(255,255,0,1)');
          } else {
            stroke('rgba(255,0,0,1)');
          }
          line(this.x, this.y, element.x, element.y);
        }
        // element.makeSick();
        // stroke('rgba(255,255,255,0.04)');
        // line(this.x,this.y,element.x,element.y);
        // console.log(element, dis)
      }

    });
  }

}

// an array to add multiple particles
let particles = [];
// let lifeP = '';
let lifeS = 0;
let logo;
let pg;

function preload() {
  logo = loadImage('talents_logo.png');
}

function changeGray() {
  // alert('hi');
  stopSick = !stopSick;
}


function resetSketch() {
  particles = [];
  chart = [];
  finished = false;

  if ( typeof cc4 !== 'undefined' ) {
    cc4.elt.hidden = true;
    cc4.html('');
  }

  // for(let i = 0;i<width/10;i++){
  for (let i = 0; i < rooms.length; i++) {
    rooms[i].busy = false;
  }
  for (let i = 0; i < 70; i++) {
    if (i === 0) {
      particles.push(new Particle({
        id: i,
        x: P5.width - 100 - rooms[0].x + 10,
        y: P5.height - 100 - rooms[0].y + 10,
        isSick: true,
        // room: 0,
      }));
    } else {
      particles.push(new Particle({
        id: i,
        isHealthy: true
      }));
    }

  }
  loop();

}

function setup() {
  const txt = stopSick ? 'Stop Sick' : 'Move Sick';


  



  //   lifeP = createP([txt + ' hello World' + lifeS]);

  //   lifeP.mouseClicked(changeGray);
  // createCanvas(windowWidth, windowHeight - 50);
  createCanvas(windowWidth, 300);
  logo.resize(logo.width / 3, logo.height / 3);
  // logo.resize(160, 75);
  pg = createGraphics(100, 40);
  resetSketch();

  div = createDiv('');
  div.elt.className = 'bg-dark d-flex justify-content-start align-items-center py-2 px-2';

  cc2 = createButton('إنحسار');
  cc2.elt.className = 'btn btn-success';
  cc2.parent(div);
  cc2.mouseClicked(() => {
    stopSick = true;
    // alert('clicked');
    // finshed = false;
    resetSketch();
    // loop();
  });

  cc = createButton('إنتشار');
  cc.elt.className = 'btn btn-danger mr-4';
  cc.parent(div);
  cc.mouseClicked(() => {
    stopSick = false;
    // alert('clicked');
    // finshed = false;
    resetSketch();
    // loop();
  });


  cc3 = createDiv('الحالة: ' + (stopSick ? 'إنحسار' : 'إنتشار'));
  cc3.elt.className = 'text-light mr-2';
  cc3.parent(div);


  cc4 = createDiv('');
  cc4.elt.className = 'alert alert-danger m-0 mr-2 p-1';
  cc4.elt.hidden = true;
  cc4.parent(div);
  
  
  cc7 = createDiv('');
  cc7.elt.className = 'mr-auto ';

  cc5 = createDiv('@ahmader');
  cc5.elt.className = 'mr-auto small text-muted';
  cc5.elt.dir = 'ltr';
  cc5.elt.style.fontSize = '6px';
  cc5.parent(cc7);
  
  cc5 = createA('https://talents.sa', 'شركة المواهب الوطنية');
  cc5.elt.className = 'small text-light';
  cc5.elt.style.fontFamily='Tahoma';
  cc5.elt.dir = 'ltr';
  cc5.parent(cc7);
  
  cc7.parent(div);
  // twitter
  
  divT = createDiv('');
  divT.elt.className = 'bg-light d-flex justify-content-start align-items-top py-2 px-2';
  
  divShare = createDiv('');
  divShare.elt.className = "ml-4 text-center";
  divShare.parent(divT);
  
  curA = createA('https://twitter.com/intent/tweet?button_hashtag=فهمت_التباعد&ref_src=twsrc%5Etfw', 'Tweet #فهمت_التباعد2');
  curA.elt.className = "twitter-hashtag-button";
  curA.elt["data-show-count"] = "true";
  curA.elt.dataset.showCount = true;
  curA.elt.dataset.lang = 'ar';
  curA.parent(divShare);
  
  curA = createDiv('أو شارك الصفحة: ');
  curA.elt.className = "small";
  curA.parent(divShare);
  
  curWhatsapp = createA('whatsapp://send?text= https://covid19.talents.sa/', 'Whatsapp');
  curWhatsapp.elt.className = "btn btn-sm btn-link disabled";
  curWhatsapp.elt.onclick = () => (false);
  curWhatsapp.elt['disabled'] = 'disabled';
  curWhatsapp.parent(divShare);
  
  (createElement('br')).parent(divShare);
  
  curWhatsapp = createA('#', 'others...');
  curWhatsapp.elt.className = "btn btn-sm btn-link disabled";
  curWhatsapp.elt.disabled = true;
  curWhatsapp.elt.dir = 'ltr';
  curWhatsapp.elt.onclick = () => (false);
  curWhatsapp.parent(divShare);
  
  curT = createA('https://twitter.com/TalentsCenter/lists/project?ref_src=twsrc%5Etfw', 'Tweets by TalentsCenter');
  curT.elt.className = "twitter-timeline";
  curT.elt["data-show-count"] = "true";
  curT.elt.dataset.showCount = true;
  curT.elt.dataset.lang = 'ar';
  curT.parent(divT);

  curPost = createElement('script', '');
  curPost.elt.async = true;
  curPost.elt.src = 'https://platform.twitter.com/widgets.js';
  curPost.elt.charset = 'utf-8';

}

function draw() {
  const txt = !stopSick ? 'Stop Sick' : 'Move Sick';
  if (finished === false) {
    // lifeP.html(txt + ' hello World ' + lifeS);
    lifeS++;
  } else {

    // noLoop();

  }

  background('#0f0f0f');
  image(logo, chart.length + 20, P5.height - logo.height - 3);
  noStroke();

  const healthy = particles.filter(e => (e.isHealthy)).length;
  const sick = particles.filter(e => (e.isSick)).length;
  const infected = particles.filter(e => (e.isInfected)).length;
  const recovered = particles.filter(e => (e.isRecovered)).length;

  cc3.html('الحالة: ' + (stopSick ? 'إنحسار' : 'إنتشار'));


  const {
    red,
    green,
    yellow,
    blue
  } = colors;

  if (roomsFull) {
    fill(red[0], red[1], red[2]);
    text('😱لا يوجد غرف', P5.width - 95, P5.height - 10);
    cc4.elt.hidden = false;
    cc4.html('😱لا يوجد غرف');
  } else {
    cc4.elt.hidden = true;
    cc4.html('');
  }




  const roomsW = rooms.length;
  const roomsH = rooms.length;
  // if (stopSick) {
  fill('rgba(255,255,255,0.3)')
  rect(width - 100, P5.height - 100, 100, 100);
  stroke('rgba(0, 255, 0 , .2)');
  for (let yyy = 0; yyy < 5; yyy++) {
    for (let xxx = 0; xxx < 5; xxx++) {
      rect(width - 100 + (10 * xxx), P5.height - 100 + (10 * yyy), 10, 10);
    }
  }
  // }

  if (chart.length > 1) {
    [oldhealthy, oldsick, oldinfected, oldrecovered] = chart[chart.length - 1];
    if (oldsick != sick || oldinfected != infected || oldrecovered != recovered) {
      chart.push([healthy, sick, infected, recovered, roomsFull]);
    }
  } else {
    chart.push([healthy, sick, infected, recovered, roomsFull]);
  }


  const chartX = 245;
  const chartY = 10; //200;
  const chartH = 50;
  const chartW = chart.length;

  rect(chartY, chartX, chartW, chartH);

  for (let y = 0; y < chart.length; y++) {
    // const total = chart[y][0] + chart[y][1] + chart[y][2];
    const timeline = chartY + y;
    stroke('rgba(255,255,255,1)');

    const total = {
      healthy: chart[y][0] + chart[y][3],
      sick: chart[y][1] + chart[y][2],
      all: chart[y][1] + chart[y][2] + chart[y][0] + chart[y][3],
    }
    const pos1 = Math.round((Math.round((total.healthy / total.all) * 100)));
    const pos2 = Math.round((total.sick / total.all) * 100);

    if (chart[y][4]) {
      stroke(red[0], red[1], red[2]);
      circle(timeline, ((chartX) + ((pos1 / 100) * chartH)), 5);
    }

    // if ( roomsFull ) {
    //     text('😱لا يوجد غرف', timeline, P5.height-10);
    // }


    // line(timeline, chartX, timeline, chartH + chartX);
    stroke(green[0], green[1], green[2]);
    line(timeline, chartX, timeline, ((chartX) + ((pos1 / 100) * chartH)));

    // stroke('rgba(255, 0, 0 , .4)');
    // line(timeline, chartX + pos1 , timeline, (chartX + pos1) - pos2);
    //|| chartX:100 - pos1:99 chartH:49.5 || chartX:100 - pos1:98 chartH:49 || chartX:100 - pos1:97 chartH:48.5 || chartX:100 - pos1:96 chartH:48 || chartX:100 - pos1:95 chartH:47.5



    // if (! stopSick )
    // createSpan(`|| chartX:${chartX} - pos1:${pos1} chartH:${(pos1/100) * chartH} `)

  }
  // if (! stopSick )
  // createP('-------');

  if (recovered !== 0 && infected === 0 && sick === 0) {
    finished = true;
    // return;
    noLoop()
  }

  for (let i = 0; i < particles.length; i++) {
    // if (i === 1) {
    //   particles[i].makeSick();
    // }
    particles[i].createParticle();
    particles[i].joinParticles(particles.slice(i));
    if (!this.isDead) {
      particles[i].moveParticle();
    }


  }
  doStatus();
  // noLoop();
}

function doStatus() {
  const healthy = particles.filter(e => (e.isHealthy)).length;
  const sick = particles.filter(e => (e.isSick)).length;
  const infected = particles.filter(e => (e.isInfected)).length;
  const recovered = particles.filter(e => (e.isRecovered)).length;
  const dead = particles.filter(e => (e.isDead)).length;
  const {
    red,
    yellow,
    green,
    blue
  } = colors;
  textSize(15);
  fill(red[0], red[1], red[2]);
  text('مريض: ' + sick, P5.width - 70, 15);
  fill(yellow[0], yellow[1], yellow[2]);
  text('معدي: ' + infected, P5.width - 70, 30);
  fill(blue[0], blue[1], blue[2]);
  text('متعافي: ' + (recovered), P5.width - 70, 45);
  fill(green[0], green[1], green[2]);
  text('صحيح: ' + (healthy), P5.width - 70, 60);
  fill(255, 255, 255);
  text('لم يعالج: ' + (dead), P5.width - 70, 75);
}