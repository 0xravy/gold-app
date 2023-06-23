var // Home
    btnHome = document.getElementById("btnHome"),
    changeName = document.getElementById("changeName"),
    btnChangeName = document.getElementById("btnChangeName"),
    inputChangeName = document.getElementById("inputChangeName"),
    btnInvoices = document.getElementById("btnInvoices"),
    btnBonds = document.getElementById("btnBonds"),
    userShow = document.getElementById("userShow"),
    searchUsersInput = document.getElementById("searchUsersInput"),
    searchUsersButton = document.getElementById("searchUsersButton"),
    userSelName = document.getElementById("userSelName"),
    // Main
    mainHome = document.getElementById("mainHome"),
    mainInvoices = document.getElementById("mainInvoices"),
    mainBonds = document.getElementById("mainBonds"),
    // Add
    addUser = document.getElementById("addUser"),
    addInvoices = document.getElementById("addInvoices"),
    addBonds = document.getElementById("addBonds"),
    // invoices
    invoicesADD = document.getElementById("invoicesADD"),
    invoicesCon = document.getElementById("invoicesCon"),
    inputInvoicesNum = document.getElementById("inputInvoicesNum"),
    inputInvoicesGold = document.getElementById("inputInvoicesGold"),
    inputInvoicesInvoic = document.getElementById("inputInvoicesInvoic"),
    inputInvoicesCreated = document.getElementById("inputInvoicesCreated"),
    btnChangeInvoices = document.getElementById("btnChangeInvoices"),
    searchInvoicesInput = document.createElement("searchInvoicesInput"),
    searchInvoicesButton = document.createElement("searchInvoicesButton"),
    // Bonds
    bondsADD = document.getElementById("bondsADD"),
    bondsCon = document.getElementById("bondsCon"),
    inputBondsNum = document.getElementById("inputBondsNum"),
    inputBondsGold = document.getElementById("inputBondsGold"),
    inputBondsInvoic = document.getElementById("inputBondsInvoic"),
    inputBondsCreated = document.getElementById("inputBondsCreated"),
    btnChangeBonds = document.getElementById("btnChangeBonds"),
    searchBondsInput = document.createElement("searchBondsInput"),
    searchBondsButton = document.createElement("searchBondsButton"),
    // pageName
    pageName = document.getElementById("pageName");
// =======================================================

// HOME
const home = new Lala(mainHome);
home.changePage(btnInvoices);
home.changePage(btnBonds);
home.addUser(addUser);
home.usersRead();

// INVOICES
const invoices = new Lala(mainInvoices);
invoices.changePage(btnHome);
invoices.addTable(addInvoices);

// BONDS
const bonds = new Lala(mainBonds);
bonds.changePage(btnHome);
bonds.addTable(addBonds);

// Download PDF
function readTables() {
    var table = `
    <tr>
        <th>الاسم</th>
        <th>الذهب</th>
        <th>الاجر</th>
    </tr>
`;
    var tableEdit;

    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${dataPro[i].name}</td>
            <td>${dataPro[i].gold}</td>
            <td>${dataPro[i].mony}</td>
        </tr>
    `;
    }

    if (table !== undefined) {
        tableEdit = table.split("\n");
        tableEdit.shift();
    } else {
        tableEdit = [""];
    }

    console.log(tableEdit.join(""));
    // add elements
    tbody.innerHTML = tableEdit.join("");
}

function pdf() {
    readTables();
    try {
        var element = table;
        var opt = {
            margin: 1,
            filename: "myfile.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
    } catch (e) {
        home.myAlert(e);
        console.error(e);
    }
}
