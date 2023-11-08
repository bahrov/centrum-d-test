export function splitArray<T>(array: T[]): T[][] {
  const finalArray: T[][] = [];
  let subArray: T[] = [];
  array.forEach((value, index, ar) => {
    const isLast: boolean = index === ar.length - 1;
    if (subArray.length < 10) {
      subArray.push(value);
    } else {
      finalArray.push(subArray);
      subArray = [];
      subArray.push(value);
    }
    if (isLast) {
      finalArray.push(subArray);
    }
  });
  return finalArray;
}