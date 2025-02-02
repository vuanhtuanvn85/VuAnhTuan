// complexity: O(n)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// complexity: O(1)
function sum_to_n_b(n: number): number {
	let sum = n * (n+1) / 2;
    return sum;
}

// complexity: O(n)
function sum_to_n_c(n: number): number {
	if (n === 0) {
        return 0;
    }

    return sum_to_n_c(n-1) + n;
}

let n = 15;
console.log(sum_to_n_a(n));
console.log(sum_to_n_b(n));
console.log(sum_to_n_c(n));