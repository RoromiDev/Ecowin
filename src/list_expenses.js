import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    ScrollView
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ActionSheet, Tabs, Tab, ScrollableTab, Badge } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { AccountBalance } from '../components/account_balance'
import { AccountFullExpenses } from '../components/account_full_expenses'
import { AccountsBalance } from '../components/accounts_balance'
import { AccountsFullExpenses } from '../components/accounts_full_expenses'
import moment from 'moment';
import 'moment/locale/fr';
import Global from './global'
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';

export class ListExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: Global.ACCOUNTS,
            index: this.props.navigation.state.params != undefined ? this.props.navigation.state.params.active : 0,
            routes: this.generateRouting()
        };
    }


    generateRouting() {
        let tmp = [];
        for (let i = 0; i < Global.ACCOUNTS.length; i++) {
            tmp.push({ key: "" + i + "", title: Global.ACCOUNTS[i].name });
        }
        return (tmp);
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label} />;

    _renderScene = ({ route }) => {
        return (
            <ScrollView style={{ backgroundColor: 'rgb(44, 44, 44)' }}>
                {this.state.accounts[parseInt(route.key)].name != 'Tout vos comptes' ?
                    <View style={{ height: '500%', backgroundColor: 'white' }}>
                        <View style={{ backgroundColor: 'rgb(44, 44, 44)', padding: 4 }}>
                            <AccountBalance total={this.state.accounts[parseInt(route.key)].total} />
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 4 }}>
                            <AccountFullExpenses account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
                        </View>
                    </View>
                    :
                    <View style={{ height: '500%', backgroundColor: 'white' }}>
                        <View style={{ backgroundColor: 'rgb(44, 44, 44)', padding: 4 }}>
                            <AccountsBalance total={this.state.accounts[parseInt(route.key)].total} />
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 4 }}>
                            <AccountsFullExpenses account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
                        </View>
                    </View>
                }
            </ScrollView>
        )
    };

    changePage(index, state) {
        if (state == 2) {
            if (index == 0) {
                this.props.navigation.navigate('AddAccount');
            }
            else if (index == 1) {
                this.props.navigation.navigate('NewTransaction', { active: this.state.index });
            }
        }
        else {
            if (index == 0) {
                this.props.navigation.navigate('AddAccount');
            }
        }
    }

    deleteAccount() {
        let UID123 = this.state.accounts;
        UID123.splice(this.state.index, 1);
        Global.ACCOUNTS = UID123;
        AsyncStorage.setItem("accounts", JSON.stringify(UID123));
        this.props.navigation.navigate('List');
    }

    alertDeleteAccount() {
        Alert.alert(
            'Supprimer le compte',
            this.state.accounts[this.state.index].name,
            [
                { text: 'Oui', onPress: () => this.deleteAccount() },
                { text: 'Non', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false }
        )
    }

    returnTabsView() {
        return (
            <TabViewAnimated style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onIndexChange={this._handleIndexChange}
            />
        )
    }

    goBack() {
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
                <Header style={{ borderBottomWidth: 0, backgroundColor: 'rgb(44, 44, 44)', elevation: 0 }}>
                    <Left style={{ padding: 6, flex: 1 }}>
                        <Icon style={{ padding: 6, color: 'white', fontSize: 30 }} onPress={() => this.goBack()} name='ios-arrow-back' />
                    </Left>
                    <Body style={{ flex: 2 }}>
                        <Title style={{ color: 'white', fontFamily: 'Avenir', fontSize: 16 }}>DÉPENSES</Title>
                    </Body>
                    <Right style={{ padding: 6, flex: 1 }}>
                        <Icon style={{ padding: 6, color: 'transparent', fontSize: 30 }} name='ios-arrow-back' />
                    </Right>
                </Header>
                {this.returnTabsView()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: 'rgb(44, 44, 44)',
        elevation: 0
    },
    tab: {
        padding: 3,
        width: 220,
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
});