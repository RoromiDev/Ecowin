import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Container, ScrollableTab, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ActionSheet, Form, Item, Label, Input, Picker, Tabs, Tab, Thumbnail, Image, Platform, Separator } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Global from './global'
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';
import { addTransaction } from '../components/global_functions'

export class TransactionNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.navigation.state.params.active == 0 ? 0 : this.props.navigation.state.params.active - 1,
            accounts: Global.ACCOUNTS,
            transactions: Global.TRANSACTIONS,
            recordTotal: "0",
            recordCategory: "Aucune",
            recordNote: "",
            activeTab: 0,
            index: this.props.navigation.state.params.index,
            routes: [
                { key: '1', title: 'DÉPENSE' },
                { key: '2', title: 'REVENU' },
                { key: '3', title: 'TRANSFERT' }
            ],
            transfert: 0
        };
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label} />;

    _renderScene = ({ route }) => {
        return (
            <View style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                <View style={{ height: '100%', width: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.index == 0 ?
                        <Text style={{ fontSize: 37, marginTop: -10, fontFamily: 'Avenir', fontWeight: '300' }}>-</Text>
                        :
                        <Text style={{ fontSize: 37, marginTop: -10, fontFamily: 'Avenir', fontWeight: '300' }}>+</Text>
                    }
                </View>
                <View style={{ height: '100%', width: '68%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 45, fontFamily: 'Avenir', fontWeight: '300' }}>{this.state.recordTotal}</Text>
                </View>
                <View style={{ height: '100%', width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontFamily: 'Avenir', fontWeight: '300' }}>EUR</Text>
                </View>
            </View>
        )
    };

    onValueChange(value) {
        this.setState({
            active: value
        });
    }

    onValueChange2(value) {
        this.setState({
            recordCategory: value
        });
    }

    onValueChange3(value) {
        this.setState({
            transfert: value
        });
    }

    changeActiveTab(index) {
        this.setState({
            activeTab: index
        });
    }

    filterAccounts(elem) {
        return (elem.filter(elem => elem.name != 'Tout vos comptes'));
    }

    alertNul() {
        if (parseFloat(this.state.recordTotal) == 0) {
            Alert.alert(
                'Transaction de 0€ impossible',
                '',
                [
                    { text: 'OK', onPress: () => console.log('Cancel Pressed') },
                ],
                { cancelable: false }
            )
        }
        else if (this.state.index == 2 && this.state.active == this.state.transfert) {
            Alert.alert(
                'Transfert au même compte impossible',
                '',
                [
                    { text: 'OK', onPress: () => console.log('Cancel Pressed') },
                ],
                { cancelable: false }
            )
        }
        else {
            this.validateNewTransaction();
        }
    }

    returnItemsViewAccount() {
        if (this.state.accounts != null && this.state.accounts.length != 0) {
            return <Picker
                renderHeader={backAction =>
                    <Header style={{ backgroundColor: "rgb(44, 44, 44)" }}>
                        <Left style={{ flex: 0 }}>
                            <Button transparent onPress={backAction}>
                                <Icon name="arrow-back" style={{ color: "#fff", fontSize: 30 }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#fff", fontFamily: 'Avenir', fontSize: 16 }}>CHOISIR UN COMPTE</Title>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <Icon style={{ color: 'transparent' }} name='ios-menu' />
                        </Right>
                    </Header>}
                textStyle={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}
                mode="dropdown"
                style={{ height: "33%", width: "100%", color: "white" }}
                selectedValue={this.state.active}
                onValueChange={this.onValueChange.bind(this)}
            >
                {this.filterAccounts(this.state.accounts).map((elem, i) =>
                    <Item label={elem.name} value={i} key={elem.name} />
                )}
            </Picker>
        }
        else {
            return <Content></Content>
        }
    }

    returnItemsViewAccount2() {
        if (this.state.accounts != null && this.state.accounts.length != 0) {
            return <Picker
                renderHeader={backAction =>
                    <Header style={{ backgroundColor: "rgb(44, 44, 44)" }}>
                        <Left style={{ flex: 0 }}>
                            <Button transparent onPress={backAction}>
                                <Icon name="arrow-back" style={{ color: "#fff", fontSize: 30 }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: "#fff", fontFamily: 'Avenir', fontSize: 16 }}>CHOISIR UN COMPTE</Title>
                        </Body>
                        <Right style={{ flex: 0 }}>
                            <Icon style={{ color: 'transparent' }} name='ios-menu' />
                        </Right>
                    </Header>}
                textStyle={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}
                mode="dropdown"
                style={{ height: "33%", width: "100%", color: "white" }}
                selectedValue={this.state.transfert}
                onValueChange={this.onValueChange3.bind(this)}
            >
                {this.filterAccounts(this.state.accounts).map((elem, i) =>
                    <Item label={elem.name} value={i} key={elem.name} />
                )}
            </Picker>
        }
        else {
            return <Content></Content>
        }
    }

    returnItemsViewCategory() {
        return <Picker
            renderHeader={backAction =>
                <Header style={{ backgroundColor: "rgb(44, 44, 44)" }}>
                    <Left style={{ flex: 0 }}>
                        <Button transparent onPress={backAction}>
                            <Icon name="arrow-back" style={{ color: "#fff", fontSize: 30 }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "#fff", fontFamily: 'Avenir', fontSize: 16 }}>CHOISIR UNE CATÉGORIE</Title>
                    </Body>
                    <Right style={{ flex: 0 }}>
                        <Icon style={{ color: 'transparent' }} name='ios-menu' />
                    </Right>
                </Header>}
            textStyle={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}
            mode="dropdown"
            style={{ height: "33%", width: "100%", color: "white" }}
            selectedValue={this.state.recordCategory}
            onValueChange={this.onValueChange2.bind(this)}
        >
            <Item label="Aucune" value="Aucune" />
            <Item label="Nourriture et boissons" value="Nourriture et boissons" />
            <Item label="Shopping" value="Shopping" />
            <Item label="Maison" value="Maison" />
            <Item label="Transport" value="Transport" />
            <Item label="Véhicule" value="Véhicule" />
            <Item label="Divertissement" value="Divertissement" />
            <Item label="Communication, PC" value="Communication, PC" />
            <Item label="Investissement" value="Investissement" />
            <Item label="Transfert" value="Transfert" />
            <Item label="Autre" value="Autre" />
        </Picker>
    }

    validateNewTransaction() {
        if (this.state.index == 0) {
            addTransaction("Expense", this.state.accounts[parseFloat(this.state.active) + 1].name, parseFloat(this.state.recordTotal), this.state.recordCategory, this.state.recordNote == '' ? 'Aucun détails' : this.state.recordNote);
        }
        else if (this.state.index == 1) {
            addTransaction("Income", this.state.accounts[parseFloat(this.state.active) + 1].name, parseFloat(this.state.recordTotal), this.state.recordCategory, this.state.recordNote == '' ? 'Aucun détails' : this.state.recordNote);
        }
        else if (this.state.index == 2) {
            addTransaction("Transfert", this.state.accounts[parseFloat(this.state.active) + 1].name, parseFloat(this.state.recordTotal), "Transfert", this.state.recordNote == '' ? 'Aucun détails' : this.state.recordNote, this.state.accounts[parseFloat(this.state.transfert) + 1].name);
        }
        this.props.navigation.navigate('List');
    }

    addDigitToRecord(digit) {
        if (this.state.recordTotal == "0") {
            this.setState({
                recordTotal: digit
            });
        }
        else {
            if (this.state.recordTotal.indexOf('.') > -1) {
                if (this.state.recordTotal.length - this.state.recordTotal.indexOf('.') < 3) {
                    this.setState({
                        recordTotal: this.state.recordTotal + digit
                    });
                }
            }
            else {
                this.setState({
                    recordTotal: this.state.recordTotal + digit
                });
            }
        }
    }

    removeDigitToRecord() {
        if (this.state.recordTotal.length == 1) {
            this.setState({
                recordTotal: "0"
            });
        }
        else {
            this.setState({
                recordTotal: this.state.recordTotal.substring(0, this.state.recordTotal.length - 1)
            });
        }
    }

    addDotToRecord() {
        if (this.state.recordTotal.indexOf('.') <= -1) {
            this.setState({
                recordTotal: this.state.recordTotal + '.'
            });
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(44, 44, 44)' }}>
                <Header style={{ borderBottomWidth: 0, backgroundColor: 'rgb(44, 44, 44)', elevation: 0 }}>
                    <Left style={{ padding: 6, flex: 1 }}>
                        <Icon style={{ padding: 6, color: 'white', fontSize: 30 }} onPress={() => this.props.navigation.navigate('List')} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: 'white', fontFamily: 'Avenir', fontSize: 16 }}>TRANSACTION</Title>
                    </Body>
                    <Right style={{ flex: 1, padding: 6 }}>
                        <Icon onPress={() => this.alertNul()} style={{ fontSize: 50, paddingLeft: 10, paddingRight: 10, color: 'white' }} name='ios-checkmark' />
                    </Right>
                </Header>
                <View style={{ height: '30%' }}>
                    <TabViewAnimated style={styles.container}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderHeader={this._renderHeader}
                        onIndexChange={this._handleIndexChange}
                    />
                </View>
                <View style={{ height: '22%', paddingTop: 10 }}>
                    <View style={{ height: '50%', width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'rgb(44, 44, 44)' }}>
                        {this.state.index != 2 ?
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ height: '100%', width: '45%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'rgb(218, 218, 218)', fontFamily: 'Avenir', fontWeight: '300' }}>Compte</Text>
                                    {this.returnItemsViewAccount()}
                                </View>
                                <View style={{ height: '100%', width: '10%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                                </View>
                                <View style={{ height: '100%', width: '45%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'rgb(218, 218, 218)', fontFamily: 'Avenir', fontWeight: '300' }}>Catégorie</Text>
                                    {this.returnItemsViewCategory()}
                                </View>
                            </View>
                            :
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View style={{ height: '100%', width: '45%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'rgb(218, 218, 218)', fontFamily: 'Avenir', fontWeight: '300' }}>Compte</Text>
                                    {this.returnItemsViewAccount()}
                                </View>
                                <View style={{ height: '100%', width: '10%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Icon style={{ color: 'white', fontSize: 35 }} name='arrow-round-forward' />
                                </View>
                                <View style={{ height: '100%', width: '45%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 13, color: 'rgb(218, 218, 218)', fontFamily: 'Avenir', fontWeight: '300' }}>Compte</Text>
                                    {this.returnItemsViewAccount2()}
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{ backgroundColor: 'rgb(44, 44, 44)', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}>
                        <Item rounded style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 40, paddingLeft: 5, borderColor: 'transparent' }}>
                            <Label style={{ fontSize: 15, color: 'rgb(218, 218, 218)', marginLeft: 5, fontFamily: 'Avenir', fontWeight: '300' }}>Note</Label>
                            <Input style={{ fontSize: 17, color: 'white', fontFamily: 'Avenir', fontWeight: '300' }} value={this.state.recordNote} onChangeText={(text) => this.setState({ recordNote: text })} />
                        </Item>
                    </View>
                </View>
                <View style={styles.keyboard}>
                    <View style={styles.keyboardColumn}>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('1')}>
                            <View>
                                <Text style={styles.text}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('2')}>
                            <View>
                                <Text style={styles.text}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('3')}>
                            <View>
                                <Text style={styles.text}>3</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyboardColumn}>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('4')}>
                            <View>
                                <Text style={styles.text}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('5')}>
                            <View>
                                <Text style={styles.text}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('6')}>
                            <View>
                                <Text style={styles.text}>6</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyboardColumn}>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('7')}>
                            <View>
                                <Text style={styles.text}>7</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('8')}>
                            <View>
                                <Text style={styles.text}>8</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('9')}>
                            <View>
                                <Text style={styles.text}>9</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyboardColumn}>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDotToRecord()}>
                            <View>
                                <Text style={styles.text}>.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.addDigitToRecord('0')}>
                            <View>
                                <Text style={styles.text}>0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.keyboardTouch} onPress={() => this.removeDigitToRecord()}>
                            <View>
                                <Icon style={styles.text} name='ios-backspace' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    footerIcon: {
        fontSize: 30,
        color: 'white'
    },
    keyboard: {
        height: '37%',
        width: '100%',
        backgroundColor: 'rgb(44, 44, 44)'
    },
    keyboardColumn: {
        height: '25%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    keyboardTouch: {
        height: '100%',
        width: '33.3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabbar: {
        backgroundColor: 'rgb(44, 44, 44)',
        elevation: 0
    },
    tab: {
        padding: 3,
    },
    indicator: {
        backgroundColor: 'rgb(226, 33, 66)',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
        fontFamily: 'Avenir',
        fontSize: 13
    },
    text: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'Avenir',
        fontWeight: '300'
    }
});