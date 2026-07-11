import { breakdown, categoryFromScore, exposureScore, parseTasks, validateAnalysis, verdict } from '../lib/scoring';
import { ROLE_PRESETS } from '../lib/roles';
import type { TaskAnalysis } from '../lib/types';

let passed = 0;
let failed = 0;

function assert(cond: boolean, label: string) {
  if (cond) passed++;
  else {
    failed++;
    console.error(`  FAIL: ${label}`);
  }
}

console.log('parseTasks');
{
  const tasks = parseTasks('- screen resumes\n2) schedule interviews\n• write JDs\n\nshort\nx');
  assert(tasks.length === 4, `strips bullets/numbering, drops <3-char lines — got ${tasks.length}`);
  assert(tasks[0] === 'screen resumes', 'bullet stripped');
  assert(tasks[1] === 'schedule interviews', 'numbering stripped');
  const many = parseTasks(Array.from({ length: 30 }, (_, i) => `task number ${i}`).join('\n'));
  assert(many.length === 20, 'caps at 20 tasks');
}

console.log('scoring');
{
  const tasks: TaskAnalysis[] = [
    { task: 'a', automatability: 90, category: 'automate', why: '', learn: '' },
    { task: 'b', automatability: 50, category: 'copilot', why: '', learn: '' },
    { task: 'c', automatability: 10, category: 'moat', why: '', learn: '' },
  ];
  assert(exposureScore(tasks) === 50, 'mean automatability');
  assert(exposureScore([]) === 0, 'empty → 0');
  const b = breakdown(tasks);
  assert(b.automate === 1 && b.copilot === 1 && b.moat === 1, 'breakdown counts');
  assert(verdict(80).band === 'critical', '80 → critical');
  assert(verdict(60).band === 'high', '60 → high');
  assert(verdict(40).band === 'moderate', '40 → moderate');
  assert(verdict(20).band === 'low', '20 → low');
  assert(categoryFromScore(75) === 'automate' && categoryFromScore(50) === 'copilot' && categoryFromScore(20) === 'moat', 'category thresholds');
}

console.log('role presets');
{
  assert(ROLE_PRESETS.length >= 8, `at least 8 presets — got ${ROLE_PRESETS.length}`);
  for (const r of ROLE_PRESETS) {
    assert(validateAnalysis(r), `${r.slug} passes validation`);
    assert(r.tasks.length >= 6, `${r.slug} has ≥6 tasks`);
    assert(r.learnPriorities.length === 3, `${r.slug} has 3 learn priorities`);
    const score = exposureScore(r.tasks);
    assert(score > 20 && score < 90, `${r.slug} score in sane band (${score})`);
    for (const t of r.tasks) {
      const consistent =
        (t.category === 'automate' && t.automatability >= 70) ||
        (t.category === 'copilot' && t.automatability >= 35 && t.automatability <= 84) ||
        (t.category === 'moat' && t.automatability <= 40);
      assert(consistent, `${r.slug} / "${t.task}" category matches score (${t.automatability}, ${t.category})`);
    }
  }
  const slugs = new Set(ROLE_PRESETS.map((r) => r.slug));
  assert(slugs.size === ROLE_PRESETS.length, 'slugs unique');
}

console.log('validateAnalysis');
{
  assert(!validateAnalysis(null), 'rejects null');
  assert(!validateAnalysis({ role: 'x', summary: 'y', tasks: [] }), 'rejects empty tasks');
  assert(
    !validateAnalysis({
      role: 'x',
      summary: 'y',
      tasks: [{ task: 'a', automatability: 150, category: 'automate', why: '', learn: '' }],
    }),
    'rejects out-of-range score'
  );
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
