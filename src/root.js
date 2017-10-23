import React, { Component } from 'react';
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { StartScreen } from './start'
import { HomeScreen } from './index'
import { AccountAdd } from './account_add'
import { TransactionNew } from './transaction_new'
import { ListTransactions } from './list_transactions'
import { ListExpenses } from './list_expenses'
import { ListIncomes } from './list_incomes'
import { TransactionDetails } from './transaction_details'
import Global from './global'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

const Router = StackNavigator({
    Home: {
        screen: StartScreen,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    List: {
        screen: HomeScreen,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    AddAccount: {
        screen: AccountAdd,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    NewTransaction: {
        screen: TransactionNew,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    AllTransactionsList: {
        screen: ListTransactions,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    AllExpensesList: {
        screen: ListExpenses,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
    AllIncomesList: {
        screen: ListIncomes,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
   DetailsTransaction: {
        screen: TransactionDetails,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    }
}, {
        transitionConfig: () => ({
            screenInterpolator: (sceneProps) => {
                if (
                    sceneProps.index === 1 &&
                    sceneProps.scene.route.routeName == 'List'
                ) return null
                return CardStackStyleInterpolator.forHorizontal(sceneProps)
            },
        })
    })

export class RootScreen extends Component {
    render() {
        return (
            <Root>
                <Router />
            </Root>
        );
    }
}