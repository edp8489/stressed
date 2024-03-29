import {eigs, trace, det, sort, pow, sqrt, abs, max, numeric} from 'mathjs'

// function to calculate Von Mises stress
// https://en.wikipedia.org/wiki/Von_Mises_yield_criterion
function vonMises(stressObj){
    let {s11, s22, s33, s12, s13, s23} = stressObj 

    const A = pow(s11-s22,2)
    const B = pow(s22-s33,2)
    const C = pow(s33-s11,2)
    const D = pow(s12,2) + pow(s23,2) + pow(s13,2)

    const s_vm = sqrt(0.5*(A + B + C) + 3*(D))

    return s_vm
}

// function to format inputs object as a matrix
function toMatrix(stressObj) {
    let {s11, s22, s33, s12, s13, s23} = stressObj

    let S = [[s11, s12, s13],[s12, s22, s23],[s13, s23, s33]]

    return S
}

// function to calculate stress invariants for a given tensor
function invariants(S){
    // https://en.wikipedia.org/wiki/Cauchy_stress_tensor#Principal_stresses_and_stress_invariants
    // S = [3x3] = Cauchy stress tensor
    // I1 = s11 + s22 + s33 = tr(S)
    // I2 = 0.5*((tr(S))^2 - tr(S^2))
    // I3 = det(S)
    let I1 = trace(S)
    let I2 = 0.5*(pow(trace(S),2) - trace(pow(S,2)))
    let I3 = det(S)

    return {I1, I2, I3}
}


// function to calculate principal stresses for a given tensor
function principalStresses(S){
    // (P1, P2, P3) = eig(S)
    let { values, vectors } = eigs(S)
    // eigs() function returns eigenvalues sorted in ascending order
    // need to sort in descending order because P1 > P2 > P3
    values = sort(values, 'desc')
    let P1 = values[0]
    let P2 = values[1]
    let P3 = values[2]
    return {P1, P2, P3}
}

// function to calculate MaxShear stress for a given tensor
function trescaCheck(P1, P2, P3){

    let P1_P2 = abs(P1 - P2)
    let P2_P3 = abs(P2 - P3)
    let P3_P1 = abs(P3 - P1)

    let MaxShear = 0.5*max(P1_P2,P2_P3,P3_P1)

    return({
        P1_P2: P1_P2,
        P2_P3: P2_P3,
        P3_P1: P3_P1,
        MaxShear: MaxShear
    })

}

// function to calculate triaxiality factor
function triaxiality(principalStresses, vonMisesStress){
    let {P1, P2, P3} = principalStresses

    let triaxFactor = ((P1 + P2 + P3)/3)/vonMisesStress

    return triaxFactor
}

export {vonMises, toMatrix, invariants, principalStresses, trescaCheck, triaxiality}