// Home
const btnHome: HTMLElement = document.getElementById("btnHome")!;
const changeName: HTMLElement = document.getElementById("changeName")!;
const btnChangeName: HTMLElement = document.getElementById("btnChangeName")!;
const inputChangeName: HTMLInputElement | HTMLElement =
    document.getElementById("inputChangeName")!;
const btnInvoices: HTMLElement = document.getElementById("btnInvoices")!;
const btnBonds: HTMLElement = document.getElementById("btnBonds")!;
const userShow: HTMLElement = document.getElementById("userShow")!;
const searchUsersInput: HTMLElement =
    document.getElementById("searchUsersInput")!;
const searchUsersButton: HTMLElement =
    document.getElementById("searchUsersButton")!;
const userSelName: HTMLElement = document.getElementById("userSelName")!;
// Main
const mainHome: HTMLElement = document.getElementById("mainHome")!;
const mainInvoices: HTMLElement = document.getElementById("mainInvoices")!;
const mainBonds: HTMLElement = document.getElementById("mainBonds")!;
// Add
const addUser: HTMLElement = document.getElementById("addUser")!;
const addInvoices: HTMLElement = document.getElementById("addInvoices")!;
const addBonds: HTMLElement = document.getElementById("addBonds")!;
// invoices
const invoicesADD: HTMLElement = document.getElementById("invoicesADD")!;
const invoicesCon: HTMLElement = document.getElementById("invoicesCon")!;
const inputInvoicesNum: HTMLElement =
    document.getElementById("inputInvoicesNum")!;
const inputInvoicesGold: HTMLElement =
    document.getElementById("inputInvoicesGold")!;
const inputInvoicesInvoic: HTMLElement = document.getElementById(
    "inputInvoicesInvoic"
)!;
const inputInvoicesCreated: HTMLElement = document.getElementById(
    "inputInvoicesCreated"
)!;
const btnChangeInvoices: HTMLElement =
    document.getElementById("btnChangeInvoices")!;
const searchInvoicesInput: HTMLElement = document.createElement(
    "searchInvoicesInput"
)!;
const searchInvoicesButton: HTMLElement = document.createElement(
    "searchInvoicesButton"
)!;
// Bonds
const bondsADD: HTMLElement = document.getElementById("bondsADD")!;
const bondsCon: HTMLElement = document.getElementById("bondsCon")!;
const inputBondsNum: HTMLElement = document.getElementById("inputBondsNum")!;
const inputBondsGold: HTMLElement = document.getElementById("inputBondsGold")!;
const inputBondsInvoic: HTMLElement =
    document.getElementById("inputBondsInvoic")!;
const inputBondsCreated: HTMLElement =
    document.getElementById("inputBondsCreated")!;
const btnChangeBonds: HTMLElement = document.getElementById("btnChangeBonds")!;
const searchBondsInput: HTMLElement =
    document.createElement("searchBondsInput")!;
const searchBondsButton: HTMLElement =
    document.createElement("searchBondsButton")!;
// pageName
const pageName: HTMLElement = document.getElementById("pageName")!;
// alert
const warnText: HTMLElement = document.getElementById("warnText")!;
const divAlert: HTMLElement = document.getElementById("divAlert")!;

// HOME
const home = new Lala(mainHome);
home.changePage(btnInvoices);
home.changePage(btnBonds);
home.addUser();
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
const mytable: HTMLElement = document.getElementById("mytable")!;
const tbody: HTMLElement = document.getElementById("tbody")!;
var tableEdit: any;
var table: any;

var allgold = 0;
var allmony = 0;

let allGold: HTMLElement = document.getElementById("allGold")!;
let allMony: HTMLElement = document.getElementById("allMony")!;

const reloadAllGoldAndMony = () => {
    allgold = 0;
    allmony = 0;

    for (let i = 0; i < dataPro.length; i++) {
        allgold += Number(dataPro[i].gold.toFixed(3));
        allmony += Number(dataPro[i].mony.toFixed(3));
    }
    allGold.textContent = String(allgold.toFixed(3));
    allMony.textContent = String(allmony.toFixed(3));
};

const readTables = (): void => {
    reloadAllGoldAndMony();
    console.log(allGold);
    console.log(allMony);

    tbody.classList.add("mytable");

    table = `\n<tr class="th"><th>الاسم</th><th>الذهب</th><th>الاجر</th></tr>`;

    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr class="tb"><td>${dataPro[i].name}</td><td>${dataPro[i].gold.toFixed(3)}</td><td>${dataPro[i].mony.toFixed(3)}</td>`;
    }

    table += `
    <div class="tbF"><span>الذهب الكلي: ${allgold.toFixed(3)}</span><span>الأجر الكلي: ${allmony.toFixed(3)}</span></div>`;

    if (table !== undefined) {
        tableEdit = table.split("\n");
        tableEdit.shift();
    } else {
        tableEdit = [""];
    }

    // add elements
    tbody.innerHTML = tableEdit.join("");

    // document.getElementsByClassName("head")[0].appendChild(mytable);
};

const fnPDF = (): void => {
    readTables();
    try {
        const copyText = mytable;

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.innerHTML);
        home.myAlert("تم النسخ");
    } catch (e) {
        home.myAlert(e);
        console.error(e);
    }
};
