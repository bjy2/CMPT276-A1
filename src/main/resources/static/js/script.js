var TotalActivity = 1;
var add_row_button = document.querySelector('input[value="ADD ROW"]');

function addRow() {
    TotalActivity++;
    const activityName = `Activity ${TotalActivity}`;
    const shortName = `A${TotalActivity}`;
    const tableBody = document.querySelector('#grade-table tbody');
    const newRow = document.createElement('tr');
    newRow.classList.add('row');
    newRow.innerHTML = `
        <td>${activityName}</td>
        <td>${shortName}</td>
        <td><input type="number" name="weight"></td>
        <td>
            <input type="number" name="grade-nume">
            /
            <input type="number" name="grade-deno">
        </td>
        <td class="percentage"></td>
    `;
    tableBody.appendChild(newRow);

    // Add event listeners to the new inputs
    const gradeNumeInput = newRow.querySelector('input[name="grade-nume"]');
    const gradeDenoInput = newRow.querySelector('input[name="grade-deno"]');
    const percentageCell = newRow.querySelector('.percentage');

    gradeNumeInput.addEventListener('input', () => {
        updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
    });

    gradeDenoInput.addEventListener('input', () => {
        updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
    });
}

add_row_button.addEventListener('click', function(evt) {
    evt.preventDefault();
    addRow();
});

function updatePercentage(numeratorInput, denominatorInput, percentageCell) {
    const numerator = parseFloat(numeratorInput.value);
    const denominator = parseFloat(denominatorInput.value);

    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        const percentage = (numerator / denominator) * 100;
        percentageCell.textContent = `${percentage.toFixed(2)}%`;
    } else {
        percentageCell.textContent = '';
    }
}

function addInitialEventListeners() {
    const initialRows = document.querySelectorAll('#grade-table tbody tr');
    initialRows.forEach(row => {
        const gradeNumeInput = row.querySelector('input[name="grade-nume"]');
        const gradeDenoInput = row.querySelector('input[name="grade-deno"]');
        const percentageCell = row.querySelector('.percentage');

        gradeNumeInput.addEventListener('input', () => {
            updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
        });

        gradeDenoInput.addEventListener('input', () => {
            updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
        });
    });
}

function calcMean() {
    const numerators = document.getElementsByName('grade-nume');
    const denominators = document.getElementsByName('grade-deno');
    let total = 0;
    let count = 0;

    for (let i = 0; i < numerators.length; i++) {
        const numerator = numerators[i].value;
        const denominator = denominators[i].value;
        if (numerator && denominator) {
            total += parseFloat(numerator) / parseFloat(denominator);
            count++;
        }
    }

    const mean = total / count;
    document.getElementById('mean-grade').textContent = `Mean Grade: ${(mean * 100).toFixed(2)} / 100`;
}

function calcWeighted() {
    const weights = document.getElementsByName('weight');
    const numerators = document.getElementsByName('grade-nume');
    const denominators = document.getElementsByName('grade-deno');
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (let i = 0; i < weights.length; i++) {
        const weight = weights[i].value;
        const numerator = numerators[i].value;
        const denominator = denominators[i].value;
        if (weight && numerator && denominator) {
            const grade = parseFloat(numerator) / parseFloat(denominator);
            totalWeightedScore += grade * parseFloat(weight);
            totalWeight += parseFloat(weight);
        }
    }

    const weightedMean = totalWeightedScore / totalWeight;
    document.getElementById('weighted-grade').textContent = `Weighted Grade: ${(weightedMean * 100).toFixed(2)} / 100`;
}

document.addEventListener('DOMContentLoaded', addInitialEventListeners);