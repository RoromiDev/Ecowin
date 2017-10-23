import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Card, CardItem, Text, Body, Badge, Right, Icon } from 'native-base';
import Global from '../src/global'
import moment from 'moment';
import 'moment/locale/fr';

export class AccountFullTransactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: Global.TRANSACTIONS
        };
    }

    getDateFormat(date) {
        return (moment(date).format('Do MMMM YYYY'))
    }

    recordsLength(elem) {
        return (this.state.transactions.length);
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

    sortByDate() {
        let tmp = [];
        for (let i = 0; i < this.state.transactions.length; i++) {
            if (this.state.transactions[i].account == this.props.account.name) {
                tmp.push(this.state.transactions[i]);
            }
        }
        return (tmp);
    }

    detailsTransaction(elem) {
        this.props.navigation.navigate('DetailsTransaction', { transaction: elem });
    }

    render() {
        return (
            <View style={{ marginTop: 0 }}>
                <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >TOUTES LES TRANSACTIONS</Text>
                {this.sortByDate().map((elem, i) => elem.category != "Transfert" ? elem.amount >= 0 ?
                    <TouchableOpacity key={i} onPress={() => this.detailsTransaction(elem)}>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                            <Body style={{ flex: 2 }}>
                                <Text style={{ fontSize: 11, marginBottom: 2, fontFamily: 'Avenir', fontWeight: '300', marginTop: -5 }}>{this.getDateFormat(elem.date)}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Avenir', fontWeight: '400' }}>{elem.category}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Icon style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginTop: 2 }} name='ios-paper' />
                                    <Text style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginLeft: 5, fontFamily: 'Avenir', fontWeight: '300' }}>{elem.note}</Text>
                                </View>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Badge style={{ backgroundColor: '#66bb6a' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16, marginTop: 2 }}>{parseFloat(elem.amount).toFixed(2)} €</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity key={i} onPress={() => this.detailsTransaction(elem)}>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                            <Body style={{ flex: 2 }}>
                                <Text style={{ fontSize: 11, marginBottom: 2, fontFamily: 'Avenir', fontWeight: '300', marginTop: -5 }}>{this.getDateFormat(elem.date)}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Avenir', fontWeight: '400' }}>{elem.category}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Icon style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginTop: 2 }} name='ios-paper' />
                                    <Text style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginLeft: 5, fontFamily: 'Avenir', fontWeight: '300' }}>{elem.note}</Text>
                                </View>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Badge style={{ backgroundColor: '#ef5350' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16, marginTop: 2 }}>{parseFloat(elem.amount).toFixed(2)}€</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity key={i} onPress={() => this.detailsTransaction(elem)}>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                            <Body style={{ flex: 2 }}>
                                <Text style={{ fontSize: 11, marginBottom: 2, fontFamily: 'Avenir', fontWeight: '300', marginTop: -5 }}>{this.getDateFormat(elem.date)}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'Avenir', fontWeight: '400' }}>{elem.from} -> {elem.to} </Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Icon style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginTop: 2 }} name='ios-paper' />
                                    <Text style={{ fontSize: 13, color: 'rgb(86, 86, 86)', marginLeft: 5, fontFamily: 'Avenir', fontWeight: '300' }}>{elem.note}</Text>
                                </View>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Badge style={{ backgroundColor: 'rgb(86, 86, 86)' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16, marginTop: 2 }}>{parseFloat(elem.amount).toFixed(2)}€</Text>
                                </Badge>
                            </Right>
                        </CardItem>
                    </TouchableOpacity>
                )}
                {this.sortByDate().length != 0 ?
                    null
                    :
                    <CardItem style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(248, 248, 248)' }}>
                        <Text style={{ flex: 2, color: 'rgb(200, 200, 200)', fontFamily: 'Avenir', fontWeight: '300', fontSize: 16 }}>Aucunes transactions</Text>
                    </CardItem>
                }
            </View>
        );
    }
}
