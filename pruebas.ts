import { parseDeducibleInfo } from "./main";

const testCases = [
  {
    id: 1,
    text: `(No Inclueye I.G.V.)
Por evento 10% del monto a indemnizar, mínimo US$200.00
Excepto para:
Robo Parcial 10% del monto a indemnizar, mínimo US$150.00
Siniestros atendidos en talleres preferenciales 10% del monto a indemnizar, mínimo US$150.00
Robo de accesorios Musicales 10% del monto a indemnizar, mínimo 150.00
Responsabilidad civil 10% del monto a indemnizar, mínimo 150.00
Robo total solo se aseguran con GPS obligatorio hasta el segundo año de antigüedad, sin coaseguro. Tercer año, coaseguro 80/20`,
  },
  {
    id: 2,
    text: `*Los siniestros, serán atendidos únicamente en la relación de talleres especiales descritos en la cláusula  VEHA07
20% del monto indemnizable, mínimo US$ 200 
20% del monto indemnizable para pérdida total`,
  },
  {
    id: 3,
    text: `* Por Evento 15% del monto del siniestro, mínimo US$ 150.00 en Talleres Afiliados Multimarca
 * Por Evento 15% del monto del siniestro, mínimo US$ 250.00 en Talleres Afiliados`,
  },
  {
    id: 4,
    text: `- Ausencia de control: 25.00% del monto indemnizar, mínimo US$ 500.00 (Talleres Afiliados).
- Ausencia de control: 25.00% del monto indemnizar, mínimo US$ 300.00 (Talleres Afiliados Multimarca).
-Pérdida total por ausencia de control: 25.00% del monto a i`,
  },
  {
    id: 5,
    text: `. 20% del monto a indemnizar, mínimo US$ 250.00, para todo y cada evento, en talleres afiliados
20% del monto a indemnizar, mínimo US$ 200.00, para todo y cada evento, en talleres afiliados multimarca
Pérdida Total, Incendio, Robo Total:  20% del monto del siniestro
Conductor varón menor  de 25 años, 25% del monto del siniestro mínimo US$ 300, para todo y cada evento
Rotura de lunas, solo para reposición de lunas nacionales sin deducible
Vías no autorizadas 25% del monto a indemnizar, mínimo US$ 300.00, para todo y cada evento`,
  },
  {
    id: 6,
    text: `10% del monto del siniestro, minimo US$ 500.00 en Talleres Nissan Maquinarias	
10% del monto del siniestro, minimo US$ 700.00 en Otros Talleres 	
En caso de discrepancia prevalece el mayor. No incluye I.G.V.`,
  },
  {
    id: 7,
    text: `Por evento 15.00% del monto a indemnizar, mínimo US$ 150.00, en talleres afiliados
Siniestros atendidos en red de talleres afiliados multimarca  10.00% del monto a indemnizar, mínimo US$ 150.00
Robo Parcial 15% del monto a indemnizar, mínimo US$ 150.00
Accesorios musicales 10.00% del monto a indemnizar, mínimo US$ 150.00
Hyundai Tucson, Santa Fe: coaseguro por Robo Total (nuevos y hasta 2 años de antigüedad) 20%. Si el vehículo cuenta con GPS, se excluirá el coaseguro.
Por evento, Marca Mercedes Benz, BMW, Audi, Porsche Cayenne: 15% del monto a indemnizar, mínimo US$ 200.00 en talleres afiliados
Por evento, Marca Mercedes Benz, BMW, Audi, Porsche Cayenne: 10% del monto a indemnizar, mínimo US$ 150.00 en talleres afiliados multimarca
Marca Mercedes Benz, BMW, Audi, Porsche Cayenne
Mayores a US$ 75,000 hasta US$ 100,000: 15% del monto a indemnizar, mínimo US$ 1,500 para daños por hueco o daños por despiste contra sardineles por llantas Runflat
Menores a US$ 75,000: 15% del monto a indemnizar, mínimo US$ 800.00 para daños por hueco o daños por despiste contra sardineles por llantas Runflat
Reposición de lunas nacionales, sin deducible`,
  },
];

for (const test of testCases) {
  console.log(`\n Caso ${test.id}:`);
  const result = parseDeducibleInfo({ payload: { text: test.text } });
  console.log(JSON.stringify(result, null, 2));
}
