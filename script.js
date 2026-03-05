// Simulação de dados (não precisa de WebSocket)
let contadores = {Tarefas:5, Metas:3, Projetos:2, Mensagens:4};
let historico = [];

const ctx = document.getElementById('grafico').getContext('2d');
const grafico = new Chart(ctx,{type:'bar',data:{labels:[],datasets:[{label:'Contadores',data:[],backgroundColor:['#4CAF50','#45a049','#8BC34A','#CDDC39']}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
const ctx2 = document.getElementById('graficoLinha').getContext('2d');
const graficoLinha = new Chart(ctx2,{type:'line',data:{labels:[],datasets:[{label:'Linha Contadores',data:[],borderColor:'#4CAF50',tension:0.3,fill:false}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}});
const ctx3 = document.getElementById('graficoDoughnut').getContext('2d');
const graficoDoughnut = new Chart(ctx3,{type:'doughnut',data:{labels:[],datasets:[{data:[],backgroundColor:['#4CAF50','#45a049','#8BC34A','#CDDC39']}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});

function atualizarDashboard(){
  const keys = Object.keys(contadores);
  const vals = Object.values(contadores);
  grafico.data.labels = keys; grafico.data.datasets[0].data = vals; grafico.update();
  graficoLinha.data.labels = keys; graficoLinha.data.datasets[0].data = vals; graficoLinha.update();
  graficoDoughnut.data.labels = keys; graficoDoughnut.data.datasets[0].data = vals; graficoDoughnut.update();
  keys.forEach(key=>{
    document.getElementById('progress'+key).style.width=Math.min((contadores[key]/20)*100,100)+'%';
  });
  const historicoDiv = document.getElementById('historico');
  historicoDiv.innerHTML='<strong>Histórico de Ações:</strong>';
  historico.forEach(h=>{
    const p=document.createElement('p'); p.textContent=h; historicoDiv.appendChild(p);
  });
}

function increment(key){ contadores[key]++; historico.push(`[Incremento] ${key} incrementado`); atualizarDashboard();}
function decrement(key){ if(contadores[key]>0) contadores[key]--; historico.push(`[Decremento] ${key} decrementado`); atualizarDashboard();}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  document.querySelectorAll('.card, #painel, #historico, header').forEach(el=>{
    el.classList.toggle('dark');
  });
});

// Form
const form=document.getElementById('contactForm');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const msg = form[2].value;
  historico.push(`[Mensagem] ${msg}`);
  atualizarDashboard();
  form.reset();
});

atualizarDashboard();