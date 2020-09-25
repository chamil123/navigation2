import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 2000;

export default class Database {

    initDB() {

        let db;
        return new Promise((resolve) => {
            console.log("Plugin integrity check ...");

            SQLite.echoTest()
                .then(() => {
                    console.log("Integrity check passed ...");
                    console.log("Opening database ...");
                    SQLite.openDatabase(
                        database_name,
                        database_version,
                        database_displayname,
                        database_size
                    ).then(DB => {
                        db = DB;
                        // console.log("Database OPEN");
                        db.executeSql('SELECT 1 FROM Period LIMIT 1').then(() => {
                            console.log("Database is ready ... executing query ...");
                        }).catch((error) => {

                            console.log("Received error: ", error);
                            console.log("Database not yet ready ... populating data");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Period] ([pId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [pName] NVARCHAR(50) NULL,[pDescription] NVARCHAR(255) NULL, [pCatId] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagmother] ([hId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [hName] NVARCHAR(255) NULL, [hStatus] NVARCHAR(10) NULL, [hDate] NVARCHAR(10) NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Hospitalbagbaby] ([bId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bName] NVARCHAR(255) NULL, [bStatus] NVARCHAR(10) NULL, [bDate] NVARCHAR(10) NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BloodPresure] ([bpId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [bpDate] NVARCHAR(25) NULL, [bpValue] INTEGER NOT NULL, [bpmin] INTEGER NOT NULL, [bpmax] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [WeightGain] ([wgId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [wgDate] NVARCHAR(25) NULL, [wgValue] INTEGER NOT NULL, [wgmin] INTEGER NOT NULL, [wgmax] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [KickCount] ([kcId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [kcDate] NVARCHAR(25) NULL, [kcCount] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BabyActivity] ([baId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [baDate] NVARCHAR(25) NULL, [baText] NVARCHAR(255) NULL, [baStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [FeedingTime] ([fdId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [fdDate] NVARCHAR(25) NULL,[fdTime] NVARCHAR(25) NULL, [fdText] NVARCHAR(255) NULL, [fdValue] INTEGER NOT NULL, [fdStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Urination] ([uId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [uDate] NVARCHAR(25) NULL,[uTime] NVARCHAR(25) NULL, [uText] NVARCHAR(255) NULL, [uValue] INTEGER NOT NULL, [uStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [Elimination] ([eId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [eDate] NVARCHAR(25) NULL,[eTime] NVARCHAR(25) NULL, [eText] NVARCHAR(255) NULL, [eValue] INTEGER NOT NULL, [eStatus] INTEGER NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [WightvsLength] ([wlId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, [wlSam] REAL NOT NULL,[wlMan] REAL NOT NULL,[wlNw] REAL NOT NULL,[wlOw] REAL NOT NULL)');
                                tx.executeSql('CREATE TABLE IF NOT EXISTS [BabyDetails] ([bId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,[bName] NVARCHAR(255) NULL,[bWeight] REAL NOT NULL,[bbDate] NVARCHAR(50), [bStatus] INTEGER NOT NULL)');
                                // tx.executeSql('CREATE TABLE IF NOT EXISTS [Vaccination] ([vId] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,[vDays] INTEGER NOT NULL,[vDescription] NVARCHAR(500) NULL, [vStatus] INTEGER NOT NULL)');


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

    adderiod(pd) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Period VALUES (?, ?,?,?)', [null, pd.pName, pd.pDescription, 1]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    deletePeriod(id) {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('DELETE FROM Period WHERE pId = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }

    listProduct() {
        return new Promise((resolve) => {
            const products = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT p.pId, p.pName,p.pCatId,p.pDescription FROM Period p ORDER BY p.pName ASC ', []).then(([tx, results]) => {
                        // console.log("Query completed");
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.pId}, Pr Name: ${row.pName}`)
                            const { pId, pName, pCatId, pDescription } = row;
                            products.push({
                                pId,
                                pName,
                                pCatId,
                                pDescription
                            });
                        }
                        // console.log(products);
                        resolve(products);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listLastPeriodDate() {
        return new Promise((resolve) => {
            const products = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Period p WHERE p.pCatId=1 ORDER BY p.pId DESC LIMIT 1 ').then(([tx, results]) => {
                        // console.log("Query completed");
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    listBag() {
        return new Promise((resolve) => {
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT h.hId, h.hName FROM Hospitalbagmother h', []).then(([tx, results]) => {
                        var len = results.rows.length;
                        if (len == 0) {


                        }
                        resolve(len);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //    console.log(err);
                });
            }).catch((err) => {
                //  console.log(err);
            });
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    //    console.log(err);
                });
            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    listBabyBagItems() {
        return new Promise((resolve) => {
            const baby_bag = [];

            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    //  console.log(err);
                });

            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    listMotherBagItems() {
        return new Promise((resolve) => {
            const mother_bag = [];

            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    //  console.log(err);
                });

            }).catch((err) => {
                //  console.log(err);
            });
        });
    }
    updateStatus(data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.hStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Hospitalbagmother SET hStatus = ?,hDate=?    WHERE hId = ?', [status, data.date, data.hId]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateStatusBaby(data) {
        return new Promise((resolve) => {
            let status = "";
            if (data.bStatus == "true") {
                status = "false";
            } else {
                status = "true";
            }
            //  console.log(">>>>>>>>>>>>>>>>>>> date eka >>>>>>>>>>>> : "+data.date);
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Hospitalbagbaby SET bStatus = ?,bDate=?    WHERE bId = ?', [status, data.date, data.bId]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    //   console.log(err);
                });
            }).catch((err) => {
                // console.log(err);
            });
        });
    }
    addItemOfMother_bag() {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Hospitalbagmother (hName,hStatus) VALUES ("Wearing cloths 05 with bed jacket 04","false"),'
                        + '("Shopping bag 04 (clean)","false"),("Bed sheet 01 (pillow)","false"),("Blade-01 or a bottle of anima","false"),("A pair of rubber slippers","false")').then(([tx, results]) => {
                            resolve(results);
                        });
                    tx.executeSql('INSERT INTO Hospitalbagbaby (bName,bStatus) VALUES ("Small Cloths 10-12","false"),'
                        + '("Napkin - 24","false"),("Panel cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Cotton cloths to wrap the baby -03 (length 36 width 36 inch)","false"),("Umbillical  card clip -01","false"),("Baby mosquito net","false"),("Small wash basin to wash baby 01","false"),("Rubber sheet -01","false"),("Socks, Caps, Jackets to warm baby","false")').then(([tx, results]) => {
                            resolve(results);
                        });
                    tx.executeSql('INSERT INTO Period (pName,pDescription,pCatId) VALUES (14,"BCG",3),'
                        + '(60,"OPV",3),(120,"OPV & PENTAVALENT",3),(180,"OPV & PENTAVALENT",3),(270,"MMR",3),(360,"live JE",3),(540,"OPV and DTP",3),(1095,"MMR 2 nd dose",3),(1825,"OPV and DT 5th dose",3),(3650,"HPV 1st dose",3),(3830,"HPV 2nd dose",3),(4015,"aTd (adult tetanus diphtheria) 6th dose",3)').then(([tx, results]) => {
                            resolve(results);
                        });
                        // tx.executeSql('INSERT INTO WightvsLength (wlSam,wlMan,wlNw,wlOw) VALUES (1.7,1.8,2.5,3.3),(2.5,2.6,3.4,4.5)').then(([tx, results]) => {
                        //     resolve(results);
                        // }); 
                    tx.executeSql('INSERT INTO WightvsLength (wlSam,wlMan,wlNw,wlOw) VALUES (1.7,1.8,2.5,3.3),(2.5,2.6,3.4,4.5),(3.5,3.7,4.6,6),(4.6,5,6,7.8),(5.7,6.18,7.3,9.45),(6.6,7.25,8.5,10.9),(7.5,8.05,9.5,12.4),(8.3,8.9,10.5,13.6),(9.1,9.8,11.55,14.9),(10.2,10.9,12.7,16.4),(11.1,11.95,13.9,17.9),(12,12.9,15.1,19.6),(13,14.1,16.6,21.6),(14.1,15.5,18.2,24)').then(([tx, results]) => {
                            resolve(results);
                        }); 
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
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
    listBloodPresure() {
        return new Promise((resolve) => {

            const blood_presure = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM BloodPresure b ORDER BY b.bpId DESC LIMIT 8 ', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { bpId, bpDate, bpValue, bpmin, bpmax } = row;
                            blood_presure.push({

                                bpId,
                                bpDate,
                                bpValue,
                                bpmin,
                                bpmax,


                            });
                        }
                        // console.log(mother_bag);
                        resolve(blood_presure);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }

    listWeightGain() {
        return new Promise((resolve) => {

            const weight_gain = [];


            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    lastWeightGain() {
        return new Promise((resolve) => {

            var lastweight_gain = 0;

            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    addPBvalue(pb) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO BloodPresure (bpDate,bpValue,bpmin,bpmax) VALUES (?,?,?,?)', [pb.bpDate, pb.bpValue, 80, 120]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addWGvalue(wg) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO WeightGain (wgDate,wgValue,wgmin,wgmax) VALUES (?,?,?,?)', [wg.wgDate, wg.wgValue, 80, 120]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addKickCount(kc) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO KickCount (kcDate,kcCount) VALUES (?,?)', [kc.kcDate, kc.kcValue]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listKickCount(data) {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KickCount k WHERE kcDate=?', [data.kcDate]).then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { kcId, kcDate, kcCount } = row;
                            kick_count.push({
                                kcId,
                                kcDate,
                                kcCount,

                            });
                        }
                        resolve(kick_count);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    updateClickCount(data) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE KickCount SET kcCount = ?    WHERE kcDate = ?', [data.kcValue, data.kcDate]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listAllKickCount() {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM KickCount k').then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { kcId, kcDate, kcCount } = row;
                            kick_count.push({
                                kcId,
                                kcDate,
                                kcCount,

                            });
                        }
                        resolve(kick_count);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listGetCurrntMonthPeriod() {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Period p WHERE p.pCatId=?', [1]).then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { pId, pName, } = row;
                            kick_count.push({
                                pId,
                                pName,


                            });
                        }
                        resolve(kick_count);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    addEDD(pd) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Period VALUES (?, ?,?,?)', [null, pd.pName, pd.pDescription, 2]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    getEddDate() {
        return new Promise((resolve) => {
            var edd_date = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Period p WHERE p.pCatId=?', [2]).then(([tx, results]) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
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


    addBabyActivity(ba) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO BabyActivity (baDate,baText,baStatus) VALUES (?,?,?)', [ba.baDate, ba.baText, 1]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
                // this.closeDatabase(db);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listAllBabyActivity() {
        return new Promise((resolve) => {
            var kick_count = [];
            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM BabyActivity ').then(([tx, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { baId, baDate, baText } = row;
                            kick_count.push({
                                baId,
                                baDate,
                                baText,

                            });
                        }
                        resolve(kick_count);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } addFeedingTime(fd) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO FeedingTime (fdDate,fdTime,fdText,fdValue,fdStatus) VALUES (?,?,?,?,?)', [fd.fdDate, fd.fdTime, fd.fdText, 1, 1]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } listAllFeedingTime() {
        return new Promise((resolve) => {
            var feeding_time = [];
            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listFeedingCountByDate() {
        return new Promise((resolve) => {
            const feeding_count = [];
            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {

                    console.log(err);

                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } addUrination(u) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Urination (uDate,uTime,uText,uValue,uStatus) VALUES (?,?,?,?,?)', [u.uDate, u.uTime, u.uText, 1, 1]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    } listAllUrination() {
        return new Promise((resolve) => {
            var feeding_time = [];
            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } listUrinationCountByDate() {
        return new Promise((resolve) => {

            const urination_count = [];

            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } addElimination(e) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Elimination (eDate,eTime,eText,eValue,eStatus) VALUES (?,?,?,?,?)', [e.eDate, e.eTime, e.eText, 1, 1]).then(([tx, results]) => {
                        resolve(results);
                    });

                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    } listAllElimination() {
        return new Promise((resolve) => {
            var eliminate_time = [];
            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    } listEliminationCountByDate() {
        return new Promise((resolve) => {

            const elimination_count = [];

            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    } babyData(bd) {
        return new Promise((resolve) => {

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO BabyDetails VALUES (?, ?,?,?,?)', [null, bd.bName, bd.bWeight, bd.bbDate, 1]).then(([tx, results]) => {
                        resolve(results);
                    });
                    console.log(">>>>>>>>>?????????????????<<<<<<<<LLLLLLLLLLLL : " + bd.bName + " / " + bd.bWeight + " / " + bd.bbDate);
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }
    listBabyDetails() {
        return new Promise((resolve) => {
            const baby_data = [];
            this.initDB().then((db) => {
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
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }  
      listWeghtData() {
        return new Promise((resolve) => {

            const weigth_data = [];

            this.initDB().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM WightvsLength wl', []).then(([tx, results]) => {

                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            // console.log(`Prr ID: ${row.hId}, Pr Name: ${row.hName}`)
                            const { wlId, wlSam, wlMan, wlNw, wlOw } = row;
                            weigth_data.push({

                                wlId,
                                wlSam,
                                wlMan,
                                wlNw,
                                wlOw,


                            });
                        }
                       
                        resolve(weigth_data);
                    });
                }).then((result) => {
                    this.closeDatabase(db);
                }).catch((err) => {
                    console.log(err);
                });

            }).catch((err) => {
                console.log(err);
            });
        });
    }

}