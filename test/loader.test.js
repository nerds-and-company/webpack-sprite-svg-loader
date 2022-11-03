/**
 * @jest-environment node
 */
import { compiler, volume } from './compiler.js';

const path = require('path');
const glob = require('glob');
const fs = require('fs');

const expectedSvg = fs.readFileSync(__dirname + '/sprite.svg', 'utf8');

test('Generates sprite', async () => {
  await compiler({
    sprite: glob.sync(path.resolve(__dirname, './fixtures/**/*.svg')),
  });
  const sprite = volume.toJSON()[__dirname + '/sprite.svg'];

  expect(sprite).toBe(expectedSvg);
});
