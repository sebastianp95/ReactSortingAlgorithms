export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) {
        // console.log('EQUAL INDEX start:', startIdx, 'end: ', endIdx);
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    // console.log('bfore first loop: start: ', startIdx, 'end: ', endIdx);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // change their color and revert to normal.
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite the value at index k in the original array with the
            // value at index i.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrite the value at index k in the original array with the
            // value at index j.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    // left Array
    while (i <= middleIdx) {
        // change their color and revert to normal.
        animations.push([i, i]);
        animations.push([i, i]);

        // Overwrite the value at index k in the original array with the
        // value at index i.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    // Right Array
    while (j <= endIdx) {
        // change their color and revert to normal.
        animations.push([j, j]);
        animations.push([j, j]);

        // Overwrite the value at index k in the original array with the
        // value at index j.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    array.forEach(element => {
        console.log(element)
    });

    return animations;
}

function quickSortHelper(
    mainArray,
    startIdx,
    endIdx,
    animations,
) {
    if (startIdx < endIdx) {


        /* pi is partitioning index, arr[pi] is  
          now at right place */
        let pi = partition(mainArray, startIdx, endIdx, animations);


        quickSortHelper(mainArray, startIdx, pi - 1, animations);
        quickSortHelper(mainArray, pi + 1, endIdx, animations);
    }
} 


function partition(arr, low, high, animations) {
    let pivot = arr[high]; // pivot  
    let i = (low - 1); // Index of smaller element  
    let j = low;
    console.log('index ', j, ' pivot ', pivot)
    // animations.push([pivot]);
    animations.push([low, high]);
    animations.push([low, high]);
    for (j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot  
        if (arr[j] < pivot) {
            i++; // increment index of smaller element  
            let temp = arr[i];
            // animations.push(pi);

            // animations.push([j, temp]);
            // animations.push([j, temp]);
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i + 1];
    // animations.push([i, temp]);
    // animations.push([i, temp]);
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}
// function quickSortHelper(
//     mainArray,
//     startIdx,
//     endIdx,
//     animations,
// ) {
//     if (startIdx === endIdx) {
//         // console.log('EQUAL INDEX start:', startIdx, 'end: ', endIdx);
//         return;
//     }
//     let pivot = startIdx,
//         left = startIdx + 1,
//         right = endIdx;

//     //   toDispatch.push(pivot);
//     //   toDispatch.push([left, right]);

//     // animations.push(pivot);
//     // animations.push([left, right]);

//     while (right >= left) {
//         if (mainArray[right] < mainArray[pivot] && mainArray[left] > mainArray[pivot]) {
//             // animations.push([left, right, true]);
//             let temp = mainArray[right];
//             mainArray[right] = mainArray[left];
//             mainArray[left] = temp;
//             // animations.push(mainArray.slice(0));
//             // animations.push([]);
//         }
//         if (mainArray[right] >= mainArray[pivot]) {
//             right--;
//         }
//         if (mainArray[left] <= mainArray[pivot]) {
//             left++;
//         }
//         if (right >= left) animations.push([left, right]);
//     }
//     // animations.push([pivot, right]);
//     if (pivot !== right) {
//         let temp = mainArray[right];
//         mainArray[right] = mainArray[pivot];
//         mainArray[pivot] = temp;
//         // animations.push([pivot, right, true]);
//         // animations.push(mainArray.slice(0));
//         // animations.push([]);
//         // animations.push([true, right]);
//     }

//     // const middleIdx = Math.floor((startIdx + endIdx) / 2);
//     // quickSortHelper(mainArray, startIdx, middleIdx,  animations);
//     // quickSortHelper(mainArray, middleIdx + 1, endIdx,  animations);

//     quickSortHelper(mainArray, startIdx, right - 1, animations);
//     quickSortHelper(mainArray, right + 1, endIdx, animations);


//     // doMerge(mainArray, startIdx, middleIdx, endIdx, animations);
// }
