import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, TextInput } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ActionSheet, Form, Item, Label, Input, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Global from './global'

export class AccountAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            total: "",
            accounts: Global.ACCOUNTS,
            check: false
        };
    }

    validateAccount() {
        let UID123 = this.state.accounts;
        UID123.push({ name: this.state.name, total: parseFloat(this.state.total) });
        Global.ACCOUNTS = UID123;
        AsyncStorage.setItem("accounts", JSON.stringify(UID123));
        this.props.navigation.navigate('List');
    }

    goBack() {
        this.props.navigation.goBack(null);
    }

    isDigit(number) {
        let check = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-',];
        for (let j = 0; j < number.length; j++) {
            if (number[j] != '1' && number[j] != '2' && number[j] != '3' && number[j] != '4' && number[j] != '5' && number[j] != '6'
                && number[j] != '7' && number[j] != '8' && number[j] != '9' && number[j] != '0' && number[j] != '.' && number[j] != '-') {
                return false;
            }
        }
        return true;
    }

    onChangeNumber(text) {
        this.setState({
            total: text
        })
        if (isNaN(parseFloat(text)) == false && this.isDigit(text) == true) {
            this.setState({
                check: true
            });
        }
        else {
            this.setState({
                check: false
            });
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(44, 44, 44)' }}>
                <Header style={{ borderBottomWidth: 0, backgroundColor: 'rgb(44, 44, 44)' }}>
                    <Left style={{ padding: 6, flex: 1 }}>
                        <Icon style={{ padding: 6, color: 'white', fontSize: 30 }} onPress={() => this.goBack()} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: 'white', fontFamily: 'Avenir', fontSize: 16 }}>NOUVEAU COMPTE</Title>
                    </Body>
                    <Right style={{ padding: 6, flex: 1 }}>
                        <Icon style={{ color: 'transparent' }} name='ios-checkmark' />
                    </Right>
                </Header>
                <Container style={{ backgroundColor: 'white', paddingLeft: 10, paddingRight: 10 }}>
                    <View>
                        <Text style={{ fontSize: 17, color: 'black', padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginTop: 5, marginLeft: 5 }} >NOM DU COMPTE</Text>
                        {this.state.name != "" ?
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, paddingLeft: 5, borderColor: '#66bb6a', borderWidth: 1 }}>
                                <TextInput {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    maxLength={50}
                                    returnKeyType='done'
                                    onChangeText={(text) => this.setState({ name: text })} style={{ fontSize: 16, color: 'black', fontFamily: 'Avenir', fontWeight: '300', height: 30, paddingLeft: 5 }} />
                            </View>
                            :
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, paddingLeft: 5, borderColor: '#ef5350', borderWidth: 1 }}>
                                <TextInput {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    maxLength={50}
                                    returnKeyType='done'
                                    onChangeText={(text) => this.setState({ name: text })} style={{ fontSize: 16, color: 'black', fontFamily: 'Avenir', fontWeight: '300', height: 30, paddingLeft: 5 }} />
                            </View>
                        }
                        <Text style={{ fontSize: 17, color: 'black', padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginTop: 5, marginLeft: 5 }} >MONTANT</Text>
                        {this.state.check == true ?
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, paddingLeft: 5, borderColor: '#66bb6a', borderWidth: 1 }}>
                                <TextInput {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    maxLength={12}
                                    returnKeyType='done'
                                    keyboardType='numbers-and-punctuation'
                                    value={this.state.total}
                                    onChangeText={(text) => this.onChangeNumber(text)} style={{ fontSize: 16, color: 'black', fontFamily: 'Avenir', fontWeight: '300', height: 30, paddingLeft: 5 }} />
                            </View>
                            :
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, paddingLeft: 5, borderColor: '#ef5350', borderWidth: 1 }}>
                                <TextInput {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                    maxLength={12}
                                    returnKeyType='done'
                                    keyboardType='numbers-and-punctuation'
                                    value={this.state.total}
                                    onChangeText={(text) => this.onChangeNumber(text)} style={{ fontSize: 16, color: 'black', fontFamily: 'Avenir', fontWeight: '300', height: 30, paddingLeft: 5 }} />
                            </View>
                        }
                    </View>
                </Container>
                <Footer>
                    <FooterTab>
                        {this.state.check != false && this.state.name != "" ?
                            <Button full style={{ backgroundColor: '#66bb6a' }} onPress={() => this.validateAccount()}>
                                <Text style={{ fontSize: 17, color: 'white', fontFamily: 'Avenir', fontWeight: '300', height: '100%', display: 'flex', height: 40, paddingTop: 15 }}>VALIDER</Text>
                            </Button>
                            :
                            <Button disabled full style={{ backgroundColor: '#ef5350' }} onPress={() => this.validateAccount()}>
                                <Text style={{ fontSize: 17, color: 'white', fontFamily: 'Avenir', fontWeight: '300', height: '100%', display: 'flex', height: 40, paddingTop: 15 }}>VALIDER</Text>
                            </Button>
                        }
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    footerIcon: {
        fontSize: 30,
        color: 'white'
    }
});