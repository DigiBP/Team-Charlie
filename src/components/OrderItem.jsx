import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

function OrderItem({ orderItem, orderUpdateHandler }) {
  return (
    <div className="item-card col-12 col-sm-4 mb-4 mt-3">
      <div className="p-3 border bg-light text-center">
        <p className="h5 fw-bold">
          {orderItem.fields.Name}
          {orderItem.fields.IsOtc ? null : <span className='text-warning' title="needs prescription"> <FontAwesomeIcon icon={faExclamationTriangle} /></span>}
        </p>
        <p>{orderItem.fields.Price} CHF</p>
        <div className="clearfix d-flex justify-content-center">
          {orderItem.fields.AmountInStock > 0 ?
            <button
              className="btn btn-outline-success"
              onClick={() => orderUpdateHandler("drugName", orderItem.fields.Name)}
            >
              Order
            </button>
            :
            <button
              className="btn btn-outline-danger disbaled"
            >
              Not in stock
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
