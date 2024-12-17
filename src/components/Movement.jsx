import './../css/movements.css'

export function Movement({movement: {idMovement, username, amount, transactionDate, image, type}}) {
    const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    const finalAmount = amount != null ? amount.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0;
    return (
        <>
            <section id={idMovement} className='movement-item text-light d-flex align-items-center'>
                <aside>
                    <img className='movement-image' src={image == "default" ? defaultImage : image} alt="" />
                </aside>
                <article className='movement-detail'>
                    <header>
                        <strong>{username}</strong>
                    </header>
                    <p className='detail m-0'>
                        <span className='type'>{type ? "Transferred" : "Received"}</span>
                        <span className='divider'>&#8250;</span>
                        <time className='movement-date'>{transactionDate}</time>
                    </p>
                </article>
                <aside className='amount-container text-right'>
                    <span className={"amount " + (type ? "amountTransfer" : "amountReceived")}>${finalAmount}</span>
                </aside>
            </section>
        </>
    )
}