const puppeteer = require('puppeteer'); // importa o puppeteer
const readlineSync = require('readline-sync'); // importa o readline-sync


console.log('Bem vindo ao Bot conversor 🤖💰');



async function robo() {
  const browser = await puppeteer.launch({ headless: true }); // headless: true = sem abrir o navegador
  const page = await browser.newPage(); // abre uma nova aba
  const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar'; // questiona ao usuário qual moeda ele quer de base, se não informar nada, o padrão será dolar
  const moedaFinal = readlineSync.question('Informe uma moeda desejada:') || 'real'; // questiona ao usuário qual moeda ele quer convertida, se não informar nada, o padrão será real

  const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&aqs=chrome.0.69i59j0l7.1726j0j4&sourceid=chrome&ie=UTF-8`; // url que será aberta no navegador
  await page.goto(qualquerUrl); // abre a url no navegador
  // await page.screenshot({path: 'example.png'}); // tira um print da tela

  const resultado = await page.evaluate(() => { // pega o resultado da conversão
    return document.querySelector('.lWzCpb.a61j6').value; // pega o valor do elemento com a classe .lWzCpb.a61j6
  });

  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`) // exibe o resultado
  await browser.close(); // fecha o navegador
}

robo(); 