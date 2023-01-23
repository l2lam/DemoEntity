class Gallery {
  constructor(photos) {
    this.photos = photos;
  }
}

class Photo {
  constructor(name, image, dateCreated, artist, description) {
    this.name = name;
    this.image = image;
    this.dateCreated = dateCreated;
    this.artist = artist;
    this.description = description;
  }
}

class Artist {
  constructor(name, image, bio, age) {
    this.name = name;
    this.image = image;
    this.bio = bio;
    this.age = age;
  }
}

let vickyArtist;
let gallery;
let photos;

const SHOW_GALLERY = 0;
const SHOW_PHOTO = 1;
const SHOW_ARTIST = 2;

let selectedPhoto;
let currentState = SHOW_GALLERY;

function preload() {
  vickyArtist = new Artist('Vicky', loadImage('assets/vicky.jpeg'), 'blah blah blah', 15);

  photos = [
    new Photo('Scare', loadImage('assets/scare.jpg'), '1968', vickyArtist, 'blah blah blah'),
    new Photo('Happy', loadImage('assets/happy.webp'), '1968', vickyArtist, 'blah blah blah'),
  ];

  gallery = new Gallery(photos);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); 
  frameRate(1);
}

function draw() {
  switch(currentState) {
    case SHOW_GALLERY:
      showGallery();
      break;
    case SHOW_PHOTO:
      showPhoto();
      break;
    case SHOW_ARTIST:
      showArtist();
      break;
  }
}

const GALLERY_PHOTO_WIDTH = 100;
const GALLERY_PHOTO_HEIGHT = 160;

function showGallery() {
  gallery.photos.forEach((photo, i) => {
    let x = (width/2 - i*GALLERY_PHOTO_WIDTH - 30);
    let y = 0;
    image(photo.image, x, y, GALLERY_PHOTO_WIDTH, GALLERY_PHOTO_HEIGHT);
    let button = createButton(photo.name);
    button.position(x, y);
    button.mousePressed(() => {photoSelected(photo)})
  })
}

function photoSelected(photo) {
  print('selected', photo.name);
  selectedPhoto = photo;
  currentState = SHOW_PHOTO;
}

function showPhoto() {
  print('showing photo', selectedPhoto.name)
  clear();
  image(selectedPhoto.image, 0, 0);
  let x = selectedPhoto.image.width + 20
  text(selectedPhoto.name, x, 100);
  let button = createButton(selectedPhoto.artist.name)
  button.position(x, 150)
  button.mousePressed(artistClicked)
}

function artistClicked() {
  currentState = SHOW_ARTIST;
}

function showArtist() {
  let artist = selectedPhoto.artist;
  print('showing artist', artist.name)
  clear();
  image(artist.image, 0, 0);
  let x = artist.image.width + 20
  text(artist.name, x, 100);
}