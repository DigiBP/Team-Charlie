function OrderItem({ orderItem, orderUpdateHandler }) {
  return (
    <div className="item-card col-12 col-sm-4 mb-4 mt-3">
      <div className="p-3 border bg-light text-center">
        <p className="h5 fw-bold">{orderItem.fields.Name}</p>
        <p>{orderItem.fields.Price} CHF</p>
        <div className="clearfix d-flex justify-content-center">
          <button
            className="btn btn-outline-success"
            onClick={() => orderUpdateHandler("drugName", orderItem.fields.Name)}
          >
            Order {orderItem.fields.Name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
