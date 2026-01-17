let lavagens = JSON.parse(localStorage.getItem("lavagens")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];

const carros = document.getElementById("carros");
const faturamento = document.getElementById("faturamento");
const despesasSpan = document.getElementById("despesas");
const lucro = document.getElementById("lucro");
const filtro = document.getElementById("filtro");
const listaLavagens = document.getElementById("listaLavagens");
const listaDespesas = document.getElementById("listaDespesas");

filtro.addEventListener("change", atualizarDashboard);

function hoje(d){
  const h = new Date();
  return d.toDateString() === h.toDateString();
}

function mes(d){
  const h = new Date();
  return d.getMonth() === h.getMonth() &&
         d.getFullYear() === h.getFullYear();
}

function registrarLavagem(){
  const v = Number(document.getElementById("valorLavagem").value);
  if(v <= 0) return;

  lavagens.push({ valor: v, data: new Date() });
  localStorage.setItem("lavagens", JSON.stringify(lavagens));
  document.getElementById("valorLavagem").value = "";
  atualizarDashboard();
}

function registrarDespesa(){
  const v = Number(document.getElementById("valorDespesa").value);
  if(v <= 0) return;

  despesas.push({ valor: v, data: new Date() });
  localStorage.setItem("despesas", JSON.stringify(despesas));
  document.getElementById("valorDespesa").value = "";
  atualizarDashboard();
}

function atualizarDashboard(){
  const f = filtro.value;

  const l = lavagens.filter(x=>{
    const d = new Date(x.data);
    if(f === "hoje") return hoje(d);
    if(f === "mes") return mes(d);
    return true;
  });

  const dps = despesas.filter(x=>{
    const d = new Date(x.data);
    if(f === "hoje") return hoje(d);
    if(f === "mes") return mes(d);
    return true;
  });

  carros.innerText = l.length;

  let fat = 0;
  l.forEach(x => fat += x.valor);

  let dep = 0;
  dps.forEach(x => dep += x.valor);

  faturamento.innerText = fat;
  despesasSpan.innerText = dep;
  lucro.innerText = fat - dep;

  listaLavagens.innerHTML = "";
  l.forEach(x=>{
    listaLavagens.innerHTML += `<li>R$ ${x.valor}</li>`;
  });

  listaDespesas.innerHTML = "";
  dps.forEach(x=>{
    listaDespesas.innerHTML += `<li>R$ ${x.valor}</li>`;
  });
}

function apagarTudo(){
  if(!confirm("Apagar tudo?")) return;
  lavagens = [];
  despesas = [];
  localStorage.clear();
  atualizarDashboard();
}

atualizarDashboard();