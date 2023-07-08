/* -----{ GoldenCraftApp }-----

  * aravan app from SaqrTeam *

-----------------------------*/
var dataPro = localStorage.users != null ? JSON.parse(localStorage.users) : [];
var myID;
var moodIndex;
var mood = "create";
var userTable;
var thereTime = true;

class Lala {
    constructor(main) {
        this.main = main;
        this.elemSelected;
    }

    // =============[ myAlert ]==============

    // myAlert
    myAlert(text) {
        console.log(thereTime);
        if (thereTime) {
            thereTime = false;
            console.log(thereTime);
            console.log("time is start");
            warnText.innerHTML = text;
            divAlert.style.display = "flex";

            const toast = document.querySelector(".toast");
            const closeIcon = document.querySelector(".close");
            const progress = document.querySelector(".progress");

            let timer1, timer2;

            toast.classList.add("active");
            progress.classList.add("active");

            timer1 = setTimeout(() => {
                toast.classList.remove("active");
            }, 4900); //1s = 1000 milliseconds

            timer2 = setTimeout(() => {
                progress.classList.remove("active");
                thereTime = true;
            }, 5300);

            closeIcon.addEventListener("click", () => {
                toast.classList.remove("active");

                setTimeout(() => {
                    progress.classList.remove("active");
                }, 300);

                clearTimeout(timer1);
                clearTimeout(timer2);
                thereTime = true;
            });
            console.log("time is done");
        }
    }

    // ============[ changePages ]============

    changePage(btn) {
        btn.onclick = () => {
            var bodyChild = document.getElementById("main").children;
            for (let i = 0; i < bodyChild.length; i++) {
                var child = bodyChild[i];
                child.classList.remove("open");
            }
            var secIds = [
                "home", // الرئيسي
                "invoices", // الفواتير
                "bonds", // السندات
            ];
            var idNum = 0;
            secIds.map((id) => {
                if (btn.dataset.id == id) {
                    bodyChild[idNum].className = "open";
                }
                idNum++;
            });
            idNum = 0;

            userTable = btn.dataset.id;

            if (btn.dataset.id !== "home") {
                var arab = btn.dataset.id == "bonds" ? "السندات" : "الفواتير";
                pageName.innerHTML = `
                    ${dataPro[myID].name} 
                    <i
                    style="transform: translateY(8px); font-size: 2rem"
                    class="bx bx-chevron-left"
                    ></i> 
                    ${arab}
                `;
                console.log();
                if (btn.dataset.id == "bonds") {
                    bonds.tablesRead();
                } else {
                    invoices.tablesRead();
                }
            } else {
                home.usersRead();
                pageName.innerHTML = "";
                userShow.style.display = "none";
            }
        };
    }

    // ===============[ Users ]===============

