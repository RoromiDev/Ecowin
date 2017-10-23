import React, { Component } from 'react';
import { View, AsyncStorage, ScrollView, TouchableOpacity, Alert, StyleSheet, TextInput } from 'react-native';
import { Container, Item, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, ActionSheet, Tabs, Tab, ScrollableTab, Badge, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Global from './global'
import { TabViewAnimated, TabViewPagerScroll, TabViewPagerPan, TabBar, SceneMap } from 'react-native-tab-view';
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment';
import 'moment/locale/fr';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: Global.ACCOUNTS,
      transaction: this.props.navigation.state.params.transaction,
      transactions: Global.TRANSACTIONS
    };
  }

  goBack() {
    this.props.navigation.goBack();
  }

  onValueChange(value) {
    let tmp = this.state.transaction;
    tmp.name = value;
    this.setState({
      transaction: tmp
    });
  }

  onValueChange2(value) {
    let tmp = this.state.transaction;
    tmp.category = value;
    this.setState({
      transaction: tmp
    });
  }

  onValueChange3(value) {
    let tmp = this.state.transaction;
    tmp.recurrence = value;
    this.setState({
      transaction: tmp
    });
  }

  alertDeleteTransaction() {
    Alert.alert(
      'Supprimer la transaction ?',
      '',
      [
        { text: 'Oui', onPress: () => this.removeTransaction() },
        { text: 'Non', onPress: () => console.log('Cancel Pressed') },
      ],
      { cancelable: false }
    )
  }

  getDateFormat(date) {
    return (moment(date).format('Do MMMM YYYY'))
  }

  filterAccounts(elem) {
    return (elem.filter(elem => elem.name != 'Tout vos comptes'));
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
      textStyle={{ color: 'black', fontFamily: 'Avenir', fontWeight: '300', fontSize: 15 }}
      mode="dropdown"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '97%' }}
      selectedValue={this.state.transaction.category}
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
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '97%' }}
        mode="dropdown"
        selectedValue={this.state.transaction.name}
        onValueChange={this.onValueChange.bind(this)}
        textStyle={{ color: 'black', fontFamily: 'Avenir', fontWeight: '300', fontSize: 15 }}
      >
        {this.filterAccounts(this.state.accounts).map((elem, i) =>
          <Item label={elem.name} value={elem.name} key={elem.name} />
        )}
      </Picker>
    }
    else {
      return <Content></Content>
    }
  }

  returnItemsViewRecurrence() {
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
      textStyle={{ color: 'black', fontFamily: 'Avenir', fontWeight: '300', fontSize: 15 }}
      mode="dropdown"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '97%' }}
      selectedValue={this.state.transaction.recurrence}
      onValueChange={this.onValueChange3.bind(this)}
    >
      <Item label="Aucune" value="Aucune" />
      <Item label="Mensuelle" value="Mensuelle" />
    </Picker>
  }

  changeNote(text) {
    let tmp = this.state.transaction;
    tmp.note = text;
    this.setState({
      transaction: tmp
    });
  }

  validateChange() {
    let tmp = this.state.transactions;
    for (let i = 0; i < this.state.transactions.length; i++) {
      if (this.state.transactions[i].date == this.state.transaction.date) {
        tmp[i].category = this.state.transaction.category;
        tmp[i].note = this.state.transaction.note;
      }
    }
    Global.TRANSACTIONS = tmp;
    AsyncStorage.setItem("transactions", JSON.stringify(tmp));
    this.props.navigation.navigate('List');
  }

  textInputFocused() {
    //do your stuff here. scroll screen up
  }

  removeTransaction() {
    let tmp = this.state.transactions;
    let tmp2 = this.state.accounts;
    for (let i = 0; i < this.state.transactions.length; i++) {
      if (this.state.transactions[i].id == this.state.transaction.id) {
        if (this.state.transaction.category == "Transfert") {
          this.updateTotal(this.state.transaction.to, this.state.transaction.amount);
          this.updateTotal(this.state.transaction.from, -this.state.transaction.amount);
        }
        else {
          this.updateTotal(this.state.transaction.account, this.state.transaction.amount);
        }
        tmp.splice(i, 1);
        i = i - 1;
      }
    }
    Global.TRANSACTIONS = tmp;
    AsyncStorage.setItem("transactions", JSON.stringify(tmp));
    this.props.navigation.navigate('List');
  }

  updateTotal(name, amount) {
    let tmp = this.state.accounts;
    for (let i = 0; i < this.state.accounts.length; i++) {
      if (this.state.accounts[i].name == name) {
        tmp[i].total -= amount;
      }
    }
    Global.ACCOUNTS = tmp;
    AsyncStorage.setItem("accounts", JSON.stringify(tmp));
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'rgb(248, 248, 248)' }}>
        <Header style={{ borderBottomWidth: 0, backgroundColor: 'rgb(44, 44, 44)' }}>
          <Left style={{ padding: 6, flex: 1 }}>
            <Icon style={{ padding: 6, color: 'white', fontSize: 30 }} onPress={() => this.goBack()} name='ios-arrow-back' />
          </Left>
          <Body style={{ flex: 2 }}>
            <Title style={{ color: 'white', fontFamily: 'Avenir', fontSize: 16 }}>DÉTAILS</Title>
          </Body>
          <Right style={{ padding: 6, flex: 1 }}>
            <Icon style={{ padding: 6, color: 'white', fontSize: 50 }} onPress={() => this.validateChange()} name='ios-checkmark' />
          </Right>
        </Header>
        <Container style={{ backgroundColor: 'white' }}>
          <View style={{ backgroundColor: 'rgb(44, 44, 44)', padding: 4 }}>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
              <Text style={{ fontSize: 17, color: 'white', padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >MONTANT</Text>
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Avenir', fontWeight: '300' }}>{parseFloat(this.state.transaction.amount).toFixed(2)} €</Text>
              </View>
            </View>
          </View>
          <KeyboardAwareScrollView>
            {this.state.transaction.category != "Transfert" ?
              <View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >COMPTE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%' }} >{this.state.transaction.account}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >DATE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%' }} >{this.getDateFormat(this.state.transaction.date)}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >CATÉGORIE</Text>
                  {this.returnItemsViewCategory()}
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >NOTE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5 }}>
                    <TextInput {...this.props}
                      onFocus={this.textInputFocused.bind(this)}
                      maxLength={50}
                      returnKeyType='done'
                      onChangeText={(text) => this.changeNote(text)} style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%', textAlign: 'center' }} value={this.state.transaction.note} />
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >RÉCURRENCE</Text>
                  {this.returnItemsViewRecurrence()}
                </View>
              </View>
              :
              <View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >COMPTES</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%' }} >{this.state.transaction.from} -> {this.state.transaction.to}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >DATE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%' }} >{this.getDateFormat(this.state.transaction.date)}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >CATÉGORIE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%' }} >{this.state.transaction.category}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >NOTE</Text>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: 30, borderRadius: 15, margin: 5 }}>
                    <TextInput {...this.props}
                      onFocus={this.textInputFocused.bind(this)}
                      maxLength={50}
                      returnKeyType='done'
                      onChangeText={(text) => this.changeNote(text)} style={{ fontSize: 15, padding: 5, fontFamily: 'Avenir', fontWeight: '300', marginLeft: 10, height: '100%', textAlign: 'center' }} value={this.state.transaction.note} />
                  </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: 4 }}>
                  <Text style={{ fontSize: 17, padding: 5, fontFamily: 'Avenir', fontWeight: '300' }} >RÉCURRENCE</Text>
                  {this.returnItemsViewRecurrence()}
                </View>
              </View>
            }
          </KeyboardAwareScrollView>
        </Container>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.alertDeleteTransaction()} style={{ backgroundColor: '#ef5350' }}>
              <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '300', fontSize: 17, textAlign: 'center', height: '100%', paddingTop: 15 }}>Supprimer la transaction</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
