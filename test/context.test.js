import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseContext } from '../src/context.js';

test('样例领域标识正确', async () => {
  const raw = await readFile(new URL('../fixtures/context.json', import.meta.url), 'utf8');
  const value = parseContext(raw);
  assert.equal(value.domain, 'evidence-custody');
  assert.ok(value.facts.length > 0);
});

test('资料版本与保管链关键事实完整', async () => {
  const raw = await readFile(new URL('../fixtures/context.json', import.meta.url), 'utf8');
  const value = parseContext(raw);
  assert.equal(value.version, 2);
  const text = value.facts.join('\n');
  assert.match(text, /抽样.*不得改变原始查获数量/);
  assert.match(text, /双人确认/);
  assert.match(text, /待复核事件.*不得静默改写当前保管人/);
  assert.match(text, /冷藏.*未知/);
});
