import "./Order.css";
import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical } from '@fortawesome/free-solid-svg-icons'
import OrderForm from "../components/OrderForm";

function Order() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [order, setOrder] = useState({ firstname: "", lastname: "", email: "" });

  useEffect(function () {
    fetch(
      "https://api.airtable.com/v0/appqK2pLyymq6q5If/Drug?api_key=keyd1QZAa1OCVYSgU"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.records.length; i++) {
          data.records[i].fields["OrderAmount"] = 0;
        }
        setItems(data.records);
        setIsLoading(false);
      })
      .catch(function () {
        alert(
          "There has been an error while connecting airtable. Please try again later."
        );
        setIsLoading(false);
      });
  }, []);

  const orderUpdateHandler = (field, value) => {
    let orderCpy = JSON.parse(JSON.stringify(order));
    orderCpy[field] = value;
    setOrder(orderCpy);
  };

  const sendOrder = () => {
    alert("TODO: request to send: " + JSON.stringify(order));
  };

  return (
    <div className="">
      <div id="banner-bg"></div>
      <div id="main-content" className="container p-3">
        <h1 className="display-4 text-center">
          <FontAwesomeIcon icon={faClinicMedical} /> Digital Pharmacy <FontAwesomeIcon icon={faClinicMedical} />
        </h1>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {!order || !order.drugName ?
              <div className="row gx-4 mt-4">
                {items.map((item, index) => {
                  return (
                    <OrderItem
                      key={index}
                      orderItem={item}
                      orderUpdateHandler={orderUpdateHandler}
                    />
                  );
                })}
              </div>
              :
              <OrderForm order={order} orderUpdateHandler={orderUpdateHandler} sendOrderHandler={sendOrder} />
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
