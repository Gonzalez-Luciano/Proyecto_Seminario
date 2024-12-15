import './../css/movements.css'

export function Movement({movement: {id, user, amount, date, image, type}}) {
    const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
    return (
        <>
        <section className='text-light d-flex align-items-center align-content-between'>
            <aside>
                <img src={image || defaultImage} alt="" />
            </aside>
            <article>
                <header>
                    <strong>{user}</strong>
                </header>
                <p className='detail m-0'>
                    <span className='type'>{type == "reception" ? "Recibiste" : "Transferiste"}</span>
                    <span className='divider'>&#8250;</span>
                    <time>{date}</time>
                </p>
            </article>
            <aside className='text-right'>
                <span className={"amount " + (type == "reception" ? "amountReceived" : "amountTransfer")}>${amount.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </aside>
        </section>
        </>
    )
}