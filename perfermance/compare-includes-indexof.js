const ARR_SIZE = 1000000;
const hugeArr = new Array(ARR_SIZE).fill(1);

// includes
const includesTest = () => {
    const arrCopy = [];
    console.time("includes");
    let i = 0
    while (i < hugeArr.length) {
        arrCopy.includes(i++)
    }
    console.timeEnd("includes");
}

// indexof
const indexOfTest = () => {
    const arrCopy = [];
    console.time("indexOf");
    let i = 0
    for (let item of hugeArr) {
        arrCopy.indexOf(item)
    }

    console.timeEnd("indexOf");
}

includesTest();
indexOfTest();