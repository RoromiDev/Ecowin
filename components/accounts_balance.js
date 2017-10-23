import React, { Component } from 'react';
import { Card, CardItem, Text, Body, View } from 'native-base';
import Global from '../src/global'

export class AccountsBalance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accounts: Global.ACCOUNTS
        };
    }

    getBalance() {
        let balance = 0;
        for (let i = 1; i < this.state.accounts.length; i++) {
            balance += this.state.accounts[i].total;
        }
        return (parseFloat(balance).toFixed(2));
    }

    render() {
        return (
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, color: 'white', padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >EPARGNE</Text>
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}>{this.getBalance()} €</Text>
                </View>
            </View>
        );
    }
}
