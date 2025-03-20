export enum Plano {
    PRE_PAGO = "PRE",
    POS_PAGO = "POS"
}
interface PlanoValues {
    key: number,
    value: string,
    descricao: string
}
export function getPlanoSpec(plano:Plano):PlanoValues {
    switch (plano){
        case Plano.PRE_PAGO:
        return {key:1,value:"PRE", descricao:"BCB Pré-pago"};
        case Plano.POS_PAGO:
        return {key:2,value:"POS", descricao:"BCB Pós-pago"}
    }
}