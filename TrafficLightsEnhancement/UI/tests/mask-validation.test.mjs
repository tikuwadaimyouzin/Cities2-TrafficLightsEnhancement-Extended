import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mask validation walks backwards so swap-back removals cannot skip entries', async () => {
  const source = await readFile(new URL('../../Utils/CustomPhaseUtils.cs', import.meta.url), 'utf8');
  for (const buffer of ['edgeGroupMaskBuffer', 'subLaneGroupMaskBuffer']) {
    assert.ok(source.includes(`for (int i = ${buffer}.Length - 1; i >= 0; i--)`));
  }
});
