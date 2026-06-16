import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const SEED={
  areas:[
    {id:'A01',name:'Hà Nội & miền Bắc'},
    {id:'A02',name:'TP.HCM & miền Nam'},
    {id:'A03',name:'Hải Phòng & miền Trung'},
  ],
  companies:[
    {id:'KH001',name:'Vincom Retail',type:'bv',sla:'premium',contact:'Nguyễn Thành Trung',phone:'024 3974 9999',areaId:'A01'},
    {id:'KH002',name:'Lotte Mart Vietnam',type:'bv',sla:'standard',contact:'Kim Sung-ho',phone:'024 6288 8888',areaId:'A01'},
    {id:'KH003',name:'UNIQLO Vietnam',type:'bd',sla:'premium',contact:'Tanaka Hiroko',phone:'028 3822 7777',areaId:'A02'},
    {id:'KH004',name:'Samsung HSVN',type:'bv',sla:'premium',contact:'Lee Jun-ho',phone:'0222 383 5555',areaId:'A03'},
    {id:'KH005',name:'Aeon Vietnam',type:'bv',sla:'standard',contact:'Suzuki Kenji',phone:'028 3622 6666',areaId:'A02'},
    {id:'KH006',name:'FPT Corporation',type:'bd',sla:'basic',contact:'Phạm Minh Tuấn',phone:'024 7300 7300',areaId:'A01'},
    {id:'KH007',name:'Techcombank',type:'bd',sla:'premium',contact:'Nguyễn Văn Hùng',phone:'024 3944 6699',areaId:'A01'},
  ],
  sites:[
    {id:'MT-01',name:'Vincom Bà Triệu',cid:'KH001',areaId:'A01',addr:'191 Bà Triệu, HBT, HN',type:'bv',lat:21.0157,lng:105.8492,budget:24,pos:8},
    {id:'MT-02',name:'Vincom Đồng Khởi',cid:'KH001',areaId:'A02',addr:'72 Lê Thánh Tôn, Q1, HCM',type:'bv',lat:10.7769,lng:106.7009,budget:30,pos:10},
    {id:'MT-03',name:'Lotte Liễu Giai',cid:'KH002',areaId:'A01',addr:'54 Liễu Giai, Ba Đình, HN',type:'bv',lat:21.0323,lng:105.8198,budget:55,pos:19},
    {id:'MT-04',name:'Samsung Thái Nguyên',cid:'KH004',areaId:'A03',addr:'KCN Yên Bình, Phổ Yên, TN',type:'bv',lat:21.5671,lng:105.8252,budget:120,pos:40},
    {id:'MT-05',name:'FPT Cầu Giấy',cid:'KH006',areaId:'A01',addr:'17 Duy Tân, Cầu Giấy, HN',type:'bd',lat:21.0285,lng:105.7945,budget:12,pos:4},
    {id:'MT-06',name:'Aeon Tân Phú',cid:'KH005',areaId:'A02',addr:'30 Tân Thắng, Tân Phú, HCM',type:'bv',lat:10.7938,lng:106.6268,budget:35,pos:12},
    {id:'MT-07',name:'Aeon Long Biên',cid:'KH005',areaId:'A01',addr:'27 Cổ Linh, Long Biên, HN',type:'bv',lat:21.0388,lng:105.9002,budget:28,pos:10},
    {id:'MT-08',name:'UNIQLO Đồng Khởi',cid:'KH003',areaId:'A02',addr:'70 Lê Lợi, Q1, HCM',type:'bd',lat:10.7784,lng:106.6975,budget:9,pos:3},
    {id:'MT-09',name:'UNIQLO Royal City',cid:'KH003',areaId:'A01',addr:'72A Nguyễn Trãi, Thanh Xuân, HN',type:'bd',lat:21.0028,lng:105.8241,budget:6,pos:2},
    {id:'MT-10',name:'Techcombank HQ',cid:'KH007',areaId:'A01',addr:'191 Bà Triệu, Hai Bà Trưng, HN',type:'bd',lat:21.0168,lng:105.8488,budget:18,pos:6},
  ],
  // 11-question survey template
  template:{
    id:'TPL001',name:'Tiêu chuẩn chất lượng ALSOK VSS',active:true,
    questions:[
      {id:'Q01',text:'Diện mạo, trang phục bảo vệ',type:'likert',weight:1.0},
      {id:'Q02',text:'Thái độ phục vụ, lịch sự chuyên nghiệp',type:'likert',weight:1.5},
      {id:'Q03',text:'Kỹ năng xử lý tình huống phát sinh',type:'likert',weight:1.5},
      {id:'Q04',text:'Kiến thức chuyên môn bảo vệ',type:'likert',weight:1.0},
      {id:'Q05',text:'Tuân thủ nội quy, kỷ luật',type:'likert',weight:1.2},
      {id:'Q06',text:'Hiệu quả kiểm soát ra vào',type:'likert',weight:1.3},
      {id:'Q07',text:'Tốc độ phản ứng khi có sự cố',type:'likert',weight:1.5},
      {id:'Q08',text:'Chất lượng báo cáo và giao tiếp',type:'likert',weight:1.0},
      {id:'Q09',text:'Phối hợp với khách hàng và cư dân',type:'likert',weight:1.2},
      {id:'Q10',text:'Vệ sinh, an toàn khu vực phụ trách',type:'likert',weight:0.8},
      {id:'Q11',text:'Đánh giá tổng thể dịch vụ bảo vệ',type:'likert',weight:1.5},
    ],
  },
  // Survey responses with weighted answers
  surveys:[
    {id:'KS001',siteId:'MT-01',cid:'KH001',evaluator:'Trần Văn A',position:'Giám đốc CSVC',period:'Q1 2026',date:'2026-01-15',answers:[5,4,4,5,5,4,5,4,4,5,4],score:4.32,risk:'low'},
    {id:'KS002',siteId:'MT-01',cid:'KH001',evaluator:'Nguyễn Thị B',position:'Trưởng BP An ninh',period:'Q2 2026',date:'2026-04-10',answers:[4,4,3,4,4,4,4,3,3,4,4],score:3.71,risk:'medium'},
    {id:'KS003',siteId:'MT-03',cid:'KH002',evaluator:'Lê Thị C',position:'Quản lý cơ sở',period:'Q1 2026',date:'2026-01-18',answers:[3,3,3,3,3,3,3,3,3,4,3],score:3.04,risk:'high'},
    {id:'KS004',siteId:'MT-03',cid:'KH002',evaluator:'Lê Thị C',position:'Quản lý cơ sở',period:'Q2 2026',date:'2026-04-11',answers:[2,3,2,3,3,2,3,3,2,3,2],score:2.59,risk:'critical'},
    {id:'KS005',siteId:'MT-04',cid:'KH004',evaluator:'Park Jin',position:'Security Manager',period:'Q1 2026',date:'2026-01-20',answers:[5,5,4,5,5,5,5,4,5,5,5],score:4.81,risk:'low'},
    {id:'KS006',siteId:'MT-04',cid:'KH004',evaluator:'Park Jin',position:'Security Manager',period:'Q2 2026',date:'2026-04-12',answers:[5,5,5,5,5,5,5,5,5,5,5],score:5.00,risk:'low'},
    {id:'KS007',siteId:'MT-06',cid:'KH005',evaluator:'Trần Minh D',position:'Trưởng BP',period:'Q2 2026',date:'2026-04-13',answers:[4,4,4,4,4,4,4,4,4,4,4],score:4.00,risk:'medium'},
    {id:'KS008',siteId:'MT-07',cid:'KH005',evaluator:'Phạm Thị E',position:'Quản lý',period:'Q2 2026',date:'2026-04-14',answers:[4,3,3,4,4,3,3,3,3,4,3],score:3.32,risk:'high'},
    {id:'KS009',siteId:'MT-08',cid:'KH003',evaluator:'Tanaka Hiroko',position:'Store Manager',period:'Q1 2026',date:'2026-03-15',answers:[5,5,5,5,5,5,5,5,5,5,5],score:5.00,risk:'low'},
    {id:'KS010',siteId:'MT-05',cid:'KH006',evaluator:'Phạm Văn F',position:'IT Manager',period:'Q1 2026',date:'2026-02-20',answers:[3,3,2,3,3,3,3,2,3,3,3],score:2.88,risk:'critical'},
  ],
  // 5W1H Incidents
  incidents:[
    {id:'SC001',siteId:'MT-07',areaId:'A01',cid:'KH005',type:'violation',sev:3,status:'processing',
     what:'Bảo vệ ngủ gật trong ca trực đêm',why:'Tăng ca liên tục 3 ngày, thiếu người thay ca',who:'BV Hoàng Văn Long (BV006)',when:'2026-05-25 02:20',where:'Bãi đỗ xe B1 tòa nhà',how:'Camera ghi nhận, quản lý xác nhận',createdBy:'Trần Hải Nam',createdAt:'2026-05-25',actions:[{id:'AC001',desc:'Bổ sung ca trực thay thế ngay',resp:'QL Vùng HN',deadline:'2026-05-26',status:'done'},{id:'AC002',desc:'Họp kiểm điểm và lập biên bản',resp:'Trưởng BV',deadline:'2026-05-27',status:'open'}]},
    {id:'SC002',siteId:'MT-03',areaId:'A01',cid:'KH002',type:'complaint',sev:4,status:'open',
     what:'Khách hàng phàn nàn bảo vệ thái độ không chuyên nghiệp',why:'Thiếu kỹ năng giao tiếp, chưa được đào tạo đúng',who:'BV Nguyễn Văn Hùng (BV001)',when:'2026-05-22 10:15',where:'Cổng chính Lotte Liễu Giai',how:'Email khiếu nại từ Ban quản lý Lotte',createdBy:'Lê Thu Hương',createdAt:'2026-05-22',actions:[{id:'AC003',desc:'Xin lỗi khách hàng chính thức',resp:'GĐ Nghiệp vụ',deadline:'2026-05-24',status:'done'},{id:'AC004',desc:'Đào tạo bổ sung kỹ năng giao tiếp',resp:'Đào tạo',deadline:'2026-06-01',status:'open'}]},
    {id:'SC003',siteId:'MT-01',areaId:'A01',cid:'KH001',type:'good',sev:1,status:'closed',
     what:'Bảo vệ phát hiện và xử lý cháy nổ kịp thời',why:'N/A - Việc tốt',who:'BV Lê Thị Hoa (BV003)',when:'2026-05-18 15:42',where:'Tầng 3 tòa nhà Vincom Bà Triệu',how:'Phát hiện khói, sử dụng bình CO2, sơ tán 20 người',createdBy:'Nguyễn Văn Minh',createdAt:'2026-05-19',actions:[]},
    {id:'SC004',siteId:'MT-10',areaId:'A01',cid:'KH007',type:'violation',sev:5,status:'open',
     what:'Bảo vệ không kiểm tra thẻ xe dẫn đến xe không phép vào',why:'Áp lực khách đông, bỏ qua quy trình',who:'BV Vũ Thị Thu (BV008)',when:'2026-05-20 21:30',where:'Bãi đỗ xe tầng hầm B2',how:'Camera ghi hình, bảo vệ thừa nhận',createdBy:'Trần Hải Nam',createdAt:'2026-05-20',actions:[{id:'AC005',desc:'Nhắc nhở và ký cam kết',resp:'Chỉ huy BV',deadline:'2026-05-22',status:'done'}]},
    {id:'SC005',siteId:'MT-05',areaId:'A01',cid:'KH006',type:'complaint',sev:3,status:'processing',
     what:'Phàn nàn hệ thống báo động kích hoạt giả',why:'Cài đặt ngưỡng cảm biến không phù hợp',who:'Kỹ thuật thiết bị',when:'2026-05-15 09:00',where:'Văn phòng FPT tầng 5',how:'Hệ thống PCCC kích hoạt 3 lần trong 1 tuần',createdBy:'Phạm Quốc Tuấn',createdAt:'2026-05-15',actions:[{id:'AC006',desc:'Điều chỉnh ngưỡng cảm biến',resp:'KT Thiết bị',deadline:'2026-05-18',status:'done'},{id:'AC007',desc:'Kiểm tra lại toàn bộ hệ thống',resp:'KT Thiết bị',deadline:'2026-05-25',status:'open'}]},
  ],
  // Alarms with timestamps for MTTA/MTTR
  alarms:[
    {id:'AL001',devId:'dev-04',siteId:'MT-10',cid:'KH007',type:'Motion Detection',cause:'person',falseAlarm:false,startTime:'2026-05-26 05:23',receiveTime:'2026-05-26 05:26',processTime:'2026-05-26 05:31',recoveryTime:'2026-05-26 06:45',teamId:'QRT-HN01',status:'resolved'},
    {id:'AL002',devId:'dev-01',siteId:'MT-03',cid:'KH002',type:'Motion Detection',cause:'animal',falseAlarm:true,startTime:'2026-05-25 14:47',receiveTime:'2026-05-25 14:52',processTime:'2026-05-25 14:58',recoveryTime:'2026-05-25 15:10',teamId:null,status:'false_alarm'},
    {id:'AL003',devId:'dev-05',siteId:'MT-06',cid:'KH005',type:'Glass Break',cause:'person',falseAlarm:false,startTime:'2026-05-24 22:15',receiveTime:'2026-05-24 22:18',processTime:'2026-05-24 22:24',recoveryTime:'2026-05-24 23:30',teamId:'QRT-HCM01',status:'resolved'},
    {id:'AL004',devId:'dev-ug01',siteId:'MT-08',cid:'KH003',type:'EAS Gate',cause:'customer_error',falseAlarm:true,startTime:'2026-05-24 18:30',receiveTime:'2026-05-24 18:33',processTime:'2026-05-24 18:35',recoveryTime:'2026-05-24 18:40',teamId:null,status:'false_alarm'},
    {id:'AL005',devId:'dev-03',siteId:'MT-10',cid:'KH007',type:'Panic Button',cause:'person',falseAlarm:false,startTime:'2026-05-23 09:45',receiveTime:'2026-05-23 09:47',processTime:'2026-05-23 09:52',recoveryTime:'2026-05-23 11:00',teamId:'QRT-HN01',status:'resolved'},
    {id:'AL006',devId:'dev-02',siteId:'MT-03',cid:'KH002',type:'Door Sensor',cause:'device_error',falseAlarm:true,startTime:'2026-05-22 23:10',receiveTime:'2026-05-22 23:16',processTime:'2026-05-22 23:22',recoveryTime:'2026-05-22 23:45',teamId:null,status:'false_alarm'},
    {id:'AL007',devId:'dev-06',siteId:'MT-06',cid:'KH005',type:'Motion Detection',cause:'staff',falseAlarm:true,startTime:'2026-05-21 03:00',receiveTime:'2026-05-21 03:04',processTime:'2026-05-21 03:08',recoveryTime:'2026-05-21 03:20',teamId:null,status:'false_alarm'},
    {id:'AL008',devId:'dev-ug03',siteId:'MT-09',cid:'KH003',type:'Motion Detection',cause:'person',falseAlarm:false,startTime:'2026-05-20 01:15',receiveTime:'2026-05-20 01:18',processTime:'2026-05-20 01:24',recoveryTime:'2026-05-20 02:30',teamId:'QRT-HN01',status:'resolved'},
  ],
  teams:[
    {id:'QRT-HN01',name:'Đội QRT Hà Nội 01',areaId:'A01',members:4,vehicle:'Ford Ranger D201',status:'ready',sla:15},
    {id:'QRT-HN02',name:'Đội QRT Hà Nội 02',areaId:'A01',members:3,vehicle:'Toyota Hilux D202',status:'deployed',sla:15,activeSite:'MT-07'},
    {id:'QRT-HCM01',name:'Đội QRT TP.HCM 01',areaId:'A02',members:4,vehicle:'Ford Ranger D301',status:'ready',sla:20},
    {id:'QRT-HP01',name:'Đội QRT Hải Phòng',areaId:'A03',members:3,vehicle:'Toyota Hilux D401',status:'ready',sla:25},
  ],
  dispatches:[
    {id:'DC001',alarmId:'AL001',teamId:'QRT-HN01',dispatchTime:'2026-05-26 05:31',arrivalTime:'2026-05-26 05:43',finishTime:'2026-05-26 06:45',result:'Đã xử lý người đột nhập, bàn giao cảnh sát'},
    {id:'DC002',alarmId:'AL003',teamId:'QRT-HCM01',dispatchTime:'2026-05-24 22:24',arrivalTime:'2026-05-24 22:41',finishTime:'2026-05-24 23:30',result:'Cửa kính nứt, phát hiện do sức gió mạnh'},
    {id:'DC003',alarmId:'AL005',teamId:'QRT-HN01',dispatchTime:'2026-05-23 09:52',arrivalTime:'2026-05-23 10:05',finishTime:'2026-05-23 11:00',result:'Hỗ trợ bảo vệ tại chỗ, trường hợp tranh chấp'},
    {id:'DC004',alarmId:'AL008',teamId:'QRT-HN01',dispatchTime:'2026-05-20 01:24',arrivalTime:'2026-05-20 01:38',finishTime:'2026-05-20 02:30',result:'Phát hiện đột nhập, đã bắt và bàn giao CA'},
  ],
  guards:[
    {id:'BV001',name:'Nguyễn Văn Hùng',title:'Trưởng ca',siteId:'MT-03',shift:'Ca A',status:'online',phone:'0901 234 567',joined:'2021-03-15',cert:true},
    {id:'BV002',name:'Trần Minh Khoa',title:'Bảo vệ',siteId:'MT-07',shift:'Ca A',status:'online',phone:'0912 345 678',joined:'2022-06-01',cert:true},
    {id:'BV003',name:'Lê Thị Hoa',title:'Bảo vệ',siteId:'MT-01',shift:'Ca B',status:'offline',phone:'0923 456 789',joined:'2020-11-20',cert:false},
    {id:'BV004',name:'Phạm Đức Thắng',title:'Bảo vệ',siteId:'MT-10',shift:'Ca B',status:'online',phone:'0934 567 890',joined:'2023-01-10',cert:true},
    {id:'BV005',name:'Nguyễn Thị Mai',title:'Bảo vệ',siteId:'MT-06',shift:'Ca C',status:'online',phone:'0945 678 901',joined:'2022-08-15',cert:true},
    {id:'BV006',name:'Hoàng Văn Long',title:'Phó ca',siteId:'MT-07',shift:'Ca C',status:'offline',phone:'0956 789 012',joined:'2021-05-20',cert:true},
    {id:'BV007',name:'Đinh Quang Hải',title:'Bảo vệ',siteId:'MT-01',shift:'Ca A',status:'online',phone:'0967 890 123',joined:'2023-03-01',cert:false},
    {id:'BV008',name:'Vũ Thị Thu',title:'Bảo vệ',siteId:'MT-10',shift:'Ca B',status:'alert',phone:'0978 901 234',joined:'2022-12-10',cert:true},
  ],
  users:[
    {id:'U001',name:'Nguyễn Văn Minh',ini:'VM',role:'director',areaId:null,col:'#dc2626',email:'vm@alsok.com.vn'},
    {id:'U002',name:'Trần Hải Nam',ini:'HN',role:'rgm',areaId:'A01',col:'#1d4ed8',email:'hn@alsok.com.vn'},
    {id:'U003',name:'Lê Thu Hương',ini:'TH',role:'rgm',areaId:'A02',col:'#1d4ed8',email:'th@alsok.com.vn'},
    {id:'U004',name:'Phạm Quốc Tuấn',ini:'QT',role:'ops',areaId:null,col:'#059669',email:'qt@alsok.com.vn'},
    {id:'U005',name:'Vincom Retail (KH)',ini:'VC',role:'client',clientId:'KH001',col:'#7c3aed'},
  ],
};

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
