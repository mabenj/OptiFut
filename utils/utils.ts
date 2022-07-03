import { AbstractFormation } from "../optimizer/formations/AbstractFormation";
import { PosModInfo } from "../optimizer/types/pos-mod-info.interface";

//https://stackoverflow.com/a/37580979
export function* permute<T>(permutation: T[]) {
    const length = permutation.length;
    const c = Array(length).fill(0);
    let i = 1;
    let k;
    let p;

    yield permutation.slice();
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            yield permutation.slice();
        } else {
            c[i] = 0;
            ++i;
        }
    }
}

//https://stackoverflow.com/a/2450976
export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ];
    }
    return array;
}

export function choice<T>(options: T[]): T {
    if (options.length === 0) {
        throw new Error("No options provided");
    }
    return shuffle(options)[0];
}

/**
 *
 * @param a First formation
 * @param b Second formation
 * @returns -1 if first is worse than second, 1 if first is better than second, 0 if equal
 */
export function compareFormations<T>(
    a: AbstractFormation<T>,
    b: AbstractFormation<T>
) {
    const chemA = a.calculateChemistry();
    const chemB = b.calculateChemistry();

    if (chemA.totalChemistry < chemB.totalChemistry) {
        return -1;
    }
    if (chemA.totalChemistry > chemB.totalChemistry) {
        return 1;
    }

    if (chemA.offChemPlayers.length > chemB.offChemPlayers.length) {
        return -1;
    }
    if (chemA.offChemPlayers.length < chemB.offChemPlayers.length) {
        return 1;
    }

    const posModsA = getPosModCount(chemA.posModdedPlayers);
    const posModsB = getPosModCount(chemB.posModdedPlayers);
    if (posModsA > posModsB) {
        return -1;
    }
    if (posModsA < posModsB) {
        return 1;
    }

    return 0;
}

export function getPosModCount(posMods: PosModInfo[]) {
    return posMods.reduce((acc, curr) => acc + curr.count, 0);
}

export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(start: number, stop: number, step: number = 1): number[] {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
}
