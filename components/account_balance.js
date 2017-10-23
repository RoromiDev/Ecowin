import React, { Component } from 'react';
import { Card, CardItem, Text, Body, View } from 'native-base';

export class AccountBalance extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 17, color: 'white', padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >EPARGNE</Text>
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}>{parseFloat(this.props.total).toFixed(2)} €</Text>
                </View>
            </View>
        );
    }
}
