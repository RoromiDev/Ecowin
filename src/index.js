import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ActionSheet, Tabs, Tab, ScrollableTab, Badge } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { AccountBalance } from '../components/account_balance'
import { AccountLastTransactions } from '../components/account_last_transactions'
import { AccountLastIncomes } from '../components/account_last_incomes'
import { AccountLastExpenses } from '../components/account_last_expenses'
import { AccountsBalance } from '../components/accounts_balance'
import { AccountsLastTransactions } from '../components/accounts_last_transactions'
import { AccountsLastIncomes } from '../components/accounts_last_incomes'
import { AccountsLastExpenses } from '../components/accounts_last_expenses'
import Global from './global'
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';
import SplashScreen from 'react-native-splash-screen'
import { deleteAccount } from '../components/global_functions'

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: Global.ACCOUNTS,
      transactions: Global.TRANSACTIONS,
      index: 0,
      routes: this.generateRouting()
    };

    setTimeout(() => { SplashScreen.hide() }, 500)
  }

  generateRouting() {
    let tmp = [];

    for (let i = 0; i < Global.ACCOUNTS.length; i++) {
      tmp.push({ key: "" + i + "", title: Global.ACCOUNTS[i].name });
    }
    return (tmp);
  }

  changePage(index, state) {
    if (state == 2) {
      if (index == 0) {
        this.props.navigation.navigate('AddAccount');
      }
      else if (index == 1) {
        this.props.navigation.navigate('NewTransaction', { active: this.state.index, index: 0 });
      }
      else if (index == 2) {
        this.props.navigation.navigate('NewTransaction', { active: this.state.index, index: 1 });
      }
      else if (index == 3) {
        this.props.navigation.navigate('NewTransaction', { active: this.state.index, index: 2 });
      }
    }
    else {
      if (index == 0) {
        this.props.navigation.navigate('AddAccount');
      }
    }
  }

  deleteAccount() {
    deleteAccount(this.state.accounts[this.state.index]);
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

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props}
    scrollEnabled
    indicatorStyle={styles.indicator}
    style={styles.tabbar}
    tabStyle={styles.tab}
    labelStyle={styles.label} />;

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

  returnAddButton() {
    return <Right style={styles.addButton}>
      <Icon onPress={() => {
        this.state.accounts != null && this.state.accounts.length > 1 ?
          ActionSheet.show(
            {
              options: [
                { text: "Ajouter un compte" },
                { text: "Nouvelle dépense" },
                { text: "Nouveau revenu" },
                { text: "Nouveau transfert" },
                { text: "Cancel" }
              ],
              cancelButtonIndex: 4,
              destructiveButtonIndex: 4,
              title: "Choisir une action"
            },
            (buttonIndex) => {
              this.changePage(buttonIndex, 2);
            }
          )
          :
          ActionSheet.show(
            {
              options: [
                { text: "Ajouter un compte" },
                { text: "Cancel" }
              ],
              cancelButtonIndex: 2,
              destructiveButtonIndex: 2,
              title: "Choisir une action"
            },
            (buttonIndex) => {
              this.changePage(buttonIndex, 1);
            }
          )
      }} style={styles.addButtonIcon} name='md-add' />
    </Right>
  }

  _renderScene = ({ route }) => {
    return (
      <ScrollView style={styles.tabbar}>
        {this.state.accounts[parseInt(route.key)].name != 'Tout vos comptes' ?
          <View style={styles.scene}>
            <View style={styles.balance}>
              <AccountBalance total={this.state.accounts[parseInt(route.key)].total} />
            </View>
            <View style={styles.transactions}>
              <AccountLastTransactions account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
            <View style={styles.transactions}>
              <AccountLastIncomes account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
            <View style={styles.transactions}>
              <AccountLastExpenses account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
            <View style={styles.transactions}>
              <Button full rounded onPress={() => { this.alertDeleteAccount() }} style={styles.buttonDelete}>
                <Text style={styles.buttonDeleteText}>Supprimer le compte</Text>
              </Button>
            </View>
          </View>
          :
          <View style={styles.scene}>
            <View style={styles.balance}>
              <AccountsBalance total={this.state.accounts[parseInt(route.key)].total} />
            </View>
            <View style={styles.transactions}>
              <AccountsLastTransactions account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
            <View style={styles.transactions}>
              <AccountsLastIncomes account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
            <View style={styles.transactions}>
              <AccountsLastExpenses account={this.state.accounts[parseInt(route.key)]} active={this.state.index} navigation={this.props.navigation} />
            </View>
          </View>
        }
      </ScrollView>
    )
  };

  render() {
    return (
      <Container style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Icon style={{ color: 'transparent' }} name='ios-menu' />
          </Left>
          <Body style={{ flex: 2 }}>
            <Title style={styles.headerTitle}>VOS COMPTES</Title>
          </Body>
          {this.returnAddButton()}
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
  scene: {
    height: '300%',
    backgroundColor: 'white'
  },
  balance: {
    backgroundColor: 'rgb(44, 44, 44)',
    padding: 4
  },
  transactions: {
    backgroundColor: 'white',
    padding: 4
  },
  buttonDelete: {
    backgroundColor: '#ef5350',
    height: 40,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    shadowColor: '#000',
    shadowRadius: 1.5,
    shadowOpacity: 0.1,
    shadowOffset: { "width": 0, "height": 2 },
    elevation: 3
  },
  buttonDeleteText: {
    flex: 2,
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center'
  },
  addButton: {
    padding: 6,
    flex: 1
  },
  addButtonIcon: {
    fontSize: 30,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white'
  },
  header: {
    borderBottomWidth: 0,
    backgroundColor: 'rgb(44, 44, 44)',
    elevation: 0
  },
  headerTitle: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 16
  }
});