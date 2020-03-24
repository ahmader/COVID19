/* eslint-disable max-classes-per-file */
let dancing = false;
let spliting = false;
let word;

const colors = {
  green: [27, 176, 109],
  red: [238, 40, 67],
  yellow: [241, 183, 24],
  blue: [24, 74, 156],
};

// an array to add multiple particles
let logo;


// Jitter class
class Jitter {
  constructor(props) {
    const {
      letter,
      x,
      y,
      fill,
      font,
      textSize,
      textStyle,
      id,
    } = props;
    this.props = props;
    this.x = x + 10; // || random(width);
    this.y = y + 10; // || random(height);
    this.pos = { y: this.y, x: this.x };
    this.speed = 0.5;
    this.color = fill;
    this.font = font;
    this.textSize = textSize;
    this.text = letter;
    this.textStyle = textStyle;
    this.id = id;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    const {
      letter,

    } = this.props;
    // console.log(this.font);
    textFont(this.font);
    textSize(this.textSize);
    textStyle(this.textStyle);
    fill(this.color);
    text(this.text, this.x, this.y);
    textStyle(NORMAL);
    if (spliting && this.text !== 'T') {
      if (this.pos.x + (20 * this.id) > this.x) {
        this.x += 2;
      }
    } else {
      this.x = this.pos.x;
    }
  }
}


function setupLogo() {
  const {
    red,
    green,
    yellow,
    blue
  } = colors;

  word.push(new Jitter({
    id: 1,
    letter: 'T',
    x: 0,
    y: 35,
    font: 'Georgia',
    textSize: 50,
    textStyle: NORMAL,
    fill: (`rgba(${green[0]}, ${green[1]}, ${green[2]}, 1)`)
  }));

  word.push(new Jitter({
    id: 2,
    letter: 'a',
    x: 18,
    y: 53,
    font: 'Georgia',
    textSize: 50,
    textStyle: NORMAL,
    fill: (`rgba(${green[0]}, ${green[1]}, ${green[2]}, 1)`)
  }));

  word.push(new Jitter({
    id: 3,
    letter: 'l',
    x: 33,
    y: 40,
    font: 'Comics',
    textSize: 50,
    textStyle: ITALIC,
    fill: (`rgba(${red[0]}, ${red[1]}, ${red[2]}, 1)`)
  }));

  word.push(new Jitter({
    id: 4,
    letter: 'e',
    x: 43,
    y: 42,
    font: 'Tahoma',
    textSize: 50,
    textStyle: NORMAL,
    fill: (`rgba(${red[0]}, ${red[1]}, ${red[2]}, 1)`)
  }));

  word.push(new Jitter({
    id: 5,
    letter: 'n',
    x: 65,
    y: 53,
    font: 'Tahoma',
    textSize: 34,
    textStyle: NORMAL,
    fill: (`rgba(${yellow[0]}, ${yellow[1]}, ${yellow[2]}, 1)`)
  }));

  word.push(new Jitter({
    id: 6,
    letter: 't',
    x: 79,
    y: 37,
    font: 'Comics',
    textSize: 38,
    textStyle: ITALIC,
    fill: (`rgba(${yellow[0]}, ${yellow[1]}, ${yellow[2]}, 1)`)
  }));


  word.push(new Jitter({
    id: 7,
    letter: 'S',
    x: 86,
    y: 45,
    font: 'Tahoma',
    textSize: 60,
    textStyle: NORMAL,
    fill: (`rgba(${blue[0]}, ${blue[1]}, ${blue[2]}, 1)`)
  }));
}

function drawLogo() {
  background('#0f0f0f');
  image(logo, 10, height - logo.height);

  if (spliting) {
    cc2.html('ON');
    // w.social();
  } else {
    cc2.html('OFF');
  }

  word.map(w => {
    w.display();
    if (dancing) {
      cc.html('ON');
      w.move();
    } else {
      cc.html('OFF');
    }
  });
}
