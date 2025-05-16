export const CODE_RUC = "04"
export const CODE_CEDULA = "05"
export const CODE_PASSPORT = "06"
export const CODE_FINAL_CONSUMER = "07"
export const CODE_ID_EXTERIOR = "08"
export const CODE_PLACA = "09"


export const CONSUMER_WITH_RUC = { enabled: true, value: CODE_RUC, label: "RUC" }
export const CONSUMER_WITH_ID = { enabled: true, value: CODE_CEDULA, label: "CEDULA" }
export const CONSUMER_WITH_PASSPORT = { enabled: false, value: CODE_PASSPORT, label: "PASAPORTE" }
export const FINAL_CONSUMER = { enabled: true, value: CODE_FINAL_CONSUMER, label: "CONSUMIDOR FINAL", identification: "9999999999999", address: "SN" }
export const CONSUMER_WITH_ID_EXTERIOR = { enabled: false, value: CODE_ID_EXTERIOR, label: "IDENTIFICACIÓN DEL EXTERIOR" }

export const IDENTIFICATION_TYPES = [
    CONSUMER_WITH_ID,
    CONSUMER_WITH_RUC,
    CONSUMER_WITH_PASSPORT,
    CONSUMER_WITH_ID_EXTERIOR,
]
