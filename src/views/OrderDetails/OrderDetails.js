import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";

import Chat from "../../components/OrderInfo/Chat/Chat";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import { getMyOrders } from "../../store/actions/ordersActions";
import "./OrderDetails.scss";

const OrderDetails = (props) => {
  const { id, type } = useParams("id");

  const order = useSelector((state) => {
    let prop = type === "closed" ? "myPastOrders" : "myActiveOrders";
    return state.orders[prop].find((order) => order.id === +id);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (order === undefined) {
      console.log("run effect");
      dispatch(getMyOrders());
    }
  }, [order]);

  return (
    <div className="order-details-ctn">
      <div className="breadcrumb">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/my-trades">My Trades</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {true ? "Buying BCH from " : "Selling BCH to "}
            <Link to={`/user-profile/${order?.username}`}>
              {order?.username}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="order-info">
        <Chat />
        <OrderInfo />
      </div>
    </div>
  );
};

export default OrderDetails;