    // search users
    searchUsers(value) {
        console.log(value);
        var table;
        var tableEdit;

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].name.includes(value.toLowerCase())) {
                console.log(i);
                table += `
                    <div data-id="${i}" onclick="home.userSelect(${i})">
                        <span>${dataPro[i].name || "test"}</span>
                        <span>${Number((dataPro[i].gold).toFixed(3))}</span>
                        <span>${Number((dataPro[i].mony).toFixed(3))}</span>
                        <button data-id="${i}" onclick="home.userDelete(${i})" class="removeButton">
                            <i class='bx bx-trash'></i>
                        </button>
                        <button data-id="${i}" onclick="home.userUpdate(${i})" class="updateButton">
                            تحديث
                            <i class='bx bx-refresh'></i>
                        </button>
                    </div>
                `;
            }
        }

        if (table !== undefined) {
            tableEdit = table.split("\n");
            tableEdit.shift();
        } else {
            tableEdit = [""];
        }
        // add elements
        this.main.innerHTML = tableEdit.join("");

        // update classes
        for (var i = 0; i < this.main.children.length; i++) {
            var elemBefore =
                this.main.children[i - 1] == undefined
                    ? null
                    : this.main.children[i - 1].className;
            var elemNow = this.main.children[i];

            if (elemBefore == "" || elemBefore == null) {
                elemNow.className = "d";
            }
        }
    }

    // read users
    usersRead() {
        var table;
        var tableEdit;

        console.log(dataPro);

        for (let i = 0; i < dataPro.length; i++) {
            var goldProInv = 0;
            var goldProBond = 0;
            dataPro[i].invoices.map((inv) => (goldProInv += Number(inv.gold)));
            dataPro[i].bonds.map(
                (bonds) => (goldProBond += Number(bonds.gold))
            );

            var monyProInv = 0;
            var monyProBond = 0;
            dataPro[i].invoices.map((inv) => (monyProInv += Number(inv.mony)));
            dataPro[i].bonds.map(
                (bonds) => (monyProBond += Number(bonds.mony))
            );

            try {
                var goldPro = goldProInv - goldProBond;
            } catch (e) {
                var goldPro = 0;
            }

            try {
                var monyPro = monyProInv - monyProBond;
            } catch (e) {
                var monyPro = 0;
            }

            dataPro[i].gold = goldPro;
            dataPro[i].mony = monyPro;

            table += `
            <div data-id="${i}" onclick="home.userSelect(${i})">
                <span>${dataPro[i].name}</span>
                <span>${Number((dataPro[i].gold).toFixed(3))}</span>
                <span>${Number((dataPro[i].mony).toFixed(3))}</span>
                <button data-id="${i}" onclick="home.userDelete(${i})" class="removeButton">
                    <i class='bx bx-trash'></i>
                </button>
                <button data-id="${i}" onclick="home.userUpdate(${i})" class="updateButton">
                    تحديث
                    <i class='bx bx-refresh'></i>
                </button>
            </div>
            `;
        }

        if (table !== undefined) {
            tableEdit = table.split("\n");
            tableEdit.shift();
        } else tableEdit = [""];

        // add elements
        this.main.innerHTML = tableEdit.join("");

        // update classes
        for (var i = 0; i < this.main.children.length; i++) {
            var elemBefore =
                this.main.children[i - 1] == undefined
                    ? null
                    : this.main.children[i - 1].className;
            var elemNow = this.main.children[i];

            if (elemBefore == "" || elemBefore == null) {
                elemNow.className = "d";
            }
        }
    }

    // create user
    addUser() {
        addUser.onclick = () => {
            var inl = inputChangeName.value.trim().length;
            if (inl === 0) return this.myAlert("يرجى كتابة اسم العميل 🤡");
            if (inl > 30)
                return this.myAlert(
                    ` النص يحتوي على ${inl} حرف يجب ان لا يزيد عن 30 حرف`
                );
            var thereName;

            // Update
            if (mood === "update") {
                if (inputChangeName.value == dataPro[moodIndex].name)
                    return this.myAlert("انت لم تقم بتغير الاسم 😐");
                for (let i = 0; i < dataPro.length; i++) {
                    thereName = dataPro[i].name == inputChangeName.value.trim();
                    if (thereName)
                        return this.myAlert("الاسم موجود يرجى وضع اسم اخر 😅");
                }

                console.log(moodIndex);
                dataPro[moodIndex].name = inputChangeName.value
                    .toLowerCase()
                    .trim();
                localStorage.setItem("users", JSON.stringify(dataPro));
                this.usersRead();

                mood = "create";
                addUser.innerHTML = `
                    اضافة
                    <i class="bx bx-plus-medical"></i>
                `;
            } else {
                // Create
                for (let i = 0; i < dataPro.length; i++) {
                    thereName =
                        dataPro[i].name ==
                        inputChangeName.value.toLowerCase().trim();
                    if (thereName)
                        return this.myAlert("الاسم موجود يرجى وضع اسم اخر 😐");
                }

                var lastData = dataPro[dataPro.length - 1] || "";
                var dataId = localStorage.users == null ? 0 : lastData.id + 1;
                var newData = {
                    // NewUserLalaData
                    id: dataId,
                    name: inputChangeName.value.toLowerCase(),
                    gold: 0,
                    mony: 0,
                    invoices: [],
                    bonds: [],
                };

                dataPro.push(newData); // Add new data
                localStorage.setItem("users", JSON.stringify(dataPro));

                this.usersRead();

                console.log(
                    "there now ".concat(this.main.children.length, " client")
                );
            }

            userShow.style.display = "none";
            inputChangeName.value = "";
        };
    }

    // update user
    userUpdate(id) {
        inputChangeName.value = dataPro[id].name;
        addUser.innerHTML = `
            تحديث
        `;
        mood = "update";
        moodIndex = id;
    }

    // delete user
    userDelete(id) {
        dataPro.splice(id, 1);
        localStorage.users = JSON.stringify(dataPro);
        userShow.style.display = "none";
        this.usersRead();
    }

    // select user
    userSelect(id) {
        console.log("lala");
        myID = id;
        if (dataPro[myID] == undefined) return location.reload();
        userShow.style.display = "flex";
        userSelName.innerHTML = dataPro[myID].name;
    }

    // ==============[ Tables ]==============

    // search tables
    searchTables(value) {
        console.log(value);
        var table;
        var tableEdit;

        if (userTable == "invoices") {
            for (let i = 0; i < dataPro[myID].invoices.length; i++) {
                if (dataPro[myID].invoices[i].num.includes(value)) {
                    table += `
                    <div data-id="${i}">
                        <span>${dataPro[myID].invoices[i].num}</span>
                        <span>${dataPro[myID].invoices[i].gold}</span>
                        <span>${dataPro[myID].invoices[i].mony}</span>
                        <span>${dataPro[myID].invoices[i].created}</span>
                        <button data-id="${i}" onclick="invoices.tableDelete(${i})" class="removeButton">
                            <i class='bx bx-trash'></i>
                        </button>
                        <button data-id="${i}" onclick="invoices.tableUpdate(${i})" class="updateButton">
                            تحديث
                            <i class='bx bx-refresh'></i>
                        </button>
                    </div>
                `;
                }
            }
        } else {
            for (let i = 0; i < dataPro[myID].bonds.length; i++) {
                if (dataPro[myID].bonds[i].num.includes(value)) {
                    table += `
                    <div data-id="${i}">
                        <span>${dataPro[myID].bonds[i].num}</span>
                        <span>${dataPro[myID].bonds[i].gold}</span>
                        <span>${dataPro[myID].bonds[i].mony}</span>
                        <span>${dataPro[myID].bonds[i].created}</span>
                        <button data-id="${i}" onclick="bonds.tableDelete(${i})" class="removeButton">
                            <i class='bx bx-trash'></i>
                        </button>
                        <button data-id="${i}" onclick="bonds.tableUpdate(${i})" class="updateButton">
                            تحديث
                            <i class='bx bx-refresh'></i>
                        </button>
                    </div>
                `;
                }
            }
        }

        if (table !== undefined) {
            tableEdit = table.split("\n");
            tableEdit.shift();
        } else {
            tableEdit = [""];
        }

        console.log(tableEdit.join(""));
        // add elements
        this.main.innerHTML = tableEdit.join("");

        // update classes
        for (var i = 0; i < this.main.children.length; i++) {
            var elemBefore =
                this.main.children[i - 1] == undefined
                    ? null
                    : this.main.children[i - 1].className;
            var elemNow = this.main.children[i];

            if (elemBefore == "" || elemBefore == null) {
                elemNow.className = "d";
            }
        }
    }

    // read tables
    tablesRead() {
        var table;
        var tableEdit;
        var myData = dataPro[myID];
        console.log(myData);

        if (userTable == "invoices") {
            console.log(userTable);

            for (let i = 0; i < myData.invoices.length; i++) {
                table += `
            <div data-id="${i}">
                <span>${myData.invoices[i].num}</span>
                <span>${myData.invoices[i].gold}</span>
                <span>${myData.invoices[i].mony}</span>
                <span>${myData.invoices[i].created}</span>
                <button data-id="${i}" onclick="invoices.tableDelete(${i})" class="removeButton">
                    <i class='bx bx-trash'></i>
                </button>
                <button data-id="${i}" onclick="invoices.tableUpdate(${i})" class="updateButton">
                    تحديث
                    <i class='bx bx-refresh'></i>
                </button>
            </div>
            `;
            }
        } else {
            console.log(userTable);

            for (let i = 0; i < myData.bonds.length; i++) {
                table += `
            <div data-id="${i}">
                <span>${myData.bonds[i].num}</span>
                <span>${myData.bonds[i].gold}</span>
                <span>${myData.bonds[i].mony}</span>
                <span>${myData.bonds[i].created}</span>
                <button data-id="${i}" onclick="bonds.tableDelete(${i})" class="removeButton">
                    <i class='bx bx-trash'></i>
                </button>
                <button data-id="${i}" onclick="bonds.tableUpdate(${i})" class="updateButton">
                    تحديث
                    <i class='bx bx-refresh'></i>
                </button>
            </div>
            `;
            }
        }

        if (table !== undefined) {
            tableEdit = table.split("\n");
            tableEdit.shift();
        } else tableEdit = [""];

        // add elements
        this.main.innerHTML = tableEdit.join("");

        // update classes
        for (var i = 0; i < this.main.children.length; i++) {
            var elemBefore =
                this.main.children[i - 1] == undefined
                    ? null
                    : this.main.children[i - 1].className;
            var elemNow = this.main.children[i];

            if (elemBefore == "" || elemBefore == null) {
                elemNow.className = "d";
            }
        }
    }

    // create table
    addTable(addBtn) {
        // InvoicesAdd --------------------------------------------------------
        if (addBtn == addInvoices) {
            addInvoices.onclick = () => {
                if (
                    inputInvoicesNum.value == "" ||
                    inputInvoicesGold.value == "" ||
                    inputInvoicesInvoic.value == "" ||
                    inputInvoicesCreated.value == ""
                ) {
                    return this.myAlert("يرجى تعبئة جميع المدخلات 🧐");
                }

                // Update
                var thereName;
                if (mood === "update") {
                    var dataInv = dataPro[myID].invoices[moodIndex];
                    console.log(moodIndex);

                    dataInv.num = inputInvoicesNum.value.toLowerCase().trim();
                    dataInv.gold = inputInvoicesGold.value.toLowerCase().trim();
                    dataInv.mony = inputInvoicesInvoic.value
                        .toLowerCase()
                        .trim();
                    dataInv.created = inputInvoicesCreated.value
                        .toLowerCase()
                        .trim();

                    localStorage.setItem("users", JSON.stringify(dataPro));
                    this.tablesRead();

                    mood = "create";
                    addInvoices.innerHTML = `
                        اضافة
                        <i class="bx bx-plus-medical"></i>
                    `;
                } else {
                    var newData = {
                        num: inputInvoicesNum.value,
                        gold: inputInvoicesGold.value,
                        mony: inputInvoicesInvoic.value,
                        created: inputInvoicesCreated.value,
                    };

                    dataPro[myID].invoices.push(newData);
                    localStorage.setItem("users", JSON.stringify(dataPro));

                    this.tablesRead();
                }

                inputInvoicesNum.value = "";
                inputInvoicesGold.value = "";
                inputInvoicesInvoic.value = "";
                inputInvoicesCreated.value = "";
            };
        }
        // BondsAdd ----------------------------------------------------------------
        if (addBtn == addBonds) {
            addBonds.onclick = () => {
                if (
                    inputBondsNum.value == "" ||
                    inputBondsGold.value == "" ||
                    inputBondsInvoic.value == "" ||
                    inputBondsCreated.value == ""
                ) {
                    return this.myAlert("يرجى تعبئة جميع المدخلات 🧐");
                }

                // Update
                var thereName;
                if (mood === "update") {
                    var dataInv = dataPro[myID].bonds[moodIndex];

                    console.log(moodIndex);
                    dataInv.num = inputBondsNum.value.toLowerCase().trim();
                    dataInv.gold = inputBondsGold.value.toLowerCase().trim();
                    dataInv.mony = inputBondsInvoic.value.toLowerCase().trim();
                    dataInv.created = inputBondsCreated.value
                        .toLowerCase()
                        .trim();

                    localStorage.setItem("users", JSON.stringify(dataPro));
                    this.tablesRead();

                    mood = "create";
                    addBonds.innerHTML = `
                        اضافة
                        <i class="bx bx-plus-medical"></i>
                    `;
                } else {
                    var newData = {
                        num: inputBondsNum.value,
                        gold: inputBondsGold.value,
                        mony: inputBondsInvoic.value,
                        created: inputBondsCreated.value,
                    };

                    dataPro[myID].bonds.push(newData);
                    localStorage.setItem("users", JSON.stringify(dataPro));

                    this.tablesRead();
                }

                inputBondsNum.value = "";
                inputBondsGold.value = "";
                inputBondsInvoic.value = "";
                inputBondsCreated.value = "";
            };
        }
    }

    // update table
    tableUpdate(id) {
        console.log(userTable);
        if (userTable == "invoices") {
            var lala = dataPro[myID].invoices[id];
            console.log(lala);

            inputInvoicesNum.value = lala.num;
            inputInvoicesGold.value = lala.gold;
            inputInvoicesInvoic.value = lala.mony;
            inputInvoicesCreated.value = lala.created;

            addInvoices.innerHTML = `تحديث`;
        } else {
            var lala = dataPro[myID].bonds[id];
            console.log(lala);

            inputBondsNum.value = lala.num;
            inputBondsGold.value = lala.gold;
            inputBondsInvoic.value = lala.mony;
            inputBondsCreated.value = lala.created;

            addBonds.innerHTML = `تحديث`;
        }

        mood = "update";
        moodIndex = id;
    }

    // delete table
    tableDelete(id) {
        if (userTable == "invoices") dataPro[myID].invoices.splice(id, 1);
        else dataPro[myID].bonds.splice(id, 1);

        localStorage.users = JSON.stringify(dataPro);
        this.tablesRead();
    }
}
