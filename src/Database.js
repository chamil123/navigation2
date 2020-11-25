import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "3.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

import moment from 'moment' // 2.20.1
const _format = 'YYYY-MM-DD';


export default class Database {

    initDB() {


        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");

            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    // this.closeDatabase(db);
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    ).then(DB => {
                        let db;
                        db = DB;

                        console.log("Database OPEN");
                        db.executeSql('SELECT 1 FROM Period LIMIT 1').then(() => {
                            console.log("Database is ready ... executing query ...");
                        }).catch((error) => {

                            console.log("Received error: ", error);
                            console.log("Database not yet ready ... populating data");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Period] ([pId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pName] NVARCHAR(50) NULL,[pDescription] NVARCHAR(255) NULL, [pCatId] INTEGER NOT NULL, [pParityBit] INTEGER NOT NULL, [pTime] NVARCHAR(50) NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagmother] ([hId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [hName] NVARCHAR(255) NULL, [hStatus] NVARCHAR(10) NULL, [hDate] NVARCHAR(10) NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagbaby] ([bId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bName] NVARCHAR(255) NULL, [bStatus] NVARCHAR(10) NULL, [bDate] NVARCHAR(10) NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BloodPresure] ([bpId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bpDate] NVARCHAR(25) NULL, [bpValue] INTEGER NOT NULL, [bpdstValue] INTEGER NOT NULL, [bpsmin] INTEGER NOT NULL, [bpdmin] INTEGER NOT NULL, [bpslow] INTEGER NOT NULL, [bpsideal] INTEGER NOT NULL, [bpsprehigh] INTEGER NOT NULL, [bpshigh] INTEGER NOT NULL, [bpdlow] INTEGER NOT NULL, [bpdideal] INTEGER NOT NULL, [bpdprehigh] INTEGER NOT NULL, [bpdhigh] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [WeightGain] ([wgId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [wgDate] NVARCHAR(25) NULL, [wgValue] INTEGER NOT NULL, [wgmin] INTEGER NOT NULL, [wgmax] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [KickCount] ([kcId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [kcDate] NVARCHAR(25) NULL, [kcCount] INTEGER NOT NULL, [kcFirstTime] NVARCHAR(25) NULL, [kcLastTime] NVARCHAR(25) NULL,[kcStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BabyActivity] ([baId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [baDate] NVARCHAR(25) NULL,[baTime] NVARCHAR(25) NULL, [baText] NVARCHAR(255) NULL, [baStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [FeedingTime] ([fdId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [fdDate] NVARCHAR(25) NULL,[fdTime] NVARCHAR(25) NULL, [fdText] NVARCHAR(255) NULL, [fdValue] INTEGER NOT NULL, [fdStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Urination] ([uId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [uDate] NVARCHAR(25) NULL,[uTime] NVARCHAR(25) NULL, [uText] NVARCHAR(255) NULL, [uValue] INTEGER NOT NULL, [uStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Elimination] ([eId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [eDate] NVARCHAR(25) NULL,[eTime] NVARCHAR(25) NULL, [eText] NVARCHAR(255) NULL, [eValue] INTEGER NOT NULL, [eStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [WightvsLength] ([wlId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [wlSam] NVARCHAR(11) NULL,[wlMan] NVARCHAR(11) NULL,[wlNw] NVARCHAR(11) NULL,[wlOw] NVARCHAR(11) NULL,[wlhw] NVARCHAR(11) NULL,[wlbaby] NVARCHAR(11) NULL )');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BabyDetails] ([bId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,[bName] NVARCHAR(255) NULL,[bWeight] REAL NOT NULL,[bbDate] NVARCHAR(50), [bStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [LaboRoomPacket] ([lId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [lName] NVARCHAR(255) NULL, [lStatus] NVARCHAR(10) NULL, [lDate] NVARCHAR(10) NULL)');

                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BabyBathTracking] ([btId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [btDate] NVARCHAR(25) NULL, [btStart] NVARCHAR(25) NULL, [btEnd] NVARCHAR(25) NULL, [btText] NVARCHAR(255) NULL, [btStatus] INTEGER NOT NULL)');
                            }).then(() => {
                                console.log("Table created successfully");
                            }).catch(error => {
                                console.log(error);
                            });
                        });
                        resolve(db);
                    })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log("echoTest failed - plugin not functional");
                });
        });

    };

    closeDatabase(db) {
        if (db) {
            console.log("Closing DB");
            db.close()
                .then(status => {
                    console.log("Database CLOSED");
                })
                .catch(error => {
                    //  console.log(error);
                    // this.errorCB(error);
                });
        } else {
            console.log("Database was not OPENED");
        }
    };
    loadDB() {
        this.initDB();
    }



    // listProduct() {
    //     return new Promise((resolve) => {
    //         const products = [];

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT p.prodId, p.prodName FROM Product p', []).then(([tx, results]) => {
    //                     console.log("Query completed");
    //                     var len = results.rows.length;
    //                     for (let i = 0; i < len; i++) {
    //                         let row = results.rows.item(i);
    //                         console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
    //                         const { prodId, prodName } = row;
    //                         products.push({
    //                             prodId,
    //                             prodName,

    //                         });
    //                     }
    //                     console.log(products);
    //                     resolve(products);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // productById(id) {
    //     console.log(id);
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
    //                     console.log(results);
    //                     if (results.rows.length > 0) {
    //                         let row = results.rows.item(0);
    //                         resolve(row);
    //                     }
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // addProduct(prod) {
    //     return new Promise((resolve) => {

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('INSERT INTO Product VALUES (?, ?, ?)', [prod.prodId, prod.prodName, prod.prodDesc]).then(([tx, results]) => {
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // updateProduct(id, prod) {
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?,    WHERE prodId = ?', [prod.prodName, prod.prodDesc, id]).then(([tx, results]) => {
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    // deleteProduct(id) {
    //     return new Promise((resolve) => {
    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
    //                     console.log(results);
    //                     resolve(results);
    //                 });
    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }

    //////////////for period//////////

    adderiod(db, pd) {
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> >>>.......>>>>>> p : " + pd.pName + " /  next : " + pd.pNexpdate);
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT OR IGNORE  INTO Period (pName,pDescription,pCatId,pParityBit,pTime) VALUES ( ?,?,?,?,?)', [pd.pName, pd.pDescription, 1, 0, pd.pTime]).then(([tx, results]) => {
                    resolve(results);
                });


            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addNextPeriod(db, pd) {
        return new Promise((resolve) => {
            db.transaction((tx) => {

                tx.executeSql('INSERT OR IGNORE INTO Period (pName,pDescription,pCatId,pParityBit) VALUES (?,?,?,?)', [pd.pNexpdate, "Next period date", 5, 0]).then(([tx, results]) => {
                    resolve(results);

                });

            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addOvulationPeriod(db, pd) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                for (var i = 0; i < 5; i++) {
                    const nxtOvl = moment(pd.pOvlDate).add(i, 'days').format(_format);
                    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : dn : "+nxtOvl);
                    tx.executeSql('INSERT OR IGNORE INTO Period (pName,pDescription,pCatId,pParityBit) VALUES (?,?,?,?)', [nxtOvl, "Ovulation date", 4, i]).then(([tx, results]) => {
                        resolve(results);
                    });
                }
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

        });
    }
    addOvPeriod(db, upnxtOvl, i) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                // for (var i = 0; i < 5; i++) {
                //     const nxtOvl = moment(upnxtOvl).add(i, 'days').format(_format);
                tx.executeSql('INSERT OR IGNORE INTO Period (pName,pDescription,pCatId,pParityBit) VALUES (?,?,?,?)', [upnxtOvl, "OVL date", 4, i]).then(([tx, results]) => {
                    resolve(results);
                });
                // }
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deletePeriod(db, id) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Period WHERE pId = ?', [id]).then(([tx, results]) => {
                    console.log(results);
                    resolve(results);

                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteElimination(db, id) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Elimination WHERE eId = ?', [id]).then(([tx, results]) => {
                    console.log(results);
                    resolve(results);

                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    deleteNextPeriod(db) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Period WHERE pCatId = 5').then(([tx, results]) => {
                    console.log(results);
                    resolve(results);

                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deleteOvanpPeriod(db) {


        return new Promise((resolve) => {

            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Period WHERE pCatId = 4').then(([tx, results]) => {
                    console.log(results);
                    resolve(results);
                });
            }).then((result) => {

            }).catch((err) => {
                console.log(err);
            });

        });
    }
    updateNextPeriod(db, date) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Period SET pName = ?   WHERE pId = ?', [date._nextDate, date._pPeriod_Id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    getNextPeriod(db) {
        return new Promise((resolve) => {
            const nextP = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Period p WHERE pCatId = 5 ').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId } = row;
                        nextP.push({
                            pId,
                            pName,
                            pCatId,
                        });
                    }

                    resolve(nextP);
                });
            }).then((result) => {

            }).catch((err) => {
                console.log(err);
            });

        });
    }
    updateOVLPeriod(db, date, pCatId) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Period SET pName = ?   WHERE pId = ?', [date, pCatId]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updatePeriod(db, data) {
        return new Promise((resolve) => {
            db.transaction((tx) => {

                tx.executeSql('UPDATE Period SET pName = ?   WHERE pId = ?', [data._pDateandMonth, data._pPeriod_Id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    getOvandnetp(db) {
        return new Promise((resolve) => {
            const pando = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Period p WHERE p.pCatId IN (4,5) ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId, pDescription } = row;
                        pando.push({
                            pId,
                            pName,
                            pCatId,
                            pDescription
                        });
                    }
                    // console.log(products);
                    resolve(pando);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

        });
    }
    updateperiodCurentMonth(data) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Period SET pName = ?   WHERE pId = ?', [data.pName, data.pId]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    // this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }

    listProduct(db) {
        return new Promise((resolve) => {
            const products = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT p.pId, p.pName,p.pCatId,p.pDescription,p.pParityBit,p.pTime FROM Period p ORDER BY p.pName ASC ', []).then(([tx, results]) => {
                    // console.log("Query completed");
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.pId}, Pr Name: ${row.pName}`)
                        const { pId, pName, pCatId, pDescription, pParityBit, pTime } = row;
                        products.push({
                            pId,
                            pName,
                            pCatId,
                            pDescription,
                            pParityBit,
                            pTime
                        });
                    }
                    // console.log(products);
                    resolve(products);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listNotes(db) {
        return new Promise((resolve) => {
            const products = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT p.pId, p.pName,p.pCatId,p.pDescription,p.pParityBit,p.pTime FROM Period p WHERE p.pCatId=6 ORDER BY p.pName ASC ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId, pDescription, pParityBit, pTime } = row;
                        products.push({
                            pId,
                            pName,
                            pCatId,
                            pDescription,
                            pParityBit,
                            pTime
                        });
                    }
                    resolve(products);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });
    }
    listLastPeriodDate(db) {
        return new Promise((resolve) => {
            const products = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Period p WHERE p.pCatId=1 ORDER BY p.pId DESC LIMIT 1 ').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.pId}, Pr Name: ${row.pName}`)
                        const { pId, pName, pCatId } = row;
                        products.push({
                            pId,
                            pName,
                            pCatId

                        });
                    }
                    // console.log(products);
                    resolve(products);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }

    listBag(db) {
        return new Promise((resolve) => {
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT h.hId, h.hName FROM Hospitalbagmother h', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    if (len == 0) {


                    }
                    resolve(len);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //    console.log(err);
            });
            // }).catch((err) => {
            //     //  console.log(err);
            // });
        });
    }
    listBagBaby() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT b.bId, b.bName FROM Hospitalbagbaby b', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        if (len == 0) {


                        }
                        resolve(len);
                    });
                }).then((result) => {
                    // this.closeDatabase(db);
                }).catch((err) => {
                    //    console.log(err);
                });
            }).catch((err) => {
                //  console.log(err);
            });
        });
    }

    listBagLabour(db) {
        return new Promise((resolve) => {
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT l.lId, l.lName FROM LaboRoomPacket l', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    if (len == 0) {


                    }
                    resolve(len);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //    console.log(err);
            });
            // }).catch((err) => {
            //     //  console.log(err);
            // });
        });
    }
    listBabyBagItems(db) {
        return new Promise((resolve) => {
            const baby_bag = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT b.bId, b.bName, b.bStatus,b.bDate FROM Hospitalbagbaby b', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { bId, bName, bStatus, bDate } = row;
                        baby_bag.push({
                            bId,
                            bName,
                            bStatus,
                            bDate,

                        });
                    }
                    // console.log(mother_bag);
                    resolve(baby_bag);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //  console.log(err);
            });

        });
    }
    listMotherBagItems(db) {
        return new Promise((resolve) => {
            const mother_bag = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT h.hId, h.hName, h.hStatus,h.hDate FROM Hospitalbagmother h', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { hId, hName, hStatus, hDate } = row;
                        mother_bag.push({
                            hId,
                            hName,
                            hStatus,
                            hDate,

                        });
                    }
                    // console.log(mother_bag);
                    resolve(mother_bag);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //  console.log(err);
            });

            // }).catch((err) => {
            //     //  console.log(err);
            // });
        });
    }
    countMotherBag(db) {
        return new Promise((resolve) => {
            let motherbag_count;
            db.transaction((tx) => {
                tx.executeSql('SELECT COUNT(hId) AS motherbagcount FROM Hospitalbagmother WHERE hStatus="true"', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { motherbagcount } = row;
                        motherbag_count = motherbagcount;
                    }
                    resolve(motherbag_count);
                });
            }).then((result) => {
            }).catch((err) => {
            });
        });
    }
    countBabyBag(db) {
        return new Promise((resolve) => {
            let babybag_count;
            db.transaction((tx) => {
                tx.executeSql('SELECT COUNT(bId) AS babybagcount FROM Hospitalbagbaby WHERE bStatus="true"', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { babybagcount } = row;
                        babybag_count = babybagcount;
                    }

                    resolve(babybag_count);
                });
            }).then((result) => {
            }).catch((err) => {
            });
        });
    } countLRoomBag(db) {
        return new Promise((resolve) => {
            let lroombag_count;
            db.transaction((tx) => {
                tx.executeSql('SELECT COUNT(lId) AS lroomcount FROM LaboRoomPacket WHERE lStatus="true"', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { lroomcount } = row;
                        lroombag_count = lroomcount;
                    }

                    resolve(lroombag_count);
                });
            }).then((result) => {
            }).catch((err) => {
            });
        });
    }
    updateStatus(db, data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.hStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Hospitalbagmother SET hStatus = ?,hDate=?    WHERE hId = ?', [status, data.date, data.hId]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //   console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    updateStatusBaby(db, data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.bStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Hospitalbagbaby SET bStatus = ?,bDate=?    WHERE bId = ?', [status, data.date, data.bId]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //   console.log(err);
            });
            // }).catch((err) => {
            //     // console.log(err);
            // });
        });
    }
    updateStatusLabourRoom(db, data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.lStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            // console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : " + data.date);
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE LaboRoomPacket SET lStatus = ?,lDate=?    WHERE lId = ?', [status, data.date, data.lId]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //   console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    addItemOfMother_bag(db) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Hospitalbagmother (hName,hStatus) VALUES ("Wearing cloths 05 with bed jacket 04","false"),("Pad pack 02 (with loop)","false"),("A few straps to tie the waist and hair ","false"),("Hot water bottle","false"),("Toothpaste | Toothbrush | Soap","false"),("Milk | Tea leaf | Snacks or biscuits","false"),("IndentifyCard","false"),("Label Bag – Your Name | Address | Age","false"),'
                    + '("Shopping bag 04 (clean)","false"),("Bed sheet 01 (pillow)","false"),("Blade-01 or a bottle of anima","false"),("A pair of rubber slippers","false")').then(([tx, results]) => {
                        resolve(results);
                    });
                tx.executeSql('INSERT INTO Hospitalbagbaby (bName,bStatus) VALUES ("Small Cloths 10-12","false"),'
                    + '("Napkin - 24","false"),("Panel cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Cotton cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Umbillical  card clip -01","false"),("Baby mosquito net","false"),("Small wash basin to wash baby 01","false"),("Rubber sheet -01","false"),("Socks, Caps, Jackets to warm baby","false")').then(([tx, results]) => {
                        resolve(results);
                    });
                tx.executeSql('INSERT INTO Period (pName,pDescription,pCatId,pParityBit) VALUES (14,"BCG",3,0),'
                    + '(60,"OPV",3,0),(120,"OPV & PENTAVALENT",3,0),(180,"OPV & PENTAVALENT",3,0),(270,"MMR",3,0),(360,"live JE",3,0),(540,"OPV and DTP",3,0),(1095,"MMR 2 nd dose",3,0),(1825,"OPV and DT 5th dose",3,0),(3650,"HPV 1st dose",3,0),(3830,"HPV 2nd dose",3,0),(4015,"aTd (adult tetanus diphtheria) 6th dose",3,0)').then(([tx, results]) => {
                        resolve(results);
                    });
                tx.executeSql('INSERT INTO LaboRoomPacket (lName,lStatus) VALUES ("Wearing cloths – 05 with bed jackets – 04","false"),'
                    + '("Baby cloths – 02","false"),("Napkin – 04","false"),("Panel cloth to wrap the baby – 01","false"),("Cotton cloths to wipe the baby – 01","false"),("Umbilical cord up – 01","false"),("Socks,caps,jackets to warm the baby","false")').then(([tx, results]) => {
                        resolve(results);
                    });
                // tx.executeSql('INSERT INTO WightvsLength (wlSam,wlMan,wlNw,wlOw) VALUES (1.7,1.8,2.5,3.3),(2.5,2.6,3.4,4.5)').then(([tx, results]) => {
                //     resolve(results);
                // }); 
                // tx.executeSql('INSERT INTO WightvsLength (wlSam,wlMan,wlNw,wlOw) VALUES (1.7,1.8,2.5,3.3),(2.5,2.6,3.4,4.5),(3.5,3.7,4.6,6),(4.6,5,6,7.8),(5.7,6.18,7.3,9.45),(6.6,7.25,8.5,10.9),(7.5,8.05,9.5,12.4),(8.3,8.9,10.5,13.6),(9.1,9.8,11.55,14.9),(10.2,10.9,12.7,16.4),(11.1,11.95,13.9,17.9),(12,12.9,15.1,19.6),(13,14.1,16.6,21.6),(14.1,15.5,18.2,24)').then(([tx, results]) => {
                //     resolve(results);
                // });
                tx.executeSql('INSERT INTO WightvsLength (wlSam,wlMan,wlNw,wlOw,wlhw) VALUES (1.1,1.6,1.9,3.0,3.1),(2.1,2.5,2.9,4.5,5.1),(3,3.35,3.9,5.8,6.5),(3.8,4.3,4.9,7,8),(4.4,5,5.6,8,9),(5,5.5,6.2,8.7,9.7),(5.4,6,6.7,9.4,10.4),(5.7,6.3,7.1,9.8,11),(6,6.7,7.5,10.3,11.5),(6.2,6.9,7.7,10.65,11.9),(6.4,7.2,8,11,12.3),(6.6,7.4,8.2,11.4,12.65),(6.8,7.6,8.4,11.7,13),(6.95,7.8,8.65,12,13.3),(7.1,7.9,8.8,12.3,13.65),(7.3,8.1,9.05,12.6,14),(7.4,8.3,9.2,12.8,14.3),(7.55,8.45,9.4,13.1,14.6),(7.7,8.6,9.6,13.4,15),(7.8,8.8,9.8,13.65,15.3),(8,8.9,10,14,15.55),(8.1,9.1,10.1,14.2,15.9),(8.25,9.2,10.3,14.5,16.2),(8.4,9.4,10.5,14.75,16.5),(8.5,9.5,10.65,15,16.8),(8.6,9.6,10.8,15.25,17.1)').then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    // addItemOfBloodPresure() {
    //     return new Promise((resolve) => {

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpmin,bpmax) VALUES ("2020-08-13",79,80,120),("2020-08-14",20,80,120),("2020-08-16",40,80,120)').then(([tx, results]) => {
    //                     resolve(results);
    //                 });

    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //             // this.closeDatabase(db);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }
    listBloodPresure(db) {
        return new Promise((resolve) => {

            const blood_presure = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM BloodPresure b ORDER BY b.bpId DESC LIMIT 8 ', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { bpId, bpDate, bpValue, bpsmin, bpdmin, bpdstValue, bpslow, bpsideal, bpsprehigh, bpshigh, bpdlow, bpdideal, bpdprehigh, bpdhigh } = row;
                        blood_presure.push({

                            bpId,
                            bpDate,
                            bpValue,
                            bpsmin,
                            bpdmin,
                            bpdstValue,
                            bpslow,
                            bpsideal,
                            bpsprehigh,
                            bpshigh,
                            bpdlow,
                            bpdideal,
                            bpdprehigh,
                            bpdhigh
                        });
                    }
                    // console.log(mother_bag);
                    resolve(blood_presure);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }

    getPeriodHistory(db) {
        return new Promise((resolve) => {
            const pando = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Period p WHERE p.pCatId=1', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId, pDescription } = row;
                        pando.push({
                            pId,
                            pName,
                            pCatId,
                            pDescription
                        });
                    }
                    // console.log(products);
                    resolve(pando);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

        });
    }

    listWeightGain(db) {
        return new Promise((resolve) => {

            const weight_gain = [];


            // this.initDB().then((db) => {
            db.transaction((tx) => {

                tx.executeSql('SELECT w.wgId, w.wgDate, w.wgValue,w.wgmin,w.wgmax FROM WeightGain w ORDER BY w.wgId ASC LIMIT 10 ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { wgId, wgDate, wgValue, wgmin, wgmax } = row;
                        weight_gain.push({
                            wgId,
                            wgDate,
                            wgValue,
                            wgmin,
                            wgmax,
                        });
                    }
                    // console.log(mother_bag);
                    resolve(weight_gain);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    lastWeightGain(db) {
        return new Promise((resolve) => {

            var lastweight_gain = 0;

            // this.initDB().then((db) => {
            db.transaction((tx) => {

                tx.executeSql('SELECT w.wgValue FROM WeightGain w ORDER BY w.wgId DESC LIMIT 1 ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { wgValue } = row;
                        lastweight_gain = wgValue;
                    }
                    // console.log(mother_bag);
                    resolve(lastweight_gain);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    addItemOfWeightGain() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO WeightGain (wgDate,wgValue,wgmin,wgmax) VALUES ("2020-01-1",0,0,0)').then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    //  this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    addPBvalue(db, pb) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : " + pb.bpValue + "  /  " + pb.bpdstValue + " / " + db);
        return new Promise((resolve) => {
            db.transaction((tx) => {

                tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpdstValue,bpsmin,bpdmin,bpslow,bpsideal,bpsprehigh,bpshigh,bpdlow,bpdideal,bpdprehigh,bpdhigh) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [pb.bpDate, pb.bpValue, pb.bpdstValue, 70, 40, 90, 120, 140, 190, 60, 80, 90, 100]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {

            }).catch((err) => {
                console.log(err);
            });

        });
    }
    addWGvalue(db, wg) {

        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO WeightGain (wgDate,wgValue,wgmin,wgmax) VALUES (?,?,?,?)', [wg.wgDate, wg.wgValue, 80, 120]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((results) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    addKickCount(db, kc) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO KickCount (kcDate,kcCount,kcFirstTime,kcLastTime,kcStatus) VALUES (?,?,?,?,?)', [kc.kcDate, 1, kc.kcTime, kc.kcTime,1]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listKickCount(db, data) {
        return new Promise((resolve) => {
            var kick_count = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM KickCount k WHERE kcDate=?', [data.kcDate]).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { kcId, kcDate, kcCount, kcFirstTime, kcLastTime,kcStatus } = row;
                        kick_count.push({
                            kcId,
                            kcDate,
                            kcCount,
                            kcFirstTime,
                            kcLastTime,
                            kcStatus
                        });
                    }

                    resolve(kick_count);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateClickCountRfValueZoro(db, data) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE KickCount SET kcCount = ?, kcFirstTime=?,kcLastTime=?     WHERE kcDate = ?', [data.kcValue, data.kcTime, data.kclTime, data.kcDate]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateClickCount(db, data) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE KickCount SET kcCount = ?,kcLastTime=?     WHERE kcDate = ?', [data.kcValue, data.kcTime, data.kcDate]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } refreshClickCount(db, data) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE KickCount SET kcCount = ?,kcFirstTime=? ,kcLastTime=?     WHERE kcDate = ?', [0, '00:00:00', '00:00:00', data.kcDate]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }stopKick(db, data) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE KickCount SET kcStatus = ?     WHERE kcDate = ?', [0, data.kcDate]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listAllKickCount(db) {
        return new Promise((resolve) => {
            var kick_count = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM KickCount k').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { kcId, kcDate, kcCount, kcFirstTime, kcLastTime,kcStatus } = row;
                        kick_count.push({
                            kcId,
                            kcDate,
                            kcCount,
                            kcFirstTime,
                            kcLastTime,
                            kcStatus
                        });
                    }
                    resolve(kick_count);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listGetCurrntMonthPeriod(db) {
        return new Promise((resolve) => {
            var kick_count = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT p.pId, p.pName, p.pCatId FROM Period p WHERE p.pCatId IN (1,4,5)  ORDER BY pId ASC', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId } = row;
                        kick_count.push({
                            pId,
                            pName,
                            pCatId,


                        });
                    }
                    resolve(kick_count);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    gwtOvulationDates(db) {
        return new Promise((resolve) => {
            var ovulationDates = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT p.pId, p.pName, p.pCatId FROM Period p WHERE p.pCatId=4 ORDER BY pId ASC', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId } = row;
                        ovulationDates.push({
                            pId,
                            pName,
                            pCatId,
                        });
                    }
                    resolve(ovulationDates);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addEDD(db, pd) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Period VALUES (?, ?,?,?,?,?)', [null, pd.pName, pd.pDescription, 2, 0, '00:00:00']).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } updateEDD(db, data) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Period SET pName = ?   WHERE pId = ?', [data.pName, data.pId]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    getEddDate(db) {
        return new Promise((resolve) => {
            var edd_date = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT p.pId, p.pName FROM Period p WHERE p.pCatId=?', [2]).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, } = row;
                        edd_date.push({
                            pId,
                            pName,


                        });
                    }
                    resolve(edd_date);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }


    // addItemOfBloodPresure() {
    //     return new Promise((resolve) => {

    //         this.initDB().then((db) => {
    //             db.transaction((tx) => {
    //                 tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpmin,bpmax) VALUES ("2020-08-13",79,80,120),("2020-08-14",20,80,120),("2020-08-16",40,80,120)').then(([tx, results]) => {
    //                     resolve(results);
    //                 });

    //             }).then((result) => {
    //                 this.closeDatabase(db);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //             this.closeDatabase(db);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     });
    // }


    addBabyActivity(db, ba) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO BabyActivity (baDate,baText,baTime,baStatus) VALUES (?,?,?,?)', [ba.baDate, ba.baText, ba.baTime, 1]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // this.closeDatabase(db);
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listAllBabyActivity(db) {
        return new Promise((resolve) => {
            var kick_count = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql("SELECT * FROM BabyActivity").then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { baId, baDate, baText, baTime } = row;
                        kick_count.push({
                            baId,
                            baDate,
                            baText,
                            baTime

                        });
                    }
                    resolve(kick_count);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } addFeedingTime(db, fd) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO FeedingTime (fdDate,fdTime,fdText,fdValue,fdStatus) VALUES (?,?,?,?,?)', [fd.fdDate, fd.fdTime, fd.fdText, 1, 1]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } listAllFeedingTime(db) {
        return new Promise((resolve) => {
            var feeding_time = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM FeedingTime ORDER BY fdDate DESC LIMIT 10').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { fdId, fdDate, fdTime, fdText, fdValue } = row;
                        feeding_time.push({
                            fdId,
                            fdDate,
                            fdTime,
                            fdText,
                            fdValue

                        });
                    }

                    resolve(feeding_time);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listFeedingCountByDate(db) {
        return new Promise((resolve) => {
            const feeding_count = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT fdDate,COUNT(fdValue) AS countfd FROM FeedingTime  GROUP BY fdDate LIMIT 10 ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { fdDate, countfd } = row;
                        feeding_count.push({
                            fdDate,
                            countfd
                        });
                    }
                    resolve(feeding_count);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {

                console.log(err);

            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } addUrination(db, u) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Urination (uDate,uTime,uText,uValue,uStatus) VALUES (?,?,?,?,?)', [u.uDate, u.uTime, u.uText, 1, 1]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } listAllUrination(db) {
        return new Promise((resolve) => {
            var feeding_time = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Urination ORDER BY uDate DESC LIMIT 10').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { uId, uDate, uTime, uText, uValue } = row;
                        feeding_time.push({
                            uId,
                            uDate,
                            uTime,
                            uText,
                            uValue

                        });
                    }

                    resolve(feeding_time);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } listUrinationCountByDate(db) {
        return new Promise((resolve) => {

            const urination_count = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT uDate,COUNT(uValue) AS countu FROM Urination  GROUP BY uDate LIMIT 10 ', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { uDate, countu } = row;
                        urination_count.push({

                            uDate,
                            countu


                        });

                    }
                    // console.log(mother_bag);
                    resolve(urination_count);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } addElimination(db, e) {
        return new Promise((resolve) => {

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Elimination (eDate,eTime,eText,eValue,eStatus) VALUES (?,?,?,?,?)', [e.eDate, e.eTime, e.eText, 1, 1]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } listAllElimination(db) {
        return new Promise((resolve) => {
            var eliminate_time = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Elimination ORDER BY eDate DESC LIMIT 10').then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { eId, eDate, eTime, eText, eValue } = row;
                        eliminate_time.push({
                            eId,
                            eDate,
                            eTime,
                            eText,
                            eValue

                        });
                    }

                    resolve(eliminate_time);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } listEliminationCountByDate(db) {
        return new Promise((resolve) => {

            const elimination_count = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT eDate,COUNT(eValue) AS counte FROM Elimination  GROUP BY eDate LIMIT 8 ', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { eDate, counte } = row;
                        elimination_count.push({

                            eDate,
                            counte


                        });

                    }
                    // console.log(mother_bag);
                    resolve(elimination_count);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listVaccination() {
        return new Promise((resolve) => {
            const vaccination = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT v.vId,v.vDays, v.vDescription,v.vStatus FROM Vaccination v', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);

                            const { vId, vDays, vDescription } = row;
                            vaccination.push({
                                vId,
                                vDays,
                                vDescription

                            });
                        }
                        resolve(vaccination);
                    });
                }).then((result) => {
                    // this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    babyData(db, bd) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO BabyDetails VALUES (?, ?,?,?,?)', [null, bd.bName, bd.bWeight, bd.bbDate, 1]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    babyUpdateData(db, dates, bId) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE BabyDetails SET bName = ?,bWeight = ?,bbDate = ?   WHERE bId = ?', [dates.bName, dates.bWeight, dates.bbDate, bId]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listBabyDetails(db) {
        return new Promise((resolve) => {
            const baby_data = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT b.bId, b.bName, b.bWeight, b.bbDate FROM BabyDetails b', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { bId, bName, bWeight, bbDate } = row;
                        baby_data.push({
                            bId,
                            bName,
                            bWeight,
                            bbDate
                        });
                    }
                    resolve(baby_data);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    }
    listWeghtData(db) {
        return new Promise((resolve) => {

            const weigth_data = [];


            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM WightvsLength wl', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { wlId, wlSam, wlMan, wlNw, wlOw, wlhw, wlbaby } = row;
                        weigth_data.push({

                            wlId,
                            wlSam,
                            wlMan,
                            wlNw,
                            wlOw,
                            wlhw,
                            wlbaby

                        });
                    }

                    resolve(weigth_data);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });


        });
    } listLabourRoomBagItems(db) {
        return new Promise((resolve) => {
            const labour_room_bag = [];

            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT l.lId, l.lName, l.lStatus,l.lDate FROM LaboRoomPacket l', []).then(([tx, results]) => {

                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                        const { lId, lName, lStatus, lDate } = row;
                        labour_room_bag.push({
                            lId,
                            lName,
                            lStatus,
                            lDate,

                        });
                    }
                    // console.log(mother_bag);
                    resolve(labour_room_bag);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                //  console.log(err);
            });

            // }).catch((err) => {
            //     //  console.log(err);
            // });
        });
    }
    deleteKicks(db, id) {
        return new Promise((resolve) => {
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM KickCount WHERE kcId = ?', [id]).then(([tx, results]) => {

                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } deleteBlood(db, id) {
        return new Promise((resolve) => {
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM BloodPresure WHERE bpId = ?', [id]).then(([tx, results]) => {

                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } deleteWeight(db, id) {
        return new Promise((resolve) => {
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM WeightGain WHERE wgId = ?', [id]).then(([tx, results]) => {

                    resolve(results);
                });
            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } addNote(db, data) {
        return new Promise((resolve) => {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>;;;;;> : "+data._date+" / "+ data._note);
            db.transaction((tx) => {
                tx.executeSql('INSERT INTO Period (pName,pDescription,pCatId,pParityBit,pTime) VALUES (?, ?,?,?,?)', [data._date, data._note, 6, 0, data.pTime]).then(([tx, results]) => {
                    resolve(results);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
        });
    } PeriodHistory(db) {
        return new Promise((resolve) => {
            var kick_count = [];
            // this.initDB().then((db) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Period p WHERE p.pCatId  IN (1)', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { pId, pName, pCatId } = row;
                        kick_count.push({
                            pId,
                            pName,
                            pCatId,

                        });
                    }
                    resolve(kick_count);
                });

            }).then((result) => {
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });

            // }).catch((err) => {
            //     console.log(err);
            // });
        });
    } deletePeriod(db, id) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Period WHERE pId = ?', [id]).then(([tx, results]) => {

                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });
    }
    addGrouthTracker(db, data) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE WightvsLength SET wlbaby = ?    WHERE wlId = ?', [data._weight, data._month + 1]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addPBathTime(db, data) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('INSERT OR IGNORE  INTO BabyBathTracking (btDate,btStart,btEnd,btText,btStatus) VALUES ( ?,?,?,?,?)', [data.date, data.startTime, data.endtime, "baby bath", 0]).then(([tx, results]) => {
                    resolve(results);
                });


            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listBathsTimes(db) {
        return new Promise((resolve) => {
            const Bath = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT b.btId, b.btDate,b.btStart,b.btEnd FROM BabyBathTracking b ORDER BY b.btDate ASC ', []).then(([tx, results]) => {
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        const { btId, btDate, btStart, btEnd, } = row;
                        Bath.push({
                            btId,
                            btDate,
                            btStart,
                            btEnd,


                        });
                    }
                    resolve(Bath);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });
    } deleteBath(db, id) {
        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM BabyBathTracking WHERE btId = ?', [id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });
    }
    deleteBabyAc(db, id) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM BabyActivity WHERE baId = ?', [id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });

    }
    deleteUrination(db, id) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM Urination WHERE uId = ?', [id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });

    }
    deleteFeeding(db, id) {

        return new Promise((resolve) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM FeedingTime WHERE fdId = ?', [id]).then(([tx, results]) => {
                    resolve(results);
                });
            }).then((result) => {
            }).catch((err) => {
                console.log(err);
            });

        });

    }
}