export default function minValue(arr: number[]): number {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

export function maxValue(arr: number[]): number {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

export function minValue2(arr: number[]): number {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}

export function decompose(n: number): number[] {
    const factors: number[] = [];
    let divisor = 2;

    while (n > 1) {
        while (n % divisor === 0) {
            factors.push(divisor);
            n = n / divisor;
        }
        divisor++;
    }

    return factors;
}
