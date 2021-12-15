function OrderForm({ order, orderUpdateHandler, sendOrderHandler }) {
    return (
        <div className="row">
            <div className="order-form offset-md-3 col-md-6 mt-1 mb-4">
                <h3 className="w-100 text-center"><strong>Personal Information</strong></h3>
                <label className="fw-bold mt-2">Firstname:</label>
                <input type="text"
                    id="firstname-field"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("firstname", e.target.value)}
                    value={order.firstname}  />
                <label className="fw-bold mt-2">Lastname:</label>
                <input type="text"
                    id="lastname-field"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("lastname", e.target.value)}
                    value={order.lastname} />
                <label className="fw-bold mt-2">Email:</label>
                <input type="text"
                    id="email-field"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("email", e.target.value)}
                    value={order.email} />
                <label className="fw-bold mt-2">Street/Nr.:</label>
                <input type="text"
                    id="street-field"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("street", e.target.value)}
                    value={order.street} />
                <label className="fw-bold mt-2">Zip/Place:</label>
                <input type="text"
                    id="street-place"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("place", e.target.value)}
                    value={order.place} />
                <button className="btn btn-success mt-4 mb-2" onClick={() => sendOrderHandler()}>Confirm & send order</button>
            </div>
        </div>
    );
}

export default OrderForm;