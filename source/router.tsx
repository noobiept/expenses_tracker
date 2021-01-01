import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import UpdateExpense from "./pages/update_expense";
import ExpenseList from "./pages/expense_list";
import CreateExpense from "./pages/create_expense";
import { NavList } from "./styles";

export default function Router() {
    return (
        <BrowserRouter>
            <nav>
                <NavList>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create_expense">Add</Link>
                    </li>
                </NavList>
            </nav>
            <Switch>
                <Route path="/" exact component={ExpenseList} />
                <Route path="/expense/:id" component={UpdateExpense} />
                <Route path="/create_expense" exact component={CreateExpense} />
            </Switch>
        </BrowserRouter>
    );
}
