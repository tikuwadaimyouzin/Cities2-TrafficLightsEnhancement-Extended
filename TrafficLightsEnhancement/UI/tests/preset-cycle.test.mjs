import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('preset application recalculates group timing after phase writes', async () => {
  const source = await readFile(new URL('../../Systems/UI/UISystem.UIBIndings.cs', import.meta.url), 'utf8');
  const method = source.slice(source.indexOf('protected void CallApplyUserPreset('), source.indexOf('protected void CallUpdateUserPreset('));
  const recalculate = method.indexOf('RecalculateGroupCycleLength(member.m_GroupEntity)');
  assert.ok(recalculate > method.indexOf('phaseBuffer[i] = phase;'));
  assert.ok(recalculate < method.indexOf('m_MainPanelBinding?.Update()'));
});
