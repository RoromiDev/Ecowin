import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Card, CardItem, Text, Body, Badge, Right, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Global from '../src/global'
import moment from 'moment';
import 'moment/locale/fr';

export class AccountsLastExpenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: Global.TRANSACTIONS
        };
    }

    getDateFormat(date) {
        return (moment(date).format('Do MMMM YYYY'))
    }

    sortByDate() {
        let tmp = [];
        for (let i = 0; i < this.state.transactions.length; i++) {
            if (this.state.transactions[i].amount < 0)
                tmp.push(this.state.transactions[i]);
        }
        return (tmp);
    }

    alertDeleteAccount(elem) {
        Alert.alert(
            'Confirmation',
            'Modifier la transaction ?',
            [
                { text: 'Oui', onPress: () => this.detailsTransaction(elem) },
                { text: 'Non', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        )
    }

    detailsTransaction(elem) {
        this.props.navigation.navigate('DetailsTransaction', { transaction: elem });
    }

    render() {
        return (
            <View style={{ marginTop: 0 }}>
                <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >DERNIÈRES DÉPENSES</Text>
                {this.sortByDate().map((elem, i) => i < 5 ? elem.category != "Transfert" ? elem.amount >= 0 ?
                    null
                    :
                    <TouchableOpacity key={i} onPress={() => this.detailsTransaction(elem)}>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                            <Body style={{ flex: 2 }}>
                                <Text style={{ fontSize: 11, marginBottom: 2, fontFamily: 'Avenir', fontWeight: '300', marginTop: -5 }}>{elem.account} - {this.getDateFormat(elem.date)}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Avenir', fontWeight: '400' }}>{elem.category}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Icon style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginTop: 2 }} name='ios-paper' />
                                    <Text style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginLeft: 5, fontFamily: 'Avenir', fontWeight: '300' }}>{elem.note}</Text>
                                </View>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Badge style={{ backgroundColor: '#ef5350' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16, marginTop: 2 }}>{parseFloat(elem.amount).toFixed(2)} €</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                    :
                    null
                    :
                    null
                )}
                {this.sortByDate().length != 0 ?
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AllExpensesList') }}>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                            <Text style={{ flex: 2, color: 'rgb(200, 200, 200)', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16 }}>Voir toutes les dépenses</Text>
                            <Right style={{ flex: 1 }}>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                    :
                    <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                        <Text style={{ flex: 2, color: 'rgb(200, 200, 200)', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16 }}>Aucunes dépenses</Text>
                    </CardItem>}
            </View>
        );
    }
}
