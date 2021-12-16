import "./Order.css";
import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClinicMedical, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import OrderForm from "../components/OrderForm";

function Order() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [alert, setAlert] = useState({});
  const defaultPersonalInfo = { firstname: "", lastname: "", email: "", street: "", place: "" }
  let [order, setOrder] = useState(defaultPersonalInfo);

  const tenantId = "charlie";
  const processId = "DrugOrderService";

  useEffect(function () {
    fetch("https://api.airtable.com/v0/appqK2pLyymq6q5If/Drug?api_key=keyd1QZAa1OCVYSgU"
    ).then(function (response) {
      return response.json();
    }).then(function (data) {
      setItems(data.records);
      setIsLoading(false);
    }).catch(function () {
      setAlert({ "success": false, "message": <span>There has been an error while connecting airtable. Please try again later.</span> });
      setIsLoading(false);
    });
  }, []);

  const orderUpdateHandler = (field, value, id) => {
    let orderCpy = JSON.parse(JSON.stringify(order));
    orderCpy[field] = value;
    if (orderCpy.drugName) {
      setAlert({ "success": true, "message": <span>Your selection was successful (1x {orderCpy.drugName}). To finalize your order, please provide your personal information below.</span> });
    }
    if (id) {
      orderCpy["drugId"] = id;
    }
    setOrder(orderCpy);
  };

  const sendOrder = () => {
    if (order.firstname && order.lastname && order.email && order.street && order.place) {
      setIsLoading(true);
      fetch('https://digibp.herokuapp.com/engine-rest/process-definition/key/' + processId + '/tenant-id/' + tenantId + '/submit-form', {
        method: 'post',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({
          "variables": {
            "drugId": { "value": order.drugId, "type": "String" },
            "drugName": { "value": order.drugName, "type": "String" },
            "firstname": { "value": order.email, "type": "String" },
            "lastname": { "value": order.email, "type": "String" },
            "email": { "value": order.email, "type": "String" },
            "street": { "value": order.street, "type": "String" },
            "place": { "value": order.place, "type": "String" }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        getAndCompleteCamundaTask(data.id);
      }).catch(function () {
        showError();
      });
    }
  };

  const getAndCompleteCamundaTask = (processInstanceId) => {
    fetch('https://digibp.herokuapp.com/engine-rest/task/?processInstanceId=' + processInstanceId, {
      headers: new Headers({ 'content-type': 'application/json' })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data && data.length >= 1) {
        fetch('https://digibp.herokuapp.com/engine-rest/task/' + data[0].id + '/complete', {
          method: 'post',
          headers: new Headers({ 'content-type': 'application/json' })
        }).then(function () {
          setAlert({ "success": true, "message": <span>Your order was successful! We will shortly reach out to you.</span> });
          setOrder(defaultPersonalInfo);
          setIsLoading(false);
        }).catch(function () {
          showError();
        });
      } else {
        showError();
      }
    }).catch(function () {
      showError();
    });
  }

  const showError = () => {
    setAlert({ "error": false, "message": <span>There has been an error while connecting to Camunda. Please try again later.</span> });
    setIsLoading(false);
  }

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
            {alert && alert.message ?
              <div className={"mt-4 offset-md-3 col-md-6 alert " + (alert.success ? "alert-success" : "alert-danger")} role="alert">
                {alert.message}
              </div>
              : null}
            {!order || !order.drugName ?
              <div className="row gx-4 mt-4">
                <div className="w-100 text-center mb-2 mt-2 fw-bold h5"><FontAwesomeIcon className="text-warning" icon={faExclamationTriangle} /> = needs prescription</div>
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
