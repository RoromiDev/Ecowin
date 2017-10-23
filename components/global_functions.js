import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Global from '../src/global'

export const addTransaction = (type, account, amount, category, note, to) => {
    let transactions = Global.TRANSACTIONS;
    let accounts = Global.ACCOUNTS;
    let id = Global.ID;

    if (type == "Expense") {
        transactions.unshift({ account: account, amount: -amount, category: category, date: new Date(), note: note, recurrence: 'Aucune', active: true, id: id });
        accounts[getAccountIndex(account)].total -= amount;
    }
    else if (type == "Income") {
        transactions.unshift({ account: account, amount: amount, category: category, date: new Date(), note: note, recurrence: 'Aucune', active: true, id: id });
        accounts[getAccountIndex(account)].total += amount;
    }
    else if (type == "Transfert") {
        transactions.unshift({ from: account, to: to, amount: amount, category: category, date: new Date(), note: note, recurrence: 'Aucune', active: true, id: id });
        accounts[getAccountIndex(account)].total -= amount;
        accounts[getAccountIndex(to)].total += amount;
    }
    updateGlobalVars(transactions, accounts, id + 1);
    updateLocalStorage(transactions, accounts, id + 1);
}

export const copyTransaction = (type, account, amount, category, note, recurrence, to) => {
    let transactions = Global.TRANSACTIONS;
    let accounts = Global.ACCOUNTS;
    let id = Global.ID;

    if (type == "Expense" || type == "Income") {
        transactions.unshift({ account: account, amount: amount, category: category, date: new Date(), note: note, recurrence: recurrence, active: true, id: id });
        accounts[getAccountIndex(account)].total += amount;
    }
    else if (type == "Transfert") {
        transactions.unshift({ from: account, to: to, amount: amount, category: category, date: new Date(), note: note, recurrence: recurrence, active: true, id: id });
        accounts[getAccountIndex(account)].total -= amount;
        accounts[getAccountIndex(to)].total += amount;
    }
    updateGlobalVars(transactions, accounts, id + 1);
    updateLocalStorage(transactions, accounts, id + 1);
}

export const updateLocalStorage = (transactions, accounts, id, connection) => {
    if (transactions != null) {
        AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    }
    if (accounts != null) {
        AsyncStorage.setItem("accounts", JSON.stringify(accounts));
    }
    if (id != null) {
        AsyncStorage.setItem("id", JSON.stringify(id));
    }
    if (connection != null) {
        AsyncStorage.setItem("connection", JSON.stringify(connection));
    }
}

export const updateGlobalVars = (transactions, accounts, id) => {
    if (transactions != null) {
        Global.TRANSACTIONS = transactions;
    }
    if (accounts != null) {
        Global.ACCOUNTS = accounts;
    }
    if (id != null) {
        Global.ID = id;
    }
}

export const getAccountIndex = (account) => {
    let accounts = Global.ACCOUNTS;

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].name == account) {
            return (i);
        }
    }
    return (0);
}

export const deleteAccount = (account) => {
    let accounts = Global.ACCOUNTS;
    let transactions = Global.TRANSACTIONS;

    for (let i = 0; i < Global.TRANSACTIONS.length; i++) {
        if (transactions[i].account == accounts[getAccountIndex(account.name)].name || transactions[i].from == accounts[getAccountIndex(account.name)].name) {
            if (transactions[i].category == "Transfert") {
                accounts[getAccountIndex(transactions[i].from)].total += transactions[i].amount;
                accounts[getAccountIndex(transactions[i].to)].total -= transactions[i].amount;
            }
            else {
                accounts[getAccountIndex(transactions[i].account)].total += transactions[i].amount;
                accounts[0].total += transactions[i].amount;
            }
            transactions.splice(i, 1);
            i = i - 1;
        }
    }
    accounts[0].total += accounts[getAccountIndex(account.name)].total;
    accounts.splice(getAccountIndex(account.name), 1);
    updateGlobalVars(transactions, accounts);
    updateLocalStorage(transactions, accounts)
}