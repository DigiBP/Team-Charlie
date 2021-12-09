function OrderForm({ order, orderUpdateHandler, sendOrderHandler }) {
    return (
        <div className="row">
            <div className="order-form offset-md-3 col-md-6 pt-4 mt-4 mb-4">
                <div class="alert alert-success" role="alert">
                    Your selection was successful (1x {order.drugName}).
                    To finalize your order, please provide your personal information below.
                </div>
                <h3 className="w-100 text-center"><strong>Personal Information</strong></h3>
                <label className="fw-bold mt-2 d-none">Firstname:</label>
                <input type="text"
                    id="email-firstname"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("firstname", e.target.value)}
                    value={order.firstname}
                    className="d-none" />
                <label className="fw-bold mt-2 d-none">Lastname:</label>
                <input type="text"
                    id="email-lastname"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("lastname", e.target.value)}
                    value={order.lastname}
                    className="d-none" />
                <label className="fw-bold mt-2">Email:</label>
                <input type="text"
                    id="email-field"
                    className="form-control"
                    onChange={(e) => orderUpdateHandler("email", e.target.value)}
                    value={order.email} />
                <button className="btn btn-success mt-4 mb-2" onClick={() => sendOrderHandler()}>Confirm & send order</button>
            </div>
        </div>
    );
}

export default OrderForm;