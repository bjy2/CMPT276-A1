var TotalActivity = 1;
var add_row_button = document.querySelector('input[value="ADD ROW"]');

function addRow() {
    TotalActivity++;
    const activityName = `Activity ${TotalActivity}`;
    const shortName = `A${TotalActivity}`;
    const tableBody = document.getElementsByTagName('tbody')[0];
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

    // Add event listeners to new input rows for further percentage update
    const gradeNumeInput = newRow.getElementsByTagName('input')[1];
    const gradeDenoInput = newRow.getElementsByTagName('input')[2];
    const percentageCell = newRow.getElementsByClassName('percentage')[0];

    gradeNumeInput.addEventListener('input', function(evt) {
        evt.preventDefault();
        updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
    });

    gradeDenoInput.addEventListener('input', function(evt) {
        evt.preventDefault();
        updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
    });
}
// Add row once button clicked
add_row_button.addEventListener('click', function(evt) {
    evt.preventDefault();
    addRow();
});


function updatePercentage(numeratorInput, denominatorInput, percentageCell) {
    const numerator = parseFloat(numeratorInput.value);
    const denominator = parseFloat(denominatorInput.value);

    if (!isNaN(numerator) && !isNaN(denominator) && denominator != 0) {
        const percentage = (numerator / denominator) * 100;
        percentageCell.textContent = `${percentage.toFixed(2)}%`;
    } else {
        percentageCell.textContent = '';
    }
}

// Output percentage for the first row
function addInitialEventListeners() {
    const initialRows = document.getElementsByClassName('row');
    for (let row of initialRows) {
        const gradeNumeInput = row.getElementsByTagName('input')[1];
        const gradeDenoInput = row.getElementsByTagName('input')[2];
        const percentageCell = row.getElementsByClassName('percentage')[0];

        gradeNumeInput.addEventListener('input', function(evt) {
            evt.preventDefault();
            updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
        });

        gradeDenoInput.addEventListener('input', function(evt) {
            evt.preventDefault();
            updatePercentage(gradeNumeInput, gradeDenoInput, percentageCell);
        });
    }
}
document.addEventListener('DOMContentLoaded', addInitialEventListeners);

function calcMean() {
    const numerators = document.getElementsByName('grade-nume');
    const denominators = document.getElementsByName('grade-deno');
    let totalMarks = 0;

    for (let i = 0; i < TotalActivity; i++) {
        const numerator = numerators[i].value;
        const denominator = denominators[i].value;
        if (numerator && denominator) {
            totalMarks += parseFloat(numerator) / parseFloat(denominator);
        }
    }

    const mean = totalMarks / TotalActivity;
    document.getElementById('mean-grade').textContent = `Mean Grade: ${(mean * 100).toFixed(2)} / 100`;
}

function calcWeighted() {
    const weights = document.getElementsByName('weight');
    const numerators = document.getElementsByName('grade-nume');
    const denominators = document.getElementsByName('grade-deno');
    let totalWeightedMarks = 0;
    let totalWeight = 0;

    for (let i = 0; i < TotalActivity; i++) {
        const weight = weights[i].value;
        const numerator = numerators[i].value;
        const denominator = denominators[i].value;
        if (weight && numerator && denominator) {
            const grade = parseFloat(numerator) / parseFloat(denominator);
            totalWeightedMarks += grade * parseFloat(weight);
            totalWeight += parseFloat(weight);
        }
    }

    const weightedMean = totalWeightedMarks / totalWeight;
    document.getElementById('weighted-grade').textContent = `Weighted Grade: ${(weightedMean * 100).toFixed(2)} / 100`;
}
