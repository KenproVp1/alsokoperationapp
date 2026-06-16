import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const areas = await prisma.area.findMany();
    const companies = await prisma.company.findMany();
    const sites = await prisma.site.findMany();
    
    const templateRaw = await prisma.template.findFirst({
      include: { questions: true }
    });
    
    const template = templateRaw ? {
      id: templateRaw.id,
      name: templateRaw.name,
      active: templateRaw.active,
      questions: templateRaw.questions.map(q => ({
        id: q.id,
        text: q.text,
        type: q.type,
        weight: q.weight
      }))
    } : null;

    const surveysRaw = await prisma.survey.findMany();
    const surveys = surveysRaw.map(s => ({
      ...s,
      answers: JSON.parse(s.answers)
    }));

    const incidents = await prisma.incident.findMany({
      include: { actions: true }
    });

    const alarms = await prisma.alarm.findMany();
    const teams = await prisma.team.findMany();
    const dispatches = await prisma.dispatch.findMany();
    const guards = await prisma.guard.findMany();
    const users = await prisma.user.findMany();

    return NextResponse.json({
      areas,
      companies,
      sites,
      template,
      surveys,
      incidents,
      alarms,
      teams,
      dispatches,
      guards,
      users
    });
  } catch (error: any) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });
    }

    if (key === 'guards') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.guard.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.guard.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            title: item.title,
            siteId: item.siteId,
            shift: item.shift,
            status: item.status,
            phone: item.phone,
            joined: item.joined,
            cert: !!item.cert
          },
          create: {
            id: item.id,
            name: item.name,
            title: item.title,
            siteId: item.siteId,
            shift: item.shift,
            status: item.status,
            phone: item.phone,
            joined: item.joined,
            cert: !!item.cert
          }
        });
      }
    } else if (key === 'teams') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.team.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.team.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            areaId: item.areaId,
            members: Number(item.members),
            vehicle: item.vehicle,
            status: item.status,
            sla: Number(item.sla),
            activeSite: item.activeSite || null
          },
          create: {
            id: item.id,
            name: item.name,
            areaId: item.areaId,
            members: Number(item.members),
            vehicle: item.vehicle,
            status: item.status,
            sla: Number(item.sla),
            activeSite: item.activeSite || null
          }
        });
      }
    } else if (key === 'dispatches') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.dispatch.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.dispatch.upsert({
          where: { id: item.id },
          update: {
            alarmId: item.alarmId,
            teamId: item.teamId,
            dispatchTime: item.dispatchTime,
            arrivalTime: item.arrivalTime,
            finishTime: item.finishTime,
            result: item.result
          },
          create: {
            id: item.id,
            alarmId: item.alarmId,
            teamId: item.teamId,
            dispatchTime: item.dispatchTime,
            arrivalTime: item.arrivalTime,
            finishTime: item.finishTime,
            result: item.result
          }
        });
      }
    } else if (key === 'alarms') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.alarm.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.alarm.upsert({
          where: { id: item.id },
          update: {
            devId: item.devId,
            siteId: item.siteId,
            cid: item.cid,
            type: item.type,
            cause: item.cause,
            falseAlarm: !!item.falseAlarm,
            startTime: item.startTime,
            receiveTime: item.receiveTime,
            processTime: item.processTime,
            recoveryTime: item.recoveryTime,
            teamId: item.teamId || null,
            status: item.status
          },
          create: {
            id: item.id,
            devId: item.devId,
            siteId: item.siteId,
            cid: item.cid,
            type: item.type,
            cause: item.cause,
            falseAlarm: !!item.falseAlarm,
            startTime: item.startTime,
            receiveTime: item.receiveTime,
            processTime: item.processTime,
            recoveryTime: item.recoveryTime,
            teamId: item.teamId || null,
            status: item.status
          }
        });
      }
    } else if (key === 'companies') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.company.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.company.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            type: item.type,
            sla: item.sla,
            contact: item.contact,
            phone: item.phone,
            areaId: item.areaId
          },
          create: {
            id: item.id,
            name: item.name,
            type: item.type,
            sla: item.sla,
            contact: item.contact,
            phone: item.phone,
            areaId: item.areaId
          }
        });
      }
    } else if (key === 'sites') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.site.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.site.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            cid: item.cid,
            areaId: item.areaId,
            addr: item.addr,
            type: item.type,
            lat: Number(item.lat),
            lng: Number(item.lng),
            budget: Number(item.budget),
            pos: Number(item.pos)
          },
          create: {
            id: item.id,
            name: item.name,
            cid: item.cid,
            areaId: item.areaId,
            addr: item.addr,
            type: item.type,
            lat: Number(item.lat),
            lng: Number(item.lng),
            budget: Number(item.budget),
            pos: Number(item.pos)
          }
        });
      }
    } else if (key === 'incidents') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.action.deleteMany({ where: { incidentId: { notIn: incomingIds } } });
      await prisma.incident.deleteMany({ where: { id: { notIn: incomingIds } } });
      
      for (const item of value) {
        const { actions, ...inc } = item;
        await prisma.incident.upsert({
          where: { id: inc.id },
          update: {
            siteId: inc.siteId,
            areaId: inc.areaId,
            cid: inc.cid,
            type: inc.type,
            sev: Number(inc.sev),
            status: inc.status,
            what: inc.what,
            why: inc.why,
            who: inc.who,
            when: inc.when,
            where: inc.where,
            how: inc.how,
            createdBy: inc.createdBy,
            createdAt: inc.createdAt
          },
          create: {
            id: inc.id,
            siteId: inc.siteId,
            areaId: inc.areaId,
            cid: inc.cid,
            type: inc.type,
            sev: Number(inc.sev),
            status: inc.status,
            what: inc.what,
            why: inc.why,
            who: inc.who,
            when: inc.when,
            where: inc.where,
            how: inc.how,
            createdBy: inc.createdBy,
            createdAt: inc.createdAt
          }
        });
        
        if (actions && Array.isArray(actions)) {
          const actionIds = actions.map((a: any) => a.id);
          await prisma.action.deleteMany({
            where: {
              incidentId: inc.id,
              id: { notIn: actionIds }
            }
          });
          for (const action of actions) {
            await prisma.action.upsert({
              where: { id: action.id },
              update: {
                desc: action.desc,
                resp: action.resp,
                deadline: action.deadline,
                status: action.status,
                incidentId: inc.id
              },
              create: {
                id: action.id,
                desc: action.desc,
                resp: action.resp,
                deadline: action.deadline,
                status: action.status,
                incidentId: inc.id
              }
            });
          }
        }
      }
    } else if (key === 'surveys') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.survey.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.survey.upsert({
          where: { id: item.id },
          update: {
            siteId: item.siteId,
            cid: item.cid,
            evaluator: item.evaluator,
            position: item.position || '',
            period: item.period,
            date: item.date,
            answers: JSON.stringify(item.answers),
            score: Number(item.score),
            risk: item.risk
          },
          create: {
            id: item.id,
            siteId: item.siteId,
            cid: item.cid,
            evaluator: item.evaluator,
            position: item.position || '',
            period: item.period,
            date: item.date,
            answers: JSON.stringify(item.answers),
            score: Number(item.score),
            risk: item.risk
          }
        });
      }
    } else if (key === 'areas') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.area.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.area.upsert({
          where: { id: item.id },
          update: { name: item.name },
          create: { id: item.id, name: item.name }
        });
      }
    } else if (key === 'users') {
      const incomingIds = value.map((x: any) => x.id);
      await prisma.user.deleteMany({ where: { id: { notIn: incomingIds } } });
      for (const item of value) {
        await prisma.user.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            ini: item.ini,
            role: item.role,
            areaId: item.areaId || null,
            col: item.col,
            email: item.email || null,
            clientId: item.clientId || null
          },
          create: {
            id: item.id,
            name: item.name,
            ini: item.ini,
            role: item.role,
            areaId: item.areaId || null,
            col: item.col,
            email: item.email || null,
            clientId: item.clientId || null
          }
        });
      }
    } else {
      return NextResponse.json({ error: `Unsupported key: ${key}` }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
