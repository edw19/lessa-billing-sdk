
type TotalImpuesto = {
    codigo: string;
    codigoPorcentaje: number;
    baseImponible: number;
    tarifa: number;
    valor: number;
};

type TotalesFacturaConDetalles = {
    totalSinImpuestos: number;
    totalDescuento: number;
    totalConImpuestos: TotalImpuesto[];
    importeTotal: number;
    detallesCalculados: DetalleCalculado[];
};

type AdditionalInformation = {
    nombre: string;
    valor: string;
}[]

type Detalle = {
    codigoPrincipal: string;
    codigoAuxiliar: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    adicionales?: AdditionalInformation
}

type DetalleCalculado = Detalle & {
    precioTotalSinImpuesto: number;
    impuestos: TotalImpuesto[];
};

type DetalleFactura = Detalle & {
    impuestos: Pick<TotalImpuesto, "codigo" | "codigoPorcentaje" | "tarifa">[]
};
export function calcularTotalesFactura(detalles: DetalleFactura[]): TotalesFacturaConDetalles {
    let totalSinImpuestos = 0;
    let totalDescuento = 0;
    const impuestosMap = new Map<string, TotalImpuesto>();
    const detallesCalculados: DetalleCalculado[] = [];


    for (const detalle of detalles) {
        const subtotal = detalle.cantidad * detalle.precioUnitario;
        const precioTotalSinImpuesto = parseFloat((subtotal - detalle.descuento).toFixed(2));
        totalSinImpuestos += precioTotalSinImpuesto;
        totalDescuento += detalle.descuento;

        const impuestosDet: TotalImpuesto[] = [];

        for (const imp of detalle.impuestos) {
            const key = `${imp.codigo}_${imp.codigoPorcentaje}`;
            const tarifaDecimal = imp.tarifa / 100;
            const valor = parseFloat((precioTotalSinImpuesto * tarifaDecimal).toFixed(2));

            if (!impuestosMap.has(key)) {
                impuestosMap.set(key, {
                    codigo: imp.codigo,
                    codigoPorcentaje: imp.codigoPorcentaje,
                    baseImponible: 0,
                    tarifa: imp.tarifa,
                    valor: 0,
                });
            }
            const totalImp = impuestosMap.get(key)!;
            totalImp.baseImponible += precioTotalSinImpuesto;
            totalImp.valor += valor;

            impuestosDet.push({
                codigo: imp.codigo,
                codigoPorcentaje: imp.codigoPorcentaje,
                tarifa: imp.tarifa,
                baseImponible: precioTotalSinImpuesto,
                valor,
            });
        }

        detallesCalculados.push({
            ...detalle,
            precioTotalSinImpuesto,
            impuestos: impuestosDet,
        });
    }

    const totalConImpuestos = Array.from(impuestosMap.values()).map(t => ({
        ...t,
        baseImponible: parseFloat(t.baseImponible.toFixed(2)),
        valor: parseFloat(t.valor.toFixed(2)),
    }));

    const totalImpuestos = totalConImpuestos.reduce((acc, imp) => acc + imp.valor, 0);
    const importeTotal = parseFloat((totalSinImpuestos + totalImpuestos).toFixed(2));

    return {
        totalSinImpuestos: parseFloat(totalSinImpuestos.toFixed(2)),
        totalDescuento: parseFloat(totalDescuento.toFixed(2)),
        totalConImpuestos,
        importeTotal,
        detallesCalculados
    };
}
