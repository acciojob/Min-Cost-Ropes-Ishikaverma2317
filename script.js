class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }
  
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }
  
  sinkDown(idx) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let smallest = idx;
    
    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    
    if (smallest !== idx) {
      [this.heap[smallest], this.heap[idx]] = [this.heap[idx], this.heap[smallest]];
      this.sinkDown(smallest);
    }
  }
  
  size() {
    return this.heap.length;
  }
}

function mincost(arr) {
  let heap = new MinHeap();
  for (let num of arr) {
    heap.insert(num);
  }
  
  let totalCost = 0;
  
  while (heap.size() > 1) {
    let first = heap.extractMin();
    let second = heap.extractMin();
    
    let cost = first + second;
    totalCost += cost;
    
    heap.insert(cost);
  }
  
  return totalCost;
}

// 🔹 Example Runs
console.log(mincost([4, 3, 2, 6]));   // 29
console.log(mincost([1, 2, 3, 4, 5])); // 33
