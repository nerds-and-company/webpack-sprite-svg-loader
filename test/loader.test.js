/**
 * @jest-environment node
 */
import { compiler, volume } from './compiler.js';

const path = require('path');
const glob = require('glob');

const expectedSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><symbol id="icon-eye" viewBox="0 0 30 30" fill="currentColor">
  <path d="M15,26.2c-9.4,0-14.7-10.3-14.9-10.8c-0.1-0.3-0.1-0.6,0-0.8C0.3,14.2,5.6,3.8,15,3.8c9.4,0,14.7,10.3,14.9,10.8
  c0.1,0.3,0.1,0.6,0,0.8C29.7,15.8,24.4,26.2,15,26.2z M1.9,15c1,1.8,5.8,9.4,13.1,9.4c7.3,0,12-7.5,13.1-9.4
  c-1-1.8-5.8-9.4-13.1-9.4C7.7,5.6,3,13.2,1.9,15z"/>
  <path d="M15,19.7c-2.6,0-4.7-2.1-4.7-4.7s2.1-4.7,4.7-4.7s4.7,2.1,4.7,4.7S17.6,19.7,15,19.7z M15,12.1c-1.6,0-2.9,1.3-2.9,2.9
  c0,1.6,1.3,2.9,2.9,2.9c1.6,0,2.9-1.3,2.9-2.9C17.9,13.4,16.6,12.1,15,12.1z"/>
</symbol><symbol id="icon-file" viewBox="0 0 30 30" fill="currentColor">
  <path d="M26.9,9c0-0.1-0.1-0.1-0.1-0.2c0,0-0.1-0.1-0.1-0.1l-8.2-8.4c0,0,0,0,0,0c-0.1-0.1-0.2-0.2-0.3-0.2
    C18,0,17.9,0,17.8,0h-11C4.7,0,3,1.7,3,3.8v22.4C3,28.3,4.7,30,6.8,30h16.5c2.1,0,3.8-1.7,3.8-3.8V9.4C27,9.3,27,9.1,26.9,9z
    M18.8,3.4l4.9,5h-4.9V3.4z M23.2,28H6.8c-1,0-1.8-0.8-1.8-1.8V3.8C5,2.8,5.8,2,6.8,2h10v7.4c0,0.6,0.4,1,1,1H25v15.8
    C25,27.2,24.2,28,23.2,28z"/>
  <path d="M20.5,15.4h-11c-0.6,0-1,0.4-1,1s0.4,1,1,1h11c0.6,0,1-0.4,1-1S21.1,15.4,20.5,15.4z"/>
  <path d="M20.5,21h-11c-0.6,0-1,0.4-1,1s0.4,1,1,1h11c0.6,0,1-0.4,1-1S21.1,21,20.5,21z"/>
  <path d="M9.5,11.8h2.8c0.6,0,1-0.4,1-1s-0.4-1-1-1H9.5c-0.6,0-1,0.4-1,1S8.9,11.8,9.5,11.8z"/>
</symbol></svg>`;

test('Generates sprite', async () => {
  await compiler({
    sprite: glob.sync(path.resolve(__dirname, './fixtures/**/*.svg')),
  });
  const sprite = volume.toJSON()[__dirname + '/sprite.svg'];

  expect(sprite).toBe(expectedSvg);
});
