import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Container } from 'native-base';
import { copyTransaction, updateLocalStorage } from '../components/global_functions'
import Global from './global'

export class StartScreen extends Component {
    constructor(props) {
        super(props);
        this.getId();
    }

    getId() {
        AsyncStorage.getItem("id").then((value) => {
            if (value != null) {
                Global.ID = JSON.parse(value);
            }
        }).done(this.getTransactions());
    }

    getTransactions() {
        AsyncStorage.getItem("transactions").then((value) => {
            if (value != null) {
                Global.TRANSACTIONS = JSON.parse(value);
            }
        }).done(this.getAccounts());
    }

    getAccounts() {
        AsyncStorage.getItem("accounts").then((value) => {
            if (value != null) {
                Global.ACCOUNTS = JSON.parse(value);
            }
        }).done(this.getConnection());
    }

    alertAddTransactions() {
        Alert.alert(
            'Informations',
            'Les dépenses mensuelles ont été ajoutés',
            [
                { text: 'OK', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        )
    }

    getConnection() {
        let connection = Global.CONNECTION;

        AsyncStorage.getItem("connection").then((value) => {
            if (value != null) {
                connection = JSON.parse(value);
                connection.new = new Date().getMonth().toString();
            }
            else {
                connection.last = new Date().getMonth().toString();
                connection.new = new Date().getMonth().toString();
            }
            if (parseInt(connection.last) < parseInt(connection.new)) {
                this.addTransactions();
                this.alertAddTransactions();
            }
            connection.last = connection.new;
            updateLocalStorage(null, null, null, connection);
            this.props.navigation.navigate('List');
        }).done();
    }

    addTransactions() {
        let transactions = Global.TRANSACTIONS;
        let accounts = Global.ACCOUNTS;

        for (let i = 0; i < Global.TRANSACTIONS.length; i++) {
            if (Global.TRANSACTIONS[i].recurrence == 'Mensuelle' && Global.TRANSACTIONS[i].active == true) {
                transactions[i].active = false;
                if (Global.TRANSACTIONS[i].category != "Transfert") {
                    copyTransaction("Expense", Global.TRANSACTIONS[i].account, parseFloat(Global.TRANSACTIONS[i].amount), Global.TRANSACTIONS[i].category, Global.TRANSACTIONS[i].note, Global.TRANSACTIONS[i].recurrence);
                }
                else {
                    copyTransaction("Transfert", Global.TRANSACTIONS[i].from, parseFloat(Global.TRANSACTIONS[i].amount), Global.TRANSACTIONS[i].category, Global.TRANSACTIONS[i].note, Global.TRANSACTIONS[i].recurrence, Global.TRANSACTIONS[i].to);
                }
            }
        }
    }

    render() {
        return (
            <Container>

            </Container>
        )
    }
}