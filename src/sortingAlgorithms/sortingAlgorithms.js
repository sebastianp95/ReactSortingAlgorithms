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

        let pi = partition(mainArray, startIdx, endIdx, animations);

        quickSortHelper(mainArray, startIdx, pi - 1, animations);
        quickSortHelper(mainArray, pi + 1, endIdx, animations);
    }
}


function partition(arr, low, high, animations) {
    let pivotValue = arr[high]; // pivot  
    let pivotIndex = low;

    // console.log('index ', j, ' pivot ', pivotValue)
    for (let i = low; i < high; i++) {

        if (arr[i] < pivotValue) {

            animations.push([i, high]);
            animations.push([i, high]);
            swap(arr, i, pivotIndex, animations);
            pivotIndex++;
        }
    }

    animations.push([pivotIndex, high]);
    animations.push([pivotIndex, high]);
    swap(arr, pivotIndex, high, animations);

    return pivotIndex;
}

function swap(arr, a, b, animations) {

    // animations.push([a, b]);
    // animations.push([a, b]);

    animations.push([a, arr[b]]);

    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    animations.push([b, a]);
    animations.push([b, a]);
    animations.push([b, temp]);


}

export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;

    heapSortHelper(array, array.length, animations);

    animations.forEach(element => {
        console.log(element)
    });
    return animations;
}

function heapSortHelper(arr, n, animations) {
    
    // Build heap (rearrange array) 
    for (let i = n / 2 - 1; i >= 0; i--) {

        heapify(arr, n, i, animations);
    }

    // One by one extract an element from heap 
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end 
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([i, arr[0]]);

        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        animations.push([i-1, i-1]);
        animations.push([i-1, i-1]);
        animations.push([i-1, temp]);
        // call max heapify on the reduced heap 
        heapify(arr, i, 0, animations);
     
    }

}
function heapify(arr, n, i, animations) {
    let largest = i; // Initialize largest as root 
    let l = 2 * i + 1; // left = 2*i + 1 
    let r = 2 * i + 2; // right = 2*i + 2 


    // If left child is larger than root 
    if (l < n && arr[l] > arr[largest]) 
        largest = l;
    

    // If right child is larger than largest so far 
    if (r < n && arr[r] > arr[largest]) 
        largest = r;
    
    // If largest is not root 
    if (largest !== i) {
        let swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
              

        // Recursively heapify the affected sub-tree 
        heapify(arr, n, largest, animations);

    }
} 
