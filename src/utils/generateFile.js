// Função para preencher os Mnemônicos e retornar a URL para download do arquivo CSV
// export default async function fillMnemonicos() {
//   try {
//     const responsePrincipal = await fetch('mapa_gmp_extendido_v5_1_dnp_1d2f0fe1c756.csv');
//     const responsePlanilha1 = await fetch('mapa_gmp_extendido_v5.csv');

//     const csvPrincipal = await responsePrincipal.text();
//     const csvPlanilha1 = await responsePlanilha1.text();

//     const mapaPrincipal = parseCSV(csvPrincipal);
//     const planilha1 = parseCSV(csvPlanilha1);

//     for (let i = 0; i < mapaPrincipal.length; i++) {
//       const uidPrincipal = mapaPrincipal[i].UID;
//       const mnemonicoPrincipal = mapaPrincipal[i]['Mnemônico'];

//       const registroPlanilha1 = planilha1.find((row) => row.UID === uidPrincipal);

//       if (registroPlanilha1) {
//         mapaPrincipal[i]['Mnemônico'] = registroPlanilha1['Mnemônico'];
//         console.log(`Mnemônico preenchido com sucesso: ${mnemonicoPrincipal} -> ${registroPlanilha1['Mnemônico']}`);
//       }
//     }

//     const csvData = convertToCSV(mapaPrincipal);
//     const csvBlob = new Blob([csvData], { type: 'text/csv' });
//     const csvURL = URL.createObjectURL(csvBlob);

//     console.log('Arquivo "Mapa_Mnemônico_preenchido.csv" criado com sucesso!');
//     console.log('URL para download:', csvURL);

//     return csvURL;
//   } catch (error) {
//     console.error('Erro ao preencher os Mnemônicos:', error);
//     return null;
//   }
// }

// // Função auxiliar para converter o CSV em um array de objetos
// function parseCSV(csv) {
//   const lines = csv.split('\n');
//   const headers = lines[0].split(';').map((header) => header.trim());

//   const data = [];
//   for (let i = 1; i < lines.length; i++) {
//     const values = lines[i].split(';').map((value) => value.trim());
//     if (values.length !== headers.length) continue;

//     const obj = {};
//     for (let j = 0; j < headers.length; j++) {
//       obj[headers[j]] = values[j];
//     }
//     data.push(obj);
//   }
//   return data;
// }

// // Função auxiliar para converter o array de objetos em CSV
// function convertToCSV(data) {
//   const headers = Object.keys(data[0]);
//   const rows = data.map((obj) => headers.map((header) => obj[header] || '').join(';'));
//   return [headers.join(';'), ...rows].join('\n');
// }

export default function readCSV(file) {
  d3.csv(file, (data) => console.log(data))
}
