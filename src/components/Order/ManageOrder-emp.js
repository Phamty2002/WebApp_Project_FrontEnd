import React from "react";
import PlaceOrder from "./PlaceOrder1";
import GetOrder from "./GetOrder";
import UpdateOrder from "./UpdateOrder";
import DeleteOrder from "./DeleteOrder";
import Header from "../Header/Header-Emp";
import TheFooter from "../Footer/Thefooter";
import './ManageOrder.css';


function ManageOrder() {
    return (
        <div>
            <Header />
            <div className="manageOrder-container">
                <h1>Manage Orders</h1>
                <div className="order-operations">
                    <section>
                        <h2>Place an Order</h2>
                        <PlaceOrder />
                    </section>
                    <section>
                        <h2>Get Order Details</h2>
                        <GetOrder />
                    </section>
                    <section>
                        
                        <UpdateOrder />
                    </section>
                    <section>
                        <h2>Delete an Order</h2>
                        <DeleteOrder />
                    </section>
                </div>
            </div>
            <TheFooter />
        </div>
    );
}

export default ManageOrder;
