import './../css/movements.css'

export function Movement({movement: {idMovement, username, amount, transactionDate, image, type}}) {
    const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    return (
        <>
            <section id={idMovement} className='text-light d-flex align-items-center'>
                <aside>
                    <img src={image || defaultImage} alt="" />
                </aside>
                <article>
                    <header>
                        <strong>{username}</strong>
                    </header>
                    <p className='detail m-0'>
                        <span className='type'>{type ? "Transferiste" : "Recibiste"}</span>
                        <span className='divider'>&#8250;</span>
                        <time>{transactionDate}</time>
                    </p>
                </article>
                <aside className='amount-container text-right'>
                    <span className={"amount " + (type ? "amountTransfer" : "amountReceived")}>${amount != null ? amount.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0}</span>
                </aside>
            </section>
        </>
    )
}