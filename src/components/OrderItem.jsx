function OrderItem({ index, orderItem, updateOrderAmountHandler }) {
  return (
    <div key={index} className="item-card col-12 col-sm-4 mb-4 mt-3">
      <div className="p-3 border bg-light text-center">
        <p className="h5 fw-bold">{orderItem.fields.Name}</p>
        <p>{orderItem.fields.Price} CHF</p>
        <div className="clearfix d-flex justify-content-center">
          <button
            className="btn btn-outline-danger btn-less-amount"
            onClick={() => updateOrderAmountHandler(index, -1)}
          >
            -
          </button>
          <input
            type="text"
            className="amount-input form-control"
            readOnly={true}
            value={orderItem.fields.OrderAmount}
          />
          <button
            id="send-button"
            className="btn btn-outline-success btn-more-amount"
            onClick={() => updateOrderAmountHandler(index, 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
