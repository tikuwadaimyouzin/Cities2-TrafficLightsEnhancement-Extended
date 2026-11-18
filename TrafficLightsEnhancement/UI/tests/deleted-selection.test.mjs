import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('selected entity writes reject destroyed and deleted intersections', async () => {
  const source = await readFile(new URL('../../Systems/UI/UISystem.cs', import.meta.url), 'utf8');
  const method = source.slice(source.indexOf('public void UpdateEntity('), source.indexOf('public bool IsEntityInTargetGroup'));
  const firstWrite = method.indexOf('EntityManager.AddComponentData');
  assert.ok(method.indexOf('EntityManager.Exists(m_SelectedEntity)') >= 0);
  assert.ok(method.indexOf('EntityManager.Exists(m_SelectedEntity)') < firstWrite);
  assert.ok(method.indexOf('EntityManager.HasComponent<Deleted>(m_SelectedEntity)') < firstWrite);
});
