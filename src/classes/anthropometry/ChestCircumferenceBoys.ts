// export default [
//   { '3rd': 31.7, '10th': 32.3, '25th': 33.5, '50th': 34.8, '75th': 36.6, '90th': 36.8, '97th': 37.8 },
//   { '3rd': 33.3, '10th': 34.1, '25th': 35.2, '50th': 36.5, '75th': 37.9, '90th': 38.9, '97th': 40.2 },
//   { '3rd': 35.0, '10th': 35.7, '25th': 36.9, '50th': 38.3, '75th': 39.8, '90th': 40.8, '97th': 42.0 },
//   { '3rd': 36.5, '10th': 36.5, '25th': 37.2, '50th': 38.4, '75th': 39.9, '90th': 41.6, '97th': 42.7 },
//   { '3rd': 37.9, '10th': 38.6, '25th': 39.8, '50th': 41.4, '75th': 43.4, '90th': 44.6, '97th': 45.9 },
//   { '3rd': 39.3, '10th': 40.1, '25th': 41.2, '50th': 42.9, '75th': 45.0, '90th': 45.7, '97th': 47.6 },
//   { '3rd': 40.6, '10th': 41.4, '25th': 42.5, '50th': 44.3, '75th': 46.3, '90th': 47.6, '97th': 49.0 },
//   { '3rd': 41.7, '10th': 42.5, '25th': 43.6, '50th': 45.5, '75th': 47.5, '90th': 48.9, '97th': 50.1 },
//   { '3rd': 42.7, '10th': 43.5, '25th': 44.6, '50th': 46.4, '75th': 48.5, '90th': 49.9, '97th': 51.1 },
//   { '3rd': 43.6, '10th': 44.4, '25th': 45.4, '50th': 47.2, '75th': 49.3, '90th': 50.8, '97th': 52.0 },
//   { '3rd': 44.3, '10th': 45.1, '25th': 46.1, '50th': 47.9, '75th': 50.0, '90th': 51.4, '97th': 52.8 },
//   { '3rd': 44.8, '10th': 45.6, '25th': 46.6, '50th': 48.4, '75th': 50.6, '90th': 52.0, '97th': 53.5 },
//   { '3rd': 45.3, '10th': 46.1, '25th': 47.0, '50th': 48.7, '75th': 51.0, '90th': 52.5, '97th': /* null */ 52.5 },
//   { '3rd': 46.0, '10th': 46.8, '25th': 47.9, '50th': 49.8, '75th': 51.9, '90th': 53.4, '97th': 55.1 },
//   { '3rd': 46.5, '10th': 47.4, '25th': 48.6, '50th': 50.4, '75th': 52.4, '90th': 53.9, '97th': 55.6 },
//   { '3rd': 47.0, '10th': 47.9, '25th': 49.1, '50th': 50.8, '75th': 52.9, '90th': 54.3, '97th': 56.0 },
//   { '3rd': 47.6, '10th': 48.4, '25th': 49.5, '50th': 51.4, '75th': 53.2, '90th': 54.7, '97th': /* null */ 54.7 },
//   { '3rd': 47.9, '10th': 48.7, '25th': 49.9, '50th': 51.7, '75th': 53.4, '90th': 55.2, '97th': 56.8 },
//   { '3rd': 48.2, '10th': 49.0, '25th': 50.3, '50th': 52.0, '75th': 53.9, '90th': 55.5, '97th': 57.3 },
//   { '3rd': 48.4, '10th': 49.3, '25th': 50.5, '50th': 52.3, '75th': 54.2, '90th': 55.8, '97th': 57.7 },
//   { '3rd': 48.6, '10th': 49.7, '25th': 50.8, '50th': 52.3, '75th': 54.6, '90th': 56.4, '97th': /* null */ 56.4 },
//   { '3rd': 49.2, '10th': 50.3, '25th': 51.5, '50th': 53.1, '75th': 55.0, '90th': 57.1, '97th': 59.0 },
//   { '3rd': 50.0, '10th': 51.2, '25th': 52.4, '50th': 53.8, '75th': 55.8, '90th': 58.0, '97th': 59.9 },
//   { '3rd': 50.8, '10th': 52.0, '25th': 53.3, '50th': 54.7, '75th': 56.9, '90th': 59.0, '97th': 61.2 },
//   { '3rd': 51.3, '10th': 52.8, '25th': 54.0, '50th': 55.6, '75th': 58.0, '90th': 60.0, '97th': 62.6 },
//   { '3rd': 52.2, '10th': 53.5, '25th': 55.0, '50th': 56.6, '75th': 59.1, '90th': 61.3, '97th': 63.7 },
//   { '3rd': 53.0, '10th': 54.4, '25th': 56.0, '50th': 57.7, '75th': 60.2, '90th': 62.5, '97th': 65.1 },
//   { '3rd': 53.8, '10th': 55.2, '25th': 57.0, '50th': 58.8, '75th': 61.3, '90th': 63.8, '97th': 66.4 },
//   { '3rd': 54.6, '10th': 56.2, '25th': 57.9, '50th': 59.8, '75th': 62.3, '90th': 65.1, '97th': 67.9 },
//   { '3rd': 56.2, '10th': 58.0, '25th': 60.0, '50th': 61.9, '75th': 64.8, '90th': 67.8, '97th': 70.8 },
//   { '3rd': 57.7, '10th': 59.6, '25th': 61.9, '50th': 64.1, '75th': 67.0, '90th': 70.6, '97th': 73.6 },
//   { '3rd': 59.3, '10th': 61.4, '25th': 63.8, '50th': 66.4, '75th': 69.8, '90th': 73.6, '97th': 76.8 },
//   { '3rd': 61.1, '10th': 63.0, '25th': 66.0, '50th': 68.9, '75th': 74.9, '90th': 76.2, '97th': 79.8 },
//   { '3rd': 62.6, '10th': 65.0, '25th': 68.0, '50th': 71.1, '75th': 72.1, '90th': 79.0, '97th': 82.8 },
//   { '3rd': 64.7, '10th': 67.3, '25th': 70.2, '50th': 73.5, '75th': 78.2, '90th': 82.1, '97th': 87.0 },
//   { '3rd': 67.0, '10th': 69.9, '25th': 73.1, '50th': 76.6, '75th': 81.7, '90th': 86.3, '97th': 91.0 },
//   { '3rd': 70.0, '10th': 72.9, '25th': 76.3, '50th': 80.2, '75th': 85.7, '90th': 90.1, '97th': 94.3 },
//   { '3rd': 73.3, '10th': 76.2, '25th': 80.0, '50th': 84.5, '75th': 89.9, '90th': 93.6, '97th': 97.0 },
//   { '3rd': 77.0, '10th': 80.0, '25th': 82.9, '50th': 87.2, '75th': 92.2, '90th': 95.5, '97th': 98.4 },
// ];

