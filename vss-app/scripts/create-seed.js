const fs = require('fs');

const content = fs.readFileSync('c:/Users/Admin/Desktop/my-web/vss-app/public/js/legacy-app.js', 'utf8');
const match = content.match(/const SEED={([\s\S]*?)};\n\n\/\/ ── Init offline DB/);

if (match) {
  let seedStr = 'const SEED={' + match[1] + '};';
  let seedTs = `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

${seedStr}

async function main() {
  for (const item of SEED.areas) { await prisma.area.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.companies) { await prisma.company.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.sites) { await prisma.site.upsert({ where: { id: item.id }, update: item, create: item }); }
  const tpl = SEED.template; await prisma.template.upsert({ where: { id: tpl.id }, update: { name: tpl.name, active: tpl.active }, create: { id: tpl.id, name: tpl.name, active: tpl.active } });
  for (const q of tpl.questions) { await prisma.question.upsert({ where: { id: q.id }, update: { text: q.text, type: q.type, weight: q.weight, templateId: tpl.id }, create: { id: q.id, text: q.text, type: q.type, weight: q.weight, templateId: tpl.id } }); }
  for (const item of SEED.surveys) { await prisma.survey.upsert({ where: { id: item.id }, update: { ...item, answers: JSON.stringify(item.answers) }, create: { ...item, answers: JSON.stringify(item.answers) } }); }
  for (const item of SEED.incidents) { const { actions, ...inc } = item; await prisma.incident.upsert({ where: { id: inc.id }, update: inc, create: inc }); for (const action of actions) { await prisma.action.upsert({ where: { id: action.id }, update: { ...action, incidentId: inc.id }, create: { ...action, incidentId: inc.id } }); } }
  for (const item of SEED.teams) { await prisma.team.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.alarms) { await prisma.alarm.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.dispatches) { await prisma.dispatch.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.guards) { await prisma.guard.upsert({ where: { id: item.id }, update: item, create: item }); }
  for (const item of SEED.users) { await prisma.user.upsert({ where: { id: item.id }, update: item, create: item }); }
  console.log('Seeding done!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
`;

  fs.writeFileSync('c:/Users/Admin/Desktop/my-web/vss-app/prisma/seed.ts', seedTs);
  console.log("Successfully created prisma/seed.ts");
} else {
  console.log('SEED not found');
}
