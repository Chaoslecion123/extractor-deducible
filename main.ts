export const coincidencia_talleres = 'talleres';
export const tipoMultimarca = 'MULTIMARCA';
export const tipoConcesionario = 'CONCESIONARIO';

interface InputPayload {
  text: string;
}

interface InputData {
  payload?: InputPayload;
}

interface Resultado {
  deducible: string | null;
  copago: string | null;
  moneda: string | null;
  tipo: string;
  marca: string;
  taller: string;
}

interface OutputData {
  payload: Resultado[];
}

export function parseDeducibleInfo(input: InputData): OutputData {
  const text = input?.payload?.text ?? "";

  const lines = text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(",")
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const deducibleRegex = /(\d+(?:[\.,]\d+)?)\s*%/;
  const minimoRegex = /mínimo\s*(?:US\$|USD|\$)?\s*(\d+(?:[.,]\d{3})*(?:[.,]\d+)?)/i;
  const monedaRegex = /(US\$|USD|\$)/i;

  const result: Resultado[] = [];

  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    const parrafoTaller = element.toLowerCase().includes(coincidencia_talleres.toLowerCase());

    if (parrafoTaller) {
      const resultObj: Resultado = {
        deducible: null,
        copago: null,
        moneda: null,
        tipo: "NO TIPO",
        marca: "NO MARCA",
        taller: "NO TALLER",
      };

      const buscarEnProximos = (regex: RegExp): string | null => {
        const candidatos = [lines[index], lines[index + 1], lines[index - 1]];
        for (const c of candidatos) {
          if (c && regex.test(c)) {
            const match = c.match(regex);
            if (match && match[1]) return match[1];
          }
        }
        return null;
      };

      const deducible = buscarEnProximos(deducibleRegex);
      const copago = buscarEnProximos(minimoRegex);
      const moneda = buscarEnProximos(monedaRegex);

      resultObj.deducible = deducible ?? "NO DEDUCIBLE";
      resultObj.copago = copago ?? "NO COPAGO";
      resultObj.moneda = moneda ?? "NO MONEDA";

      const textoTaller = element.toUpperCase();
      if (textoTaller.includes(tipoMultimarca)) {
        resultObj.tipo = tipoMultimarca;
      } else if (textoTaller.includes(tipoConcesionario)) {
        resultObj.tipo = tipoConcesionario;
      }

      result.push(resultObj);
    }
  }

  return { payload: result };
}