export default [
  { Month: 0, '3rd': 31.7, '10th': 32.3, '25th': 33.5, '50th': 34.8, '75th': 36.6, '90th': 36.8, '97th': 37.8 },
  { Month: 1, '3rd': 33.3, '10th': 34.1, '25th': 35.2, '50th': 36.5, '75th': 37.9, '90th': 38.9, '97th': 40.2 },
  { Month: 2, '3rd': 35.0, '10th': 35.7, '25th': 36.9, '50th': 38.3, '75th': 39.8, '90th': 40.8, '97th': 42.0 },
  { Month: 3, '3rd': 36.5, '10th': 36.5, '25th': 37.2, '50th': 38.4, '75th': 39.9, '90th': 41.6, '97th': 42.7 },
  { Month: 4, '3rd': 37.9, '10th': 38.6, '25th': 39.8, '50th': 41.4, '75th': 43.4, '90th': 44.6, '97th': 45.9 },
  { Month: 5, '3rd': 39.3, '10th': 40.1, '25th': 41.2, '50th': 42.9, '75th': 45.0, '90th': 45.7, '97th': 47.6 },
  { Month: 6, '3rd': 40.6, '10th': 41.4, '25th': 42.5, '50th': 44.3, '75th': 46.3, '90th': 47.6, '97th': 49.0 },
  { Month: 7, '3rd': 41.7, '10th': 42.5, '25th': 43.6, '50th': 45.5, '75th': 47.5, '90th': 48.9, '97th': 50.1 },
  { Month: 8, '3rd': 42.7, '10th': 43.5, '25th': 44.6, '50th': 46.4, '75th': 48.5, '90th': 49.9, '97th': 51.1 },
  { Month: 9, '3rd': 43.6, '10th': 44.4, '25th': 45.4, '50th': 47.2, '75th': 49.3, '90th': 50.8, '97th': 52.0 },
  { Month: 10, '3rd': 44.3, '10th': 45.1, '25th': 46.1, '50th': 47.9, '75th': 50.0, '90th': 51.4, '97th': 52.8 },
  { Month: 11, '3rd': 44.8, '10th': 45.6, '25th': 46.6, '50th': 48.4, '75th': 50.6, '90th': 52.0, '97th': 53.5 },
  { Month: 12, '3rd': 45.3, '10th': 46.1, '25th': 47.0, '50th': 48.7, '75th': 51.0, '90th': 52.5, '97th': /* null */ 52.5 },
  { Month: 15, '3rd': 46.0, '10th': 46.8, '25th': 47.9, '50th': 49.8, '75th': 51.9, '90th': 53.4, '97th': 55.1 },
  { Month: 18, '3rd': 46.5, '10th': 47.4, '25th': 48.6, '50th': 50.4, '75th': 52.4, '90th': 53.9, '97th': 55.6 },
  { Month: 21, '3rd': 47.0, '10th': 47.9, '25th': 49.1, '50th': 50.8, '75th': 52.9, '90th': 54.3, '97th': 56.0 },
  { Month: 24, '3rd': 47.6, '10th': 48.4, '25th': 49.5, '50th': 51.4, '75th': 53.2, '90th': 54.7, '97th': /* null */ 54.7 },
  { Month: 27, '3rd': 47.9, '10th': 48.7, '25th': 49.9, '50th': 51.7, '75th': 53.4, '90th': 55.2, '97th': 56.8 },
  { Month: 30, '3rd': 48.2, '10th': 49.0, '25th': 50.3, '50th': 52.0, '75th': 53.9, '90th': 55.5, '97th': 57.3 },
  { Month: 33, '3rd': 48.4, '10th': 49.3, '25th': 50.5, '50th': 52.3, '75th': 54.2, '90th': 55.8, '97th': 57.7 },
  { Month: 36, '3rd': 48.6, '10th': 49.7, '25th': 50.8, '50th': 52.3, '75th': 54.6, '90th': 56.4, '97th': /* null */ 56.4 },
  { Month: 42, '3rd': 49.2, '10th': 50.3, '25th': 51.5, '50th': 53.1, '75th': 55.0, '90th': 57.1, '97th': 59.0 },
  { Month: 48, '3rd': 50.0, '10th': 51.2, '25th': 52.4, '50th': 53.8, '75th': 55.8, '90th': 58.0, '97th': 59.9 },
  { Month: 54, '3rd': 50.8, '10th': 52.0, '25th': 53.3, '50th': 54.7, '75th': 56.9, '90th': 59.0, '97th': 61.2 },
  { Month: 60, '3rd': 51.3, '10th': 52.8, '25th': 54.0, '50th': 55.6, '75th': 58.0, '90th': 60.0, '97th': 62.6 },
  { Month: 66, '3rd': 52.2, '10th': 53.5, '25th': 55.0, '50th': 56.6, '75th': 59.1, '90th': 61.3, '97th': 63.7 },
  { Month: 72, '3rd': 53.0, '10th': 54.4, '25th': 56.0, '50th': 57.7, '75th': 60.2, '90th': 62.5, '97th': 65.1 },
  { Month: 78, '3rd': 53.8, '10th': 55.2, '25th': 57.0, '50th': 58.8, '75th': 61.3, '90th': 63.8, '97th': 66.4 },
  { Month: 84, '3rd': 54.6, '10th': 56.2, '25th': 57.9, '50th': 59.8, '75th': 62.3, '90th': 65.1, '97th': 67.9 },
  { Month: 96, '3rd': 56.2, '10th': 58.0, '25th': 60.0, '50th': 61.9, '75th': 64.8, '90th': 67.8, '97th': 70.8 },
  { Month: 108, '3rd': 57.7, '10th': 59.6, '25th': 61.9, '50th': 64.1, '75th': 67.0, '90th': 70.6, '97th': 73.6 },
  { Month: 120, '3rd': 59.3, '10th': 61.4, '25th': 63.8, '50th': 66.4, '75th': 69.8, '90th': 73.6, '97th': 76.8 },
  { Month: 132, '3rd': 61.1, '10th': 63.0, '25th': 66.0, '50th': 68.9, '75th': 74.9, '90th': 76.2, '97th': 79.8 },
  { Month: 144, '3rd': 62.6, '10th': 65.0, '25th': 68.0, '50th': 71.1, '75th': 72.1, '90th': 79.0, '97th': 82.8 },
  { Month: 156, '3rd': 64.7, '10th': 67.3, '25th': 70.2, '50th': 73.5, '75th': 78.2, '90th': 82.1, '97th': 87.0 },
  { Month: 168, '3rd': 67.0, '10th': 69.9, '25th': 73.1, '50th': 76.6, '75th': 81.7, '90th': 86.3, '97th': 91.0 },
  { Month: 180, '3rd': 70.0, '10th': 72.9, '25th': 76.3, '50th': 80.2, '75th': 85.7, '90th': 90.1, '97th': 94.3 },
  { Month: 192, '3rd': 73.3, '10th': 76.2, '25th': 80.0, '50th': 84.5, '75th': 89.9, '90th': 93.6, '97th': 97.0 },
  { Month: 204, '3rd': 77.0, '10th': 80.0, '25th': 82.9, '50th': 87.2, '75th': 92.2, '90th': 95.5, '97th': 98.4 },
];
