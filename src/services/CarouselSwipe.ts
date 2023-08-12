interface IMover {
  next: () => void;
  prev: () => void;
}

export default function carouselSwipe(direction: string, ref: IMover): void {
  if (direction == 'left') {
    ref.next();
  }

  if (direction == 'right') {
    ref.prev();
  }
}